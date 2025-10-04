# AtmosInsight

Visualizando la Tierra, Escuchando el Clima Omnicron Animate – NASA Space Apps Challenge 2025

1. Una historia que nace del espacio:
Desde hace más de medio siglo, la NASA observa nuestro planeta como nunca antes se había hecho: desde el espacio, con miles de ojos tecnológicos que orbitan y registran cada cambio en su atmósfera, su suelo, su vegetación y sus océanos.
Sin embargo, aunque los satélites capturan terabytes de información diaria, gran parte de estos datos permanecen ocultos tras portales técnicos, formatos complejos y vocabularios científicos difíciles de interpretar para el público general.

Ahí nace AtmosInsight: una herramienta que traduce la ciencia satelital en historias humanas, combinando visualización interactiva con narrativa accesible.
Queremos que cualquier persona, sin importar su formación técnica, pueda entender lo que los satélites ven y escuchar lo que la Tierra nos intenta decir.

2. El desafío:
El reto que inspiró este proyecto fue claro:
“¿Cómo hacer que los datos de observación terrestre sean comprensibles, atractivos y útiles para todos?”
La mayoría de los portales científicos presentan datos en bruto: mapas, índices, coordenadas, gráficas. Pero detrás de cada píxel hay una historia: una sequía que se extiende, una selva que respira menos, una columna de dióxido de azufre que delata un volcán activo.
AtmosInsight propone una nueva forma de contar la ciencia ambiental, con una experiencia que une la visualización espacial, la narración digital y la inteligencia artificial.

3. Nuestra solución:
Visualización interactiva + narrativa sonora
AtmosInsight es una aplicación web que se conecta directamente a las APIs abiertas de la NASA —especialmente GIBS (Global Imagery Browse Services)— para traer imágenes satelitales en tiempo real y reconstruir la evolución de fenómenos atmosféricos y terrestres.

El usuario puede:
1. Elegir una fecha o evento histórico (por ejemplo, el paso de un huracán o un pico de contaminación).
2. Seleccionar una capa satelital como:
  o	NDVI (vegetación)
  o	SMAP (humedad del suelo)
  o	SO₂ (emisiones volcánicas)
  o	Agua superficial (OPERA)
  o	Temperatura o imágenes visibles (MODIS Terra)
3. Visualizar la información en el mapa y observar los cambios temporales.
4. Escuchar una narración generada por IA que explica el fenómeno en lenguaje claro, con tono educativo y accesible.

Así, la experiencia no solo muestra datos: cuenta historias sobre cómo respira, cambia y se adapta la Tierra.

4. Arquitectura y flujo técnico:
Capa 1 – Datos satelitales NASA
Se consumen directamente desde el servicio GIBS (WMTS):
https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{LAYER}/default/{DATE}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png
Estas capas son 100% NASA o partners (NOAA, ESA, JPL), asegurando elegibilidad para el Space Apps Challenge.

Capa 2 – Visualización
•	Frontend: React + Leaflet + TailwindCSS + Framer Motion
•	Mapa interactivo centrado en la región del usuario (ej. América Latina)
•	Controles de fecha, capa y zoom
•	Panel de información con fuente, agencia, tipo de dato y fecha

Capa 3 – Narrativa
•	Módulo de texto a voz (TTS) usando OpenAI TTS o Notebook LM
•	Narraciones cortas que traducen la información técnica a lenguaje divulgativo
•	Posibilidad de generar clips de audio para redes o educación ambiental

Capa 4 – Hosting / Integración
•	Publicación en GitHub Pages o Vercel.
•	Código abierto (licencia MIT).
•	Enlace público para evaluación NASA.

5. Datos NASA utilizados:
Dataset	Descripción	Agencia	Tipo	Frecuencia
MODIS Terra True Color	Imagen visible RGB diaria de la superficie terrestre.	NASA EOSDIS	Óptico	Diario
VIIRS NOAA-20 NDVI (8 días)	Índice de vegetación normalizado.	NASA/NOAA	Biofísico	8 días
SMAP Soil Moisture L3	Humedad del suelo (36 km).	NASA JPL	Microondas	Diario
OPERA Surface Water Extent (HLS)	Extensión dinámica del agua superficial.	NASA JPL	Radar	Diario
TROPOMI SO₂ Column	Dióxido de azufre total vertical.	ESA/Copernicus (NASA EOSDIS)	Químico	Diario
MERRA-2 Air Temperature	Temperatura atmosférica a 2 m.	NASA GMAO	Reanálisis	Mensual

6. Metodología
Enfoque: Exploratorio-aplicado, con énfasis en accesibilidad y divulgación científica.
Diseño: Prototipo funcional web basado en datos reales, integrando narración automatizada.

Método:
•	Descriptivo: interpretación visual y narrativa de tendencias ambientales.
•	Analítico: comparación temporal de capas y detección de anomalías.
•	Divulgativo: traducción científica mediante IA para audio educativo.

7. Impacto
Dimensión	Aporte
Científica	Difunde conocimiento ambiental con base en datos satelitales reales.
Educativa	Crea contenido comprensible para escuelas, comunidades y medios.
Social	Democratiza el acceso a la ciencia y fomenta conciencia climática.
Tecnológica	Muestra una arquitectura cloud reproducible con APIs abiertas.
Cultural	Humaniza la ciencia espacial mediante narrativa sonora e interactiva.
