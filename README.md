# Essential Guide to Playwright

## Table of Contents
1. [Introduction to Playwright](#introduction-to-playwright)
2. [Setting Up Playwright](#setting-up-playwright)
3. [Writing Your First Test](#writing-your-first-test)
4. [Best Practices for Selectors](#best-practices-for-selectors)
5. [Advanced Test Writing Techniques](#advanced-test-writing-techniques)
6. [Running Tests](#running-tests)
7. [Generating and Analyzing HTML Reports](#generating-and-analyzing-html-reports)
8. [Troubleshooting](#troubleshooting)

## Introduction to Playwright

Playwright is a powerful open-source automation library developed by Microsoft. It allows you to write reliable end-to-end tests for modern web applications across all major rendering engines, including Chromium, Firefox, and WebKit.

**Key Features:**
- Multi-browser support
- Automatic waiting capabilities
- Powerful selectors
- Mobile device emulation
- Network interception

## Setting Up Playwright

1. **Install Playwright:**
   ```bash
   npm init playwright@latest
   ```

2. **Install the browsers:**
   ```bash
   npx playwright install
   ```

## Writing Your First Test

Here is an example of a basic test with Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});
```

## Best Practices for Selectors

1. **Use `data-testid` Attributes:**
   These are the most reliable selectors as they are not affected by changes in the user interface.

   **HTML:**
   ```html
   <button data-testid="submit-button">Submit</button>
   ```

   **Test:**
   ```typescript
   await page.click('[data-testid="submit-button"]');
   ```

2. **Use ARIA Roles:**
   ARIA roles provide semantic meaning to your elements, making your tests more accessible and robust.

   **HTML:**
   ```html
   <button role="tab">Profile</button>
   ```

   **Test:**
   ```typescript
   await page.click('role=tab[name="Profile"]');
   ```

3. **Text Content:**
   When appropriate, use text content for selection.

   ```typescript
   await page.click('text=Submit');
   ```

4. **Combine Selectors:**
   For more specific selection, combine different types of selectors.

   ```typescript
   await page.click('button[data-testid="submit-button"]:has-text("Submit")');
   ```

## Advanced Test Writing Techniques

1. **API Testing:**
   Use Playwright's `request` context for API tests.

   ```typescript
   test('API test', async ({ request }) => {
     const response = await request.get('https://api.example.com/data');
     expect(response.ok()).toBeTruthy();
     expect(await response.json()).toEqual(expect.objectContaining({
       key: 'value'
     }));
   });
   ```

## Running Tests

1. **Run All Tests:**
   ```bash
   npx playwright test
   ```

2. **Run a Specific Test File:**
   ```bash
   npx playwright test tests/example.spec.ts
   ```

3. **Run Tests in Headed Mode** (with the browser visible):
   ```bash
   npx playwright test --headed
   ```

4. **Run Tests with UI Mode:**
   The UI mode provides an interactive interface for running and debugging tests.
   ```bash
   npx playwright test --ui
   ```

5. **Run Tests in Debug Mode:**
   ```bash
   npx playwright test --debug
   ```

## Generating and Analyzing HTML Reports

Playwright automatically generates an HTML report after running tests. However, if you encounter the error "No report found," follow these steps:

1. **Ensure Report Generation:**
   Modify your `playwright.config.ts` file to include the HTML reporter configuration:

   ```typescript
   import { PlaywrightTestConfig } from '@playwright/test';

   const config: PlaywrightTestConfig = {
     reporter: [['html', { outputFolder: 'playwright-report' }]],
   };

   export default config;
   ```

2. **Run the Tests:**
   ```bash
   npx playwright test
   ```

3. **View the Report:**
   After running the tests, use the command:
   ```bash
   npx playwright show-report
   ```

   If the command does not work, you can manually open the `playwright-report/index.html` file in your browser.

4. **Analyze the Report:**
   The HTML report provides a detailed overview of the test results, including:
   - Summary of passed/failed tests
   - Duration of each test
   - Screenshots and traces for failed tests
   - Error details to facilitate debugging

   Remember to always run the tests before attempting to view the report, as the report is generated during test execution.