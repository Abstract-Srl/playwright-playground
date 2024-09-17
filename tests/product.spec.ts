import { test, expect } from '@playwright/test';
import {login} from './helpers/authHelpers'

test.describe('Product List', () => {
    test.beforeEach(async ({ page }) => {
        await login(page)
    });

    test('products are displayed correctly', async ({ page }) => {
        await page.goto('/products');

        const productItems = await page.locator('.product-item').count();
        expect(productItems).toBeGreaterThan(0);

        const firstProductTitle = await page.locator('.product-item h3').first().innerText();
        expect(firstProductTitle).not.toBe('');

        const firstProductPrice = await page.locator('.product-item p').first().innerText();
        expect(firstProductPrice).toMatch(/\$\d+\.\d{2}/);
    });

    test('product images are loaded', async ({ page }) => {
        await page.goto('/products');

        const images = await page.locator('.product-item img').all();
        for (const image of images) {
            const src = await image.getAttribute('src');
            expect(src).not.toBe('');

            //TODO

            // Check if image is loaded
/*            const isLoaded = await image.evaluate((img) => img.complete && img.naturalHeight !== 0);
            expect(isLoaded).toBe(true);*/
        }
    });
});