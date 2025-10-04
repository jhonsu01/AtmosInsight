# 🌍 **AtmosInsight: Visualizing Earth, Listening to the Climate**
**Omnicron Animate – NASA Space Apps Challenge 2025**

## 1. A Story Born from Space

For over half a century, NASA has observed our planet as never before — from space, through thousands of technological eyes that orbit and record every change in the atmosphere, soil, vegetation, and oceans.

However, while satellites capture terabytes of data every day, much of this information remains hidden behind technical portals, complex formats, and scientific jargon that few can understand.

That’s where **AtmosInsight** was born — a tool that translates satellite science into human stories, combining interactive visualization with accessible narration.
Its goal is simple: to help anyone, regardless of technical background, understand what satellites see and *listen* to what Earth is trying to tell us.

## 2. The Challenge

The challenge that inspired this project was:

> “How can Earth observation data be made understandable, engaging, and useful for everyone?”

Most scientific portals present raw data — maps, indexes, coordinates, graphs.
But behind every pixel lies a story: a spreading drought, a forest breathing less, or a sulfur dioxide plume revealing a volcano awakening.

**AtmosInsight** proposes a new way to tell environmental science stories by combining spatial visualization, digital storytelling, and artificial intelligence.

## 3. Our Solution:

### Interactive Visualization + Audio Narrative

AtmosInsight is a web application that connects directly to **NASA’s open APIs**, especially **GIBS (Global Imagery Browse Services)**, to bring real-time satellite imagery and reconstruct the evolution of atmospheric and terrestrial phenomena.

The user can:

* Select a date or historical event (e.g., a hurricane or pollution peak).
* Choose a satellite layer such as:

  * NDVI (Vegetation)
  * SMAP (Soil Moisture)
  * SO₂ (Volcanic Emissions)
  * Surface Water (OPERA)
  * Temperature or visible imagery (MODIS Terra)
* Visualize the information on a map and observe temporal changes.
* Listen to an AI-generated narration that explains the phenomenon in clear, educational language.

Thus, the experience doesn’t just display data — it tells stories about how Earth breathes, changes, and adapts.

## 4. Architecture and Technical Flow

| **Layer**                 | **Description**                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **NASA Satellite Data**   | Direct consumption from GIBS (WMTS*):                                                                                                                        |
| **Visualization**         | Built with **React + Leaflet + TailwindCSS + Framer Motion** for interactive maps and UI.                                                                    |
| **Narrative**             | Text-to-Speech (TTS) module powered by **Google Cloud TTS** or **Notebook LM** to convert AI-generated explanations into podcast-style audio.                |
| **Hosting / Integration** | Deployed on **GitHub Pages** or **Vercel**. Open-source (MIT License) and publicly accessible for NASA evaluation.                                           |

(*) https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{LAYER}/default/{DATE}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png

## 5. NASA Datasets Used

| **Dataset**                      | **Description**                             | **Agency**                   | **Type**    | **Frequency** |
| -------------------------------- | ------------------------------------------- | ---------------------------- | ----------- | ------------- |
| MODIS Terra True Color           | Daily RGB visible image of Earth’s surface. | NASA EOSDIS                  | Optical     | Daily         |
| VIIRS NOAA-20 NDVI (8-day)       | Normalized Difference Vegetation Index.     | NASA/NOAA                    | Biophysical | 8 days        |
| SMAP Soil Moisture L3            | Surface soil moisture (36 km).              | NASA JPL                     | Microwave   | Daily         |
| OPERA Surface Water Extent (HLS) | Dynamic surface water extent.               | NASA JPL                     | Radar       | Daily         |
| TROPOMI SO₂ Column               | Total vertical sulfur dioxide.              | ESA/Copernicus (NASA EOSDIS) | Chemical    | Daily         |
| MERRA-2 Air Temperature          | Atmospheric temperature at 2 m.             | NASA GMAO                    | Reanalysis  | Monthly       |

## 6. Methodology

**Approach:** Exploratory–applied, emphasizing accessibility and scientific outreach.
**Design:** Functional web prototype based on real data, integrating automated narration.

**Methods:**

* **Descriptive:** Visual and narrative interpretation of environmental trends.
* **Analytical:** Temporal comparison of layers and anomaly detection.
* **Educational:** AI-based translation of technical data into engaging audio content.

## 7. Impact

| **Dimension**     | **Contribution**                                                       |
| ----------------- | ---------------------------------------------------------------------- |
| **Scientific**    | Spreads environmental knowledge based on real satellite data.          |
| **Educational**   | Creates understandable content for schools, communities, and media.    |
| **Social**        | Democratizes access to science and fosters climate awareness.          |
| **Technological** | Demonstrates a reproducible cloud architecture using open APIs.        |
| **Cultural**      | Humanizes space science through interactive and auditory storytelling. |

### 🌐 Attribution

Imagery courtesy of NASA EOSDIS GIBS, JPL, NOAA, and ESA/Copernicus.

## 🚀 How to Contribute

This project is open-source and welcomes collaboration from developers, designers, and science communicators.
Fork the repository, create a feature branch, and open a pull request.
