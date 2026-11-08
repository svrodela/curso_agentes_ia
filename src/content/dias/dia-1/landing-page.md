> **Objetivo de aprendizaje:** generar, con prompts estructurados, los recursos visuales y una landing page estática para TecBot Académico, usando solo el rol de diseñador web (sin backend ni API).

## Objetivo

Crear una primera interfaz visible para TecBot Académico: identidad visual, logo SVG, navbar, hero y tarjetas de características, integrados en un `index.html` + `styles.css` que pueda abrirse en el navegador y versionarse en Git.

## Resultado esperado

Al finalizar tendrás una carpeta `tecbot-landing/` con:

- `index.html` funcional.
- `styles.css` con variables de marca.
- Logo SVG incrustado.
- Navbar responsiva con efecto glassmorphism.
- Sección Hero con llamado a la acción.
- Grilla de 3 tarjetas de características.
- Repositorio Git publicado en GitHub.

## Requisitos previos

- Haber definido el nombre del proyecto: **TecBot Académico**.
- Conocer la paleta de marca propuesta (fondo oscuro, superficie, acento cian/esmeralda, texto).
- Tener Git instalado y una cuenta de GitHub.

## Conceptos fundamentales

- **Prompt estructurado (RCTR):** Rol, Contexto, Tarea, Restricciones.
- **Componentes modulares:** pedir piezas pequeñas y verificables antes de ensamblar.
- **SVG como código:** el logo se genera en XML y se incrusta directamente en el HTML.
- **Separación de responsabilidades:** el diseñador web define la interfaz; no implementa lógica ni backend.

## Paso 1. Definir concepto y paleta de marca

Usa este prompt con tu agente:

```markdown
Actúa como Diseñador UI/UX Senior y Frontend Architect.

CONTEXTO:
Quiero crear una landing page para TecBot Académico, un asistente de información académica que responde dudas sobre servicio social, residencias, titulación y acreditación usando documentos de demostración.

TAREA:
1. Propón un concepto visual moderno (dark mode con acentos cian y esmeralda).
2. Define una paleta de 4 colores en hexadecimal: fondo oscuro, superficie de tarjetas, color de acento principal y color de texto.
3. Selecciona una tipografía moderna de Google Fonts.

SALIDA:
Proporciona la paleta y variables CSS `:root` listas para usar.
```

## Paso 2. Generar el logo / isotipo en SVG

```markdown
Actúa como Diseñador Gráfico Vectorial y Experto en SVG.

CONTEXTO:
Proyecto: TecBot Académico
Paleta: [COLORES DEFINIDOS EN EL PASO 1]

TAREA:
Genera un logotipo vectorial en código SVG puro:
- Un isotipo geométrico minimalista (burbuja de chat + engranaje o chip).
- Al lado, el nombre "TecBot Académico" con texto estilizado.
- `viewBox="0 0 240 60"`, escalable y optimizado.

RESTRICCIONES:
- Entrega ÚNICAMENTE el bloque `<svg>...</svg>` limpio, sin HTML extra ni explicaciones.
```

Guarda el resultado en `assets/logo.svg` o incrustado en `index.html`.

## Paso 3. Crear componentes de interfaz modulares

### 3.1 Navbar (barra de navegación)

```markdown
Actúa como Frontend Developer Senior.

TAREA:
Crea una barra de navegación moderna, fija y con efecto glassmorphism (`backdrop-filter: blur`).
- Logo SVG a la izquierda.
- Enlaces al centro: "Características", "Procesos", "Recursos".
- Botón de acción "Comenzar" a la derecha con hover brillante.
- Totalmente responsiva para móvil.
```

### 3.2 Hero Section

```markdown
Actúa como Frontend Developer.

TAREA:
Genera una sección Hero impactante con:
- Badge superior pill ("⚡ Demostración académica").
- Titular `<h1>` grande con texto en gradiente.
- Párrafo descriptivo de 2 líneas.
- Dos botones: primario con gradiente y secundario con borde translúcido.
```

### 3.3 Feature Cards (tarjetas de características)

```markdown
Actúa como Frontend Developer.

TAREA:
Diseña una grilla de 3 tarjetas:
- Servicio social, residencias profesionales, titulación.
- Cada tarjeta: icono, título `<h3>` y descripción breve.
- Hover que eleve la tarjeta con borde de luz sutil.
```

## Paso 4. Ensamblar la landing page

Pide al agente que integre todo en un archivo `index.html` y un `styles.css` (o CSS interno). Abre `index.html` con doble clic para verificar el resultado visual.

Estructura sugerida:

```text
tecbot-landing/
├── index.html
├── styles.css
└── assets/
    └── logo.svg
```

## Paso 5. Publicar en GitHub

```bash
git init
git add .
git commit -m "feat: landing page y recursos visuales de TecBot Académico"
git remote add origin https://github.com/TU-USUARIO/tecbot-landing.git
git branch -M main
git push -u origin main
```

## Errores frecuentes

- **Logo con estilos inline inconsistentes:** pide que el SVG use `currentColor` para adaptarse al tema.
- **Navbar no responsiva:** especifica breakpoints y menú hamburguesa.
- **Hero sin contraste:** valida la paleta en modo oscuro y claro.
- **CSS duplicado:** exige un solo archivo `styles.css` con variables `:root`.

## Entregable

- `index.html` + `styles.css` funcionales.
- Logo SVG incrustado.
- Navbar, Hero y 3 tarjetas visibles.
- Repositorio publicado en GitHub.

## Criterios de aceptación

- La landing se abre sin errores en el navegador.
- El diseño es responsivo en móvil y escritorio.
- Los colores corresponden a la paleta definida.
- El repositorio tiene al menos un commit y está publicado.

## Recursos

- [MDN: SVG](https://developer.mozilla.org/es/docs/Web/SVG)
- [Google Fonts](https://fonts.google.com/)
- [Git y GitHub](/dias/dia-1/git-github)

**Siguiente paso:** integrar esta interfaz con el backend en el [proyecto conductor](/proyecto-conductor).