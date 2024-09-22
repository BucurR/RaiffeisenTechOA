import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('has title', async ({ page }) => {
  const login = new LoginPage(page)
  await login.doDemoLogin();
});
