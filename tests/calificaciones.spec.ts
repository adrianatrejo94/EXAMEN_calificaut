import { test, expect, type Page } from '@playwright/test';

// Función de apoyo: captura las tres calificaciones y presiona "Calcular".
async function capturar(page: Page, p1: string, p2: string, p3: string) {
  await page.getByLabel('Parcial 1').fill(p1);
  await page.getByLabel('Parcial 2').fill(p2);
  await page.getByLabel('Parcial 3').fill(p3);
  await page.getByRole('button', { name: 'Calcular' }).click();
}

test.describe('CalificaUT', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // CP-01 · RESUELTO COMO EJEMPLO
  test('CP-01 calcula el promedio con un decimal', async ({ page }) => {
    await capturar(page, '9', '8', '9');

    await expect(page.getByTestId('promedio')).toHaveText('8.7');
    await expect(page.getByTestId('estatus')).toHaveText('Aprobado');
  });

  // CP-02 · 6, 7 y 5 deben dar 6.0 y "Reprobado"
  test('CP-02 promedio menor a 8 es Reprobado', async ({ page }) => {
    await capturar(page, '6', '7', '5');

    await expect(page.getByTestId('promedio')).toHaveText('6.0');
    await expect(page.getByTestId('estatus')).toHaveText('Reprobado');
  });

  // CP-03 · Valor límite: un promedio de exactamente 8 debe ser "Aprobado"
  test('CP-03 promedio exactamente 8 es Aprobado', async ({ page }) => {
    await capturar(page, '8', '8', '8');

    await expect(page.getByTestId('promedio')).toHaveText('8.0');
    await expect(page.getByTestId('estatus')).toHaveText('Aprobado');
  });

  // CP-04 · Una calificación mayor a 10 debe rechazarse
  test('CP-04 rechaza calificaciones fuera de 0 a 10', async ({ page }) => {
    await capturar(page, '11', '9', '9');

    await expect(page.getByRole('alert')).toHaveText('Captura las tres calificaciones entre 0 y 10');
    await expect(page.getByTestId('promedio')).toHaveText('');
  });

  // CP-05 · Si no se captura nada debe aparecer el mensaje de error
  test('CP-05 sin calificaciones muestra el mensaje de error', async ({ page }) => {
    await page.getByRole('button', { name: 'Calcular' }).click();

    await expect(page.getByRole('alert')).toHaveText('Captura las tres calificaciones entre 0 y 10');
  });

  // CP-06 · "Limpiar" debe borrar los campos y el resultado
  test('CP-06 Limpiar borra campos y resultado', async ({ page }) => {
    await capturar(page, '9', '9', '9');
    await page.getByRole('button', { name: 'Limpiar' }).click();

    await expect(page.getByLabel('Parcial 1')).toHaveValue('');
    await expect(page.getByTestId('promedio')).toHaveText('');
    await expect(page.getByTestId('estatus')).toHaveText('');
  });

  // CP-07 · (extra) RF-02: el estatus se decide con el promedio redondeado
  test('CP-07 estatus usa el promedio redondeado (7.9, 8, 8 → 8.0 Aprobado)', async ({ page }) => {
    await capturar(page, '7.9', '8', '8');

    await expect(page.getByTestId('promedio')).toHaveText('8.0');
    await expect(page.getByTestId('estatus')).toHaveText('Aprobado');
  });

  // CP-08 · (extra) RF-05: el folio tiene formato CAL-
  test('CP-08 genera folio con formato CAL-', async ({ page }) => {
    await capturar(page, '9', '9', '9');

    await expect(page.getByTestId('folio')).toHaveText(/^CAL-\d+$/);
  });
});
