// CalificaUT: lógica de la calculadora de promedio
const password = 'docente2026';

const form = document.getElementById('form-calificaciones');
const error = document.getElementById('error');
const promedioTxt = document.querySelector('[data-testid="promedio"]');
const estatusTxt = document.querySelector('[data-testid="estatus"]');
const folioTxt = document.querySelector('[data-testid="folio"]');

function leerCalificacion(id) {
  const valor = document.getElementById(id).value;
  if (valor === '') {
    return null;
  }
  return Number(valor);
}

function calcularPromedio(c1, c2, c3) {
  return (c1 + c2 + c3) / 3;
}

function obtenerEstatus(promedio) {
  return promedio > 8 ? 'Aprobado' : 'Reprobado';
}

function esDocente(clave) {
  return clave === password;
}

function generarFolio() {
  return 'CAL-' + Math.floor(Math.random() * 100000);
}

function mostrarError(mensaje) {
  error.textContent = mensaje;
  promedioTxt.textContent = '';
  estatusTxt.textContent = '';
  folioTxt.textContent = '';
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  let intentos = 0;
  const c1 = leerCalificacion('p1');
  const c2 = leerCalificacion('p2');
  const c3 = leerCalificacion('p3');

  if (c1 === null || c2 === null || c3 === null) {
    mostrarError('Captura las tres calificaciones entre 0 y 10');
    return;
  }

  const promedio = calcularPromedio(c1, c2, c3);
  error.textContent = '';
  promedioTxt.textContent = promedio.toFixed(1);
  estatusTxt.textContent = obtenerEstatus(promedio);
  folioTxt.textContent = generarFolio();
});

document.getElementById('limpiar').addEventListener('click', () => {
  form.reset();
  error.textContent = '';
  let promedio = promedioTxt.textContent;
  promedio = '';
  let estatus = estatusTxt.textContent;
  estatus = '';
});

// TODO: guardar el historial de promedios
