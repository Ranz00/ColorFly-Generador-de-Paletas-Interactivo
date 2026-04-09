# Colorfly Studio — Generador de Paletas de Colores

> **Demo en vivo GitHub Pages:** [Ver en GitHub Pages](https://ranz00.github.io/ColorFly-Generador-de-Paletas-Interactivo)
>
> **Documentación Google Drive:** [Google Drive link](https://docs.google.com/document/d/1thcztAWEPRvuw4XVgHRj6D37uzKyKKGBa0sYXXv8Nnw/edit?usp=sharing)

---

Colorfly Studio es un generador de paletas de colores que hice como proyecto para la materia de Desarrollo Web. La idea era simple: algo que genere colores que realmente se vean bien juntos, sin depender de ninguna librería externa.

Todo el proyecto corre en el navegador, sin backend, sin dependencias, sin build tools. HTML, CSS y JS puro.

---

## ¿Qué hace?

- Genera paletas de 3 a 8 colores con distribución HSL para que los resultados sean visualmente coherentes
- Permite ver los valores en HEX o HSL con un botón de toggle
- Click en cualquier tarjeta copia el color al portapapeles
- Podés bloquear colores individuales para que no cambien al regenerar
- La última paleta generada se guarda en `localStorage` y se recupera al recargar la página

---

## Stack

HTML5 semántico, CSS3 con custom properties y grid, JavaScript vanilla ES6. Sin frameworks, sin librerías, sin dependencias externas — era un requisito del proyecto y la verdad no fue necesario nada más.

---

## Estructura

```
ColorFly-Generador-de-Paletas-Interactivo/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── README.md

```

---

## Correr el proyecto

Clonar el repo y abrir `index.html` directo en el navegador. No necesita servidor ni nada instalado.

```bash
git clone https://github.com/Ranz00/ColorFly-Generador-de-Paletas-Interactivo.git
```

---

## Algunas decisiones que tomé

La generación de colores la hice en espacio HSL porque me daba más control sobre el resultado — puedo ajustar saturación y luminosidad para evitar que salgan colores muy oscuros o quemados. La conversión a HEX la implementé manualmente.

El tema visual está manejado con variables CSS globales, así cualquier cambio de color o espaciado se hace en un solo lugar.

Para el localStorage simplemente serializo la paleta en JSON al generarla y la recupero al cargar.

---

## Autor

**Héctor Ricardo Anzoátegui**  
Proyecto Integrador - FullStack SoyHenry M1  
[github.com/Ranz00](https://github.com/Ranz00)
