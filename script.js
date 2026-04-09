// Función para generar un color HSL aleatorio
function generarColorHSL() {
  const h = Math.floor(Math.random() * 360) // Genera un ángulo aleatorio entre 0 y 359 grados
  const s = Math.floor(Math.random() * 41) + 30 // Genera una saturacion aleatoria entre 30% y 70%
  const l = Math.floor(Math.random() * 41) + 30 // Genera un tono aleatorio entre 30% y 70%
  return `hsl(${h}, ${s}%, ${l}%)` // Retorna el color en formato HSL
}

// Funcion para convertir de HSL a HEX
function HSLaHEX(h, s, l) {
  s /= 100
  l /= 100

  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

  return `#${[60, 180, 240]
    .map((x) =>
      Math.round(f(x) * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`
}

// Función para obtener el tamaño seleccionado en los radio buttons
function obtenerSize() {
  const radios = document.getElementsByName('tamanio')
  for (const radio of radios) {
    if (radio.checked) {
      return parseInt(radio.value)
    }
  }
  return 6 // Valor predeterminado si no hay selección
}

// Event listener para el botón de generar paleta
const btnGenerar = document.getElementById('btn-generar')
btnGenerar.addEventListener('click', () => {
  generarPaleta() // Llama a la función para generar la paleta
  mostrarFeedback() // Muestra el feedback
})
