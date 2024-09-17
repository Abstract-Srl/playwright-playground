# Guida Essenziale a Playwright

## Indice
1. [Introduzione a Playwright](#introduzione-a-playwright)
2. [Configurazione di Playwright](#configurazione-di-playwright)
3. [Scrivere il Primo Test](#scrivere-il-primo-test)
4. [Migliori Pratiche per i Selettori](#migliori-pratiche-per-i-selettori)
5. [Tecniche Avanzate di Scrittura dei Test](#tecniche-avanzate-di-scrittura-dei-test)
6. [Esecuzione dei Test](#esecuzione-dei-test)
7. [Generazione e Analisi dei Report HTML](#generazione-e-analisi-dei-report-html)
8. [Risoluzione dei Problemi](#risoluzione-dei-problemi)

## Introduzione a Playwright

Playwright è una potente libreria di automazione open-source sviluppata da Microsoft. Permette di scrivere test end-to-end affidabili per applicazioni web moderne su tutti i principali motori di rendering, inclusi Chromium, Firefox e WebKit.

Caratteristiche principali:
- Supporto multi-browser
- Funzionalità di attesa automatica
- Selettori potenti
- Emulazione di dispositivi mobili
- Intercettazione di rete

## Configurazione di Playwright

1. Installare Playwright:
   ```
   npm init playwright@latest
   ```

2. Installare i browser:
   ```
   npx playwright install
   ```

## Scrivere il Primo Test

Ecco un esempio di un test base con Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('test base', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const titolo = page.locator('.navbar__inner .navbar__title');
  await expect(titolo).toHaveText('Playwright');
});
```

## Migliori Pratiche per i Selettori

1. **Utilizzare attributi data-testid**:
   Questi sono i selettori più affidabili in quanto non sono influenzati dai cambiamenti dell'interfaccia utente.

   HTML:
   ```html
   <button data-testid="pulsante-invio">Invia</button>
   ```

   Test:
   ```typescript
   await page.click('[data-testid="pulsante-invio"]');
   ```

2. **Utilizzare ruoli ARIA**:
   I ruoli ARIA forniscono un significato semantico ai tuoi elementi, rendendo i tuoi test più accessibili e robusti.

   HTML:
   ```html
   <button role="tab">Profilo</button>
   ```

   Test:
   ```typescript
   await page.click('role=tab[name="Profilo"]');
   ```

3. **Contenuto testuale**:
   Quando appropriato, usa il contenuto testuale per la selezione.

   ```typescript
   await page.click('text=Invia');
   ```

4. **Combinare i selettori**:
   Per una selezione più specifica, combina diversi tipi di selettori.

   ```typescript
   await page.click('button[data-testid="pulsante-invio"]:has-text("Invia")');
   ```

## Tecniche Avanzate di Scrittura dei Test

1. **Test API**:
   Usa il contesto `request` di Playwright per i test API.

   ```typescript
   test('test API', async ({ request }) => {
     const risposta = await request.get('https://api.example.com/dati');
     expect(risposta.ok()).toBeTruthy();
     expect(await risposta.json()).toEqual(expect.objectContaining({
       chiave: 'valore'
     }));
   });
   ```

## Esecuzione dei Test

1. **Eseguire tutti i test**:
   ```
   npx playwright test
   ```

2. **Eseguire un file di test specifico**:
   ```
   npx playwright test tests/esempio.spec.ts
   ```

3. **Eseguire i test in modalità headed** (con il browser visibile):
   ```
   npx playwright test --headed
   ```

4. **Eseguire i test con la modalità UI**:
   La modalità UI fornisce un'interfaccia interattiva per l'esecuzione e il debug dei test.
   ```
   npx playwright test --ui
   ```

5. **Eseguire i test in modalità debug**:
   ```
   npx playwright test --debug
   ```

## Generazione e Analisi dei Report HTML

Playwright genera automaticamente un report HTML dopo l'esecuzione dei test. Tuttavia, se riscontri l'errore "No report found", segui questi passaggi:

1. **Assicurati di generare il report**:
   Modifica il tuo file `playwright.config.ts` per includere la configurazione del reporter HTML:

   ```typescript
   import { PlaywrightTestConfig } from '@playwright/test';

   const config: PlaywrightTestConfig = {
     reporter: [['html', { outputFolder: 'playwright-report' }]],
   };

   export default config;
   ```

2. **Esegui i test**:
   ```
   npx playwright test
   ```

3. **Visualizza il report**:
   Dopo l'esecuzione dei test, usa il comando:
   ```
   npx playwright show-report
   ```

   Se il comando non funziona, puoi aprire manualmente il file `playwright-report/index.html` nel tuo browser.

4. **Analizzare il report**:
   Il report HTML fornisce una panoramica dettagliata dei risultati dei test, inclusi:
    - Riepilogo dei test passati/falliti
    - Durata di ciascun test
    - Screenshot e tracce per i test falliti
    - Dettagli degli errori per facilitare il debug

Ricorda di eseguire sempre i test prima di tentare di visualizzare il report, in quanto il report viene generato durante l'esecuzione dei test.

## Risoluzione dei Problemi

1. **Test instabili**:
   Usa `test.retry()` per rieseguire i test instabili. Investiga e correggi la causa principale dell'instabilità.

2. **Problemi con i selettori**:
   Usa il selettore di elementi di Playwright in modalità debug per verificare i selettori.

3. **Performance**:
   Utilizza l'esecuzione parallela e minimizza le azioni non necessarie nei tuoi test.

4. **Debug**:
   Usa il flag `--debug` o la modalità UI per il debug interattivo.

Ricorda, un testing E2E efficace con Playwright implica la scrittura di test stabili e manutenibili che rappresentano accuratamente gli scenari degli utenti. La refactoring e l'aggiornamento regolari dei test insieme al codice dell'applicazione sono cruciali per mantenere una suite di test robusta.