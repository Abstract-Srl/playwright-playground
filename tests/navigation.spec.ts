import { test, expect } from '@playwright/test';
import {login} from './helpers/authHelpers'

test.describe('Navigation', () => {
    // Prima di ogni test, possiamo simulare il login se necessario, oppure assicurarci che la home venga caricata correttamente
    test.beforeEach(async ({ page }) => {
        await login(page)
    });

    test('navigation between pages', async ({ page }) => {
        // Verifica che il titolo includa il nome dell'utente
        await expect(page.locator('h1')).toContainText('Ciao, Hasso! Welcome to our Playwright Testing Playground'); // Supponendo che l'utente loggato sia "Fausta"

        // Naviga alla pagina Products
        await page.click('text=Products');
        await expect(page).toHaveURL('/products');
        await expect(page.locator('h1')).toHaveText('Products');

        // Naviga alla pagina Login
        await page.click('text=Login');
        await expect(page).toHaveURL('/login');
        await expect(page.locator('h1')).toHaveText('Login');

        // Naviga alla pagina Cart
        await page.click('text=Cart');
        await expect(page).toHaveURL('/cart');
        await expect(page.locator('h1')).toHaveText('Your Cart');
    });
});
