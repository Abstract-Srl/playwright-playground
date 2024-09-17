import { Page, expect } from '@playwright/test';

export async function login(page: Page) {
    await page.goto('/login');
    await page.fill('[data-testid="username-input"]', 'blueladybug673');
    await page.fill('[data-testid="password-input"]', 'kong');
    await page.click('[data-testid="login-button"]');

    await expect(page).toHaveURL('/');
}
