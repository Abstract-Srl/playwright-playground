import { test, expect } from '@playwright/test';
import {login} from './helpers/authHelpers'

test.describe('Authentication', () => {
    test('successful login', async ({ page }) => {
        await login(page)
    });

    test('failed login', async ({ page }) => {
        await page.goto('/login');
        await page.fill('[data-testid="username-input"]', 'wronguser');
        await page.fill('[data-testid="password-input"]', 'wrongpassword');
        await page.click('[data-testid="login-button"]');

        await expect(page.locator('[data-testid="error-message"]')).toHaveText('Invalid username or password');
    });
});