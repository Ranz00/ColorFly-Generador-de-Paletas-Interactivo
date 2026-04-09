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

// Obtiene el valor del select de tamaño de paleta
function obtenerSize() {
  return parseInt(document.querySelector('select[name="color-count"]').value)
}

// Genera la paleta y la renderiza en el DOM
function generarPaleta() {
  const tamaño = obtenerSize()
  const contenedor = document.getElementById('color-boxes')
  // Limpia el contenedor antes de agregar nuevos colores
  contenedor.innerHTML = ''
  for (let i = 0; i < tamaño; i++) {
    const colorHSL = generarColorHSL()
    const partes = colorHSL.match(/\d+/g)
    const colorHEX = HSLaHEX(
      parseInt(partes[0]),
      parseInt(partes[1]),
      parseInt(partes[2]),
    )
    // Crea una tarjeta por color
    const colorDiv = document.createElement('div')
    colorDiv.classList.add('color-card')
    colorDiv.setAttribute('data-color', colorHEX)
    colorDiv.style.backgroundColor = colorHEX
    contenedor.appendChild(colorDiv)
  }
}

// Muestra un toast de feedback al generar la paleta
function mostrarFeedback() {
  const mensaje = document.createElement('div')
  mensaje.textContent = '¡Paleta generada!'
  mensaje.classList.add('toast')
  document.body.appendChild(mensaje)
  // Activa la clase visible para disparar la transición
  requestAnimationFrame(() => mensaje.classList.add('visible'))
  setTimeout(() => {
    mensaje.classList.remove('visible')
    mensaje.classList.add('fade-out')
    // Elimina el elemento del DOM tras la transición
    setTimeout(() => document.body.removeChild(mensaje), 300)
  }, 2000)
}

// Event listener para el botón de generar paleta
const btnGenerar = document.getElementById('generate-palette')
btnGenerar.addEventListener('click', () => {
  generarPaleta() // Llama a la función para generar la paleta
  mostrarFeedback() // Muestra el feedback
})
