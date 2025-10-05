# Requerimientos Funcionales – AtmosInsight

## 1. Objetivo General
Demostrar cómo los datos satelitales abiertos pueden convertirse en mapas interactivos y experiencias narradas que informen al público sobre condiciones ambientales.

## 2. Alcance del Prototipo
- Cliente web construido con Leaflet y capas NASA GIBS WMTS.  
- Selección de fecha y animación básica (time-lapse).  
- Narración tipo podcast mediante Text-to-Speech (TTS), usando modo simulado en desarrollo y Google Cloud TTS en producción.

## 3. Requerimientos Funcionales
| ID | Requerimiento | Descripción |
|----|----------------|-------------|
| RF-01 | Selección de Capas | Seleccionar y mostrar capas GIBS (MODIS, VIIRS, SMAP, OPERA, TROPOMI, MERRA-2). |
| RF-02 | Entrada de Fecha | Especificar la fecha en formato ISO y refrescar los mosaicos del mapa. |
| RF-03 | Reproducción Temporal | Animar N días consecutivos de imágenes. |
| RF-04 | Visualización de Metadatos | Mostrar fuente, cadencia y URL de cada capa. |
| RF-05 | Generación de Narración | Crear narración explicativa (ES/EN) sobre la capa y la fecha seleccionadas. |
| RF-06 | Opciones de Exportación | Exportar la vista actual como imagen y metadatos JSON. |
| RF-07 | Internacionalización | Cambiar el idioma de la interfaz (ES/EN). |
| RF-08 | Verificación del Backend | Consultar el estado del backend a través de `/health`. |
| RF-09 | Fallback de TTS | Usar SpeechSynthesis del navegador cuando la API TTS no esté disponible. |
| RF-10 | Persistencia de Configuración | Guardar las últimas preferencias del usuario localmente en el navegador. |

## 4. Requerimientos No Funcionales
| ID | Requerimiento | Descripción |
|----|----------------|-------------|
| RNF-01 | Acceso Público a Datos | Usar únicamente endpoints públicos/anónimos de NASA GIBS. |
| RNF-02 | Rendimiento | El mapa base debe cargar en menos de 3 segundos en redes 3G rápidas. |
| RNF-03 | Accesibilidad | Cumplir con WCAG 2.1 AA: visibilidad del foco, contraste y etiquetas ARIA. |
| RNF-04 | Resiliencia | Manejar errores de red/API de forma tolerante mediante reintentos y fallbacks. |
| RNF-05 | Simplicidad de Despliegue | Operar como frontend estático con backend opcional en Node/Next. |

## 5. Restricciones
- No incluir llaves privadas ni credenciales en el repositorio.  
- Resolución de mosaicos limitada a EPSG:3857 Nivel 9 (demo).  
- Algunos datasets (NRT/STD) presentan retrasos o límites históricos inherentes.

## 6. Criterios de Éxito
- El jurado puede cambiar entre capas y fechas con renderizado válido del mapa.  
- La narración funciona en ambos modos (SpeechSynthesis o TTS real).  
- La configuración y uso están claramente documentados en el README.  
- El prototipo funciona correctamente en un portátil estándar o en hosting Vercel/Render.
