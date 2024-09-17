import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 5 * 1000,
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
    },
    reporter: [['html', { outputFolder: 'playwright-report' }]],
});
