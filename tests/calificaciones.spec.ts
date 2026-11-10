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

  // Cuando completes una prueba, cambia "test.fixme" por "test".

  // CP-02 · 6, 7 y 5 deben dar 6.0 y "Reprobado"
  test.fixme('CP-02 promedio menor a 8 es Reprobado', async ({ page }) => {
    // TODO 1: captura 6, 7 y 5 con la función capturar(...)
    // TODO 2: verifica que el promedio sea "6.0"
    // TODO 3: verifica que el estatus sea "Reprobado"
  });

  // CP-03 · Valor límite: un promedio de exactamente 8 debe ser "Aprobado"
  test.fixme('CP-03 promedio exactamente 8 es Aprobado', async ({ page }) => {
    // TODO 1: captura 8, 8 y 8
    // TODO 2: verifica que el promedio sea "8.0"
    // TODO 3: verifica que el estatus sea "Aprobado"
  });

  // CP-04 · Una calificación mayor a 10 debe rechazarse
  test.fixme('CP-04 rechaza calificaciones fuera de 0 a 10', async ({ page }) => {
    // TODO 1: captura 11, 9 y 9
    // TODO 2: verifica el mensaje con page.getByRole('alert'):
    //         "Captura las tres calificaciones entre 0 y 10"
    // TODO 3: verifica que el promedio quede vacío: toHaveText('')
  });

  // CP-05 · Si no se captura nada debe aparecer el mensaje de error
  test.fixme('CP-05 sin calificaciones muestra el mensaje de error', async ({ page }) => {
    // TODO 1: presiona "Calcular" sin capturar nada
    // TODO 2: verifica el mensaje de error
  });

  // CP-06 · "Limpiar" debe borrar los campos y el resultado
  test.fixme('CP-06 Limpiar borra campos y resultado', async ({ page }) => {
    // TODO 1: captura 9, 9 y 9
    // TODO 2: presiona el botón "Limpiar"
    // TODO 3: verifica que "Parcial 1" quede vacío: toHaveValue('')
    // TODO 4: verifica que el promedio y el estatus queden vacíos
  });
});
