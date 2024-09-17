import { test, expect } from '@playwright/test';
import { login } from './helpers/authHelpers';

test.describe('Shopping Cart', () => {
    test.beforeEach(async ({ page }) => {
        await login(page);
        await page.getByRole('link', {name: 'Products'}).click()
    });

    test('add item to cart', async ({ page }) => {
        await page.click('text=Add to Cart >> nth=0');
        await page.click('text=Cart');

        await expect(page.locator('.cart-item')).toHaveCount(1);
    });

    test('remove item from cart', async ({ page }) => {
        await page.click('text=Add to Cart >> nth=0');
        await page.click('text=Cart');

        await expect(page.locator('.cart-item')).toHaveCount(1);

        await page.click('text=Remove');
        await expect(page.locator('.cart-item')).toHaveCount(0);
    });

    test('cart total updates correctly', async ({ page }) => {
        await page.click('text=Add to Cart >> nth=0');
        await page.click('text=Add to Cart >> nth=1');
        await page.click('text=Cart');

        const totalText = await page.locator('.cart-total').innerText();
        const total = parseFloat(totalText.split('$')[1]);
        expect(total).toBeGreaterThan(0);
    });

    test('cart persists across pages', async ({ page }) => {
        await page.click('text=Add to Cart >> nth=0');

        await page.getByRole('link', {name: 'Home'}).click()
        await expect(page).toHaveURL('/');

        const cartBadge = await page.locator('.cart-badge');
        await expect(cartBadge).toHaveText('1');

        await page.click('text=Cart');
        await expect(page.locator('.cart-item')).toHaveCount(1);
    });

    test('add multiple quantities of the same item', async ({ page }) => {
        await page.click('text=Add to Cart >> nth=0');
        await page.click('text=Add to Cart >> nth=0');
        await page.click('text=Cart');

        const quantityText = await page.locator('.cart-item >> text=Quantity:').first().innerText();
        expect(quantityText).toContain('2');
    });
});