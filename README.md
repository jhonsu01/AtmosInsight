# 🌍 **AtmosInsight: Visualizando la Tierra, Escuchando el Clima**
**Omnicron Animate – NASA Space Apps Challenge 2025**

## 1. Una historia nacida desde el espacio

Durante más de medio siglo, la NASA ha observado nuestro planeta como nunca antes: desde el espacio, a través de miles de ojos tecnológicos que orbitan y registran cada cambio en la atmósfera, el suelo, la vegetación y los océanos.

Sin embargo, mientras los satélites capturan terabytes de datos cada día, gran parte de esta información permanece oculta tras portales técnicos, formatos complejos y jerga científica difícil de comprender.

De esa necesidad nace **AtmosInsight** — una herramienta que traduce la ciencia satelital en historias humanas, combinando visualización interactiva con narración accesible.
Su propósito es simple: ayudar a cualquier persona, sin importar su formación técnica, a entender lo que los satélites ven y *escuchar* lo que la Tierra intenta decirnos.

## 2. El desafío

El reto que inspiró este proyecto fue:

> “¿Cómo hacer que los datos de observación de la Tierra sean comprensibles, atractivos y útiles para todos?”

La mayoría de los portales científicos presentan datos en bruto — mapas, índices, coordenadas, gráficos.
Pero detrás de cada píxel hay una historia: una sequía que avanza, un bosque que respira menos o una nube de dióxido de azufre que revela un volcán despertando.

**AtmosInsight** propone una nueva forma de contar historias ambientales, uniendo visualización espacial, narración digital e inteligencia artificial.

## 3. Nuestra solución:

### Visualización interactiva + Narración auditiva

AtmosInsight es una aplicación web que se conecta directamente con las **API abiertas de la NASA**, especialmente **GIBS (Global Imagery Browse Services)**, para traer imágenes satelitales en tiempo real y reconstruir la evolución de fenómenos atmosféricos y terrestres.

El usuario puede:

* Seleccionar una fecha o evento histórico (por ejemplo, un huracán o un pico de contaminación).
* Escoger una capa satelital como:

  * NDVI (Vegetación)
  * SMAP (Humedad del suelo)
  * SO₂ (Emisiones volcánicas)
  * Agua superficial (OPERA)
  * Temperatura o imagen visible (MODIS Terra)
* Visualizar la información en un mapa y observar los cambios temporales.
* Escuchar una narración generada por IA que explica el fenómeno en lenguaje claro y educativo.

Así, la experiencia no solo muestra datos: **cuenta historias sobre cómo la Tierra respira, cambia y se adapta**.

## 4. Arquitectura y flujo técnico

| **Capa**                   | **Descripción**                                                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Datos Satelitales NASA** | Consumo directo desde GIBS (WMTS*).                                                                                                                      |
| **Visualización**          | Construida con **React + Leaflet + TailwindCSS + Framer Motion** para mapas interactivos e interfaz de usuario.                                          |
| **Narrativa**              | Módulo de Texto a Voz (TTS) impulsado por **Google Cloud TTS** o **Notebook LM**, que convierte explicaciones automáticas en audio estilo podcast.       |
| **Integración/Despliegue** | Desplegado en **GitHub Pages** o **Vercel**. Código abierto (Licencia MIT) y accesible públicamente para evaluación de la NASA.                          |

(*) https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{LAYER}/default/{DATE}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png.

## 5. Conjuntos de datos utilizados (NASA Datasets)

| **Dataset**                      | **Descripción**                                 | **Agencia**                  | **Tipo**   | **Frecuencia** |
| -------------------------------- | ----------------------------------------------- | ---------------------------- | ---------- | -------------- |
| MODIS Terra True Color           | Imagen RGB diaria de la superficie terrestre.   | NASA EOSDIS                  | Óptico     | Diario         |
| VIIRS NOAA-20 NDVI (8 días)      | Índice de Vegetación de Diferencia Normalizada. | NASA/NOAA                    | Biofísico  | 8 días         |
| SMAP Soil Moisture L3            | Humedad superficial del suelo (36 km).          | NASA JPL                     | Microondas | Diario         |
| OPERA Surface Water Extent (HLS) | Extensión dinámica de agua superficial.         | NASA JPL                     | Radar      | Diario         |
| TROPOMI SO₂ Column               | Columna vertical total de dióxido de azufre.    | ESA/Copernicus (NASA EOSDIS) | Químico    | Diario         |
| MERRA-2 Air Temperature          | Temperatura atmosférica a 2 m.                  | NASA GMAO                    | Reanálisis | Mensual        |

## 6. Metodología

**Enfoque:** Exploratorio–aplicado, con énfasis en accesibilidad y divulgación científica.
**Diseño:** Prototipo funcional basado en datos reales e integración de narración automatizada.

**Métodos empleados:**

* **Descriptivo:** Interpretación visual y narrativa de tendencias ambientales.
* **Analítico:** Comparación temporal de capas y detección de anomalías.
* **Educativo:** Traducción de datos técnicos en contenido comprensible y atractivo mediante IA.

## 7. Impacto

| **Dimensión**   | **Contribución**                                                          |
| --------------- | ------------------------------------------------------------------------- |
| **Científica**  | Difunde conocimiento ambiental basado en datos satelitales reales.        |
| **Educativa**   | Crea contenido comprensible para escuelas, comunidades y medios.          |
| **Social**      | Democratiza el acceso a la ciencia y fomenta conciencia climática.        |
| **Tecnológica** | Demuestra una arquitectura reproducible basada en APIs abiertas.          |
| **Cultural**    | Humaniza la ciencia espacial mediante historias interactivas y auditivas. |

### 🌐 Atribución

Imágenes cortesía de NASA EOSDIS GIBS, JPL, NOAA y ESA/Copernicus.

### 🌏 Trailer

https://www.youtube.com/watch?v=omCnpyvy9Dw

### 🌐 Demo video

https://www.youtube.com/watch?v=o28-XjDuZrQ

## 🚀 Cómo contribuir

Este proyecto es de código abierto y da la bienvenida a desarrolladores, diseñadores y comunicadores científicos.
Haz un **fork** del repositorio, crea una rama de trabajo (*feature branch*) y abre un **pull request**.
