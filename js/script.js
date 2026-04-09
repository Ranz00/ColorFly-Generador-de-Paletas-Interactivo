// Controla el formato de color mostrado en las tarjetas
let formatoActual = 'hex'

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
  return `#${[0, 8, 4]
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

// Copia el valor del color al portapapeles
function copiarAlPortapapeles(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    mostrarFeedback(`¡Copiado: ${texto}!`)
  })
}

// Crea el icono de candado para bloquear colores
function crearCandado(colorDiv, colorHEX, colorHSL) {
  const candado = document.createElement('button')
  candado.classList.add('lock-btn')
  candado.innerHTML = '🔓'
  candado.title = 'Bloquear color'
  // Alterna el estado bloqueado de la tarjeta
  candado.addEventListener('click', (e) => {
    e.stopPropagation() // Evita que el click llegue al clipboard
    const bloqueado = colorDiv.dataset.locked === 'true'
    colorDiv.dataset.locked = bloqueado ? 'false' : 'true'
    candado.innerHTML = bloqueado ? '🔓' : '🔒'
    colorDiv.classList.toggle('locked', !bloqueado)
  })
  return candado
}

// Guarda la paleta actual en localStorage
function guardarPaleta() {
  const cards = document.querySelectorAll('.color-card')
  const datos = Array.from(cards).map((card) => ({
    hex: card.dataset.hex,
    hsl: card.dataset.hsl,
    locked: card.dataset.locked === 'true',
  }))
  localStorage.setItem('colorfly-paleta', JSON.stringify(datos))
}

// Restaura la paleta guardada desde localStorage
function restaurarPaleta() {
  const guardado = localStorage.getItem('colorfly-paleta')
  if (!guardado) return
  const datos = JSON.parse(guardado)
  const contenedor = document.getElementById('color-boxes')
  contenedor.innerHTML = ''
  datos.forEach(({ hex, hsl, locked }) => {
    const colorDiv = crearTarjeta(hex, hsl)
    if (locked) {
      colorDiv.dataset.locked = 'true'
      colorDiv.classList.add('locked')
      colorDiv.querySelector('.lock-btn').innerHTML = '🔒'
    }
    contenedor.appendChild(colorDiv)
  })
}

// Crea una tarjeta de color completa con label, candado y clipboard
function crearTarjeta(colorHEX, colorHSL) {
  const colorDiv = document.createElement('div')
  colorDiv.classList.add('color-card')
  colorDiv.setAttribute('data-hex', colorHEX)
  colorDiv.setAttribute('data-hsl', colorHSL)
  colorDiv.setAttribute('data-locked', 'false')
  colorDiv.style.backgroundColor = colorHEX

  // Etiqueta visible en hover
  const label = document.createElement('span')
  label.classList.add('color-label')
  label.textContent = formatoActual === 'hex' ? colorHEX : colorHSL
  colorDiv.appendChild(label)

  // Botón candado
  const candado = crearCandado(colorDiv, colorHEX, colorHSL)
  colorDiv.appendChild(candado)

  // Click en tarjeta copia el color al portapapeles
  colorDiv.addEventListener('click', () => {
    const valor =
      formatoActual === 'hex' ? colorDiv.dataset.hex : colorDiv.dataset.hsl
    copiarAlPortapapeles(valor)
  })

  return colorDiv
}

// Genera la paleta y la renderiza en el DOM
function generarPaleta() {
  const tamaño = obtenerSize()
  const contenedor = document.getElementById('color-boxes')
  // Conserva las tarjetas bloqueadas
  const bloqueadas = Array.from(
    contenedor.querySelectorAll('.color-card[data-locked="true"]'),
  )
  contenedor.innerHTML = ''

  let indiceBloqueado = 0
  for (let i = 0; i < tamaño; i++) {
    let colorDiv
    // Si hay tarjeta bloqueada para esta posición, la reutiliza
    if (bloqueadas[indiceBloqueado] && indiceBloqueado < bloqueadas.length) {
      colorDiv = bloqueadas[indiceBloqueado]
      indiceBloqueado++
    } else {
      const colorHSL = generarColorHSL()
      const partes = colorHSL.match(/\d+/g)
      const h = parseInt(partes[0])
      const s = parseInt(partes[1])
      const l = parseInt(partes[2])
      const colorHEX = HSLaHEX(h, s, l)
      colorDiv = crearTarjeta(colorHEX, colorHSL)
    }
    contenedor.appendChild(colorDiv)
  }
  guardarPaleta()
}

// Muestra un toast de feedback
function mostrarFeedback(mensaje = '¡Paleta generada!') {
  const toast = document.createElement('div')
  toast.textContent = mensaje
  toast.classList.add('toast')
  document.body.appendChild(toast)
  // Activa la clase visible para disparar la transición
  requestAnimationFrame(() => toast.classList.add('visible'))
  setTimeout(() => {
    toast.classList.remove('visible')
    toast.classList.add('fade-out')
    // Elimina el elemento del DOM tras la transición
    setTimeout(() => document.body.removeChild(toast), 300)
  }, 2000)
}

// Event listener para el botón de generar paleta
const btnGenerar = document.getElementById('generate-palette')
btnGenerar.addEventListener('click', () => {
  generarPaleta()
  mostrarFeedback()
})

// Alterna entre formato HEX y HSL en las etiquetas
const btnToggle = document.getElementById('toggle-format')
btnToggle.addEventListener('click', () => {
  formatoActual = formatoActual === 'hex' ? 'hsl' : 'hex'
  btnToggle.textContent =
    formatoActual === 'hex' ? 'Mostrar HSL' : 'Mostrar HEX'
  // Actualiza las etiquetas de las tarjetas existentes
  document.querySelectorAll('.color-card').forEach((card) => {
    card.querySelector('.color-label').textContent =
      formatoActual === 'hex' ? card.dataset.hex : card.dataset.hsl
  })
})

// Restaura la última paleta guardada al cargar la página
restaurarPaleta()
