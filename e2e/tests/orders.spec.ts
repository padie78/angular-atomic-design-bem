import { test, expect } from '@playwright/test';

test('Debe cargar la página de órdenes', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /orders/i })).toBeVisible();
});

test('Debe abrir y cerrar el modal de alta', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /new order/i }).click();
  await expect(page.locator('.modal')).toBeVisible();
  await page.getByRole('button', { name: /cancel/i }).click();
});
