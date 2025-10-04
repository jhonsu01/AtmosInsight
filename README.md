# 💻 Prototype – AtmosInsight / Prototipo

## 🇬🇧 English

This folder (`/prototype`) contains the **functional code** of the AtmosInsight web application — the interactive visualization and audio-narration prototype developed by **Omnicron Animate** for the **NASA Space Apps Challenge 2025**.

### ⚙️ Structure

| File | Description |
|------|--------------|
| **index.html** | Main web interface. Includes the layout, map container, and user controls for layer, date, and voice selection. |
| **app.js** | Core client-side logic. Connects to NASA GIBS WMTS layers, renders data using Leaflet, and communicates with the Text-to-Speech backend. |
| **styles.css** | Stylesheet that defines the UI layout, responsive grid, color scheme, and typography. |
| **server.js** | Node.js Express server that exposes the `/narrate` endpoint. Handles requests to **Google Cloud Text-to-Speech** and returns MP3 audio. |
| **package.json** | Defines the dependencies and scripts for running the Node server (`express`, `@google-cloud/text-to-speech`, `cors`). |
| **README.md** | Documentation for this folder (the file you are reading). |
| **README_ES.md** *(optional)* | Spanish version of this documentation, if required for submission. |

---

### 🧩 Purpose

The prototype demonstrates how open satellite data can be transformed into **interactive maps and narrated experiences**.  
It integrates:
- NASA’s **Global Imagery Browse Services (GIBS)** for real-time satellite imagery.  
- **Google Cloud Text-to-Speech (TTS)** for generating podcast-style narrations.  
- A **lightweight front-end** with Leaflet and Vanilla JS.  

---

### 🧠 How to Run the Prototype

1. Install Node.js (v18 or higher).  
2. In the terminal, navigate to the folder:
   ```bash
   cd prototype
````

3. Install dependencies:

   ```bash
   npm install
   ```
4. Add your Google Cloud credentials file:

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
   ```
5. Start the server:

   ```bash
   npm start
   ```
6. Open the application in your browser:

   ```
   http://localhost:8787
   ```
7. Select a **layer** (e.g., MODIS Terra, SMAP), choose a **date**, and click **Generate Narration** to hear the AI narration.

---

## 🇪🇸 Español

Esta carpeta (`/prototype`) contiene el **código funcional** de la aplicación web **AtmosInsight** — el prototipo de visualización interactiva y narración auditiva desarrollado por **Omnicron Animate** para el **NASA Space Apps Challenge 2025**.

### ⚙️ Estructura

| Archivo                       | Descripción                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **index.html**                | Interfaz web principal. Contiene el diseño, el mapa y los controles de selección de capa, fecha y voz.                                                  |
| **app.js**                    | Lógica central del cliente. Conecta con las capas WMTS de NASA GIBS, renderiza los datos mediante Leaflet y se comunica con el backend de Texto a Voz.  |
| **styles.css**                | Hoja de estilos que define el diseño de la interfaz, la cuadrícula adaptable, los colores y la tipografía.                                              |
| **server.js**                 | Servidor Node.js con Express que expone el endpoint `/narrate`. Gestiona las solicitudes hacia **Google Cloud Text-to-Speech** y devuelve el audio MP3. |
| **package.json**              | Define las dependencias y scripts necesarios para ejecutar el servidor (`express`, `@google-cloud/text-to-speech`, `cors`).                             |
| **README.md**                 | Documento de descripción general de esta carpeta.                                                                                                       |
| **README_ES.md** *(opcional)* | Versión en español de esta documentación, si se requiere para la entrega.                                                                               |

---

### 🧩 Propósito

El prototipo demuestra cómo los datos satelitales abiertos pueden transformarse en **mapas interactivos y experiencias narradas**.
Integra:

* **Global Imagery Browse Services (GIBS)** de la NASA para imágenes satelitales en tiempo real.
* **Google Cloud Text-to-Speech (TTS)** para generar narraciones tipo podcast.
* Un **frontend liviano** basado en Leaflet y JavaScript puro.

---

### 🧠 Cómo ejecutar el prototipo

1. Instala Node.js (versión 18 o superior).
2. En la terminal, navega hasta la carpeta:

   ```bash
   cd prototype
   ```
3. Instala las dependencias:

   ```bash
   npm install
   ```
4. Agrega el archivo de credenciales de Google Cloud:

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
   ```
5. Inicia el servidor:

   ```bash
   npm start
   ```
6. Abre la aplicación en tu navegador:

   ```
   http://localhost:8787
   ```
7. Selecciona una **capa** (por ejemplo, MODIS Terra o SMAP), elige una **fecha** y haz clic en **Generate Narration** para escuchar la narración generada por IA.

---

✨ **Note / Nota:**
All data visualizations are attributed to NASA EOSDIS GIBS, JPL, NOAA, and ESA/Copernicus.
Todas las visualizaciones provienen de fuentes abiertas acreditadas a NASA EOSDIS GIBS, JPL, NOAA y ESA/Copernicus.

```

---

¿Deseas que te prepare también un **README_ES.md** complementario (solo en español) para la misma carpeta, con redacción académica y más orientada a documentación oficial UNAD/NASA? Puedo dejarlo alineado con tu versión institucional.
```
