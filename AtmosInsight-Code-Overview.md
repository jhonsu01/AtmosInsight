
# AtmosInsight – Prototype Walkthrough & Code Overview

This guide explains how to **run the prototype**, what you should see when it’s running, and documents the **key source files** with annotated snippets.

---

## 1) How to run (local demo)

1. Unzip the package you downloaded earlier: `AtmosInsight-MVP.zip`  
2. In a terminal, go into the folder `AtmosInsight-MVP` and install dependencies:
   ```bash
   npm i
   ```
3. Add your Google Cloud Text-to-Speech credentials (service account with TTS enabled):
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
   ```
   > Place `service-account.json` in the project root.
4. Start the app:
   ```bash
   npm start
   ```
5. Open the browser at:
   ```
   http://localhost:8787
   ```

**What you should see:**  
- A header with controls (Layer, Date, Generate Narration, Voice).  
- A Leaflet map centered in Bogotá.  
- A side panel showing the selected layer, the tiles URL in use, and a “Narration” section with audio controls.  
- When you click **Generate Narration**, the app builds a short explainer about the selected layer/date, calls **Google Cloud TTS**, and plays a **podcast‑style MP3** in the page.

---

## 2) File map

```
AtmosInsight-MVP/
├─ index.html       # Static UI skeleton (header, controls, map container, side panel, audio player)
├─ styles.css       # Minimal, clean styling
├─ app.js           # Core logic: Leaflet viewer + GIBS tiles + narration request
├─ server.js        # Express server + Google Cloud TTS endpoint (/narrate) + static hosting
├─ package.json     # Node project settings and start script
└─ README.md        # Run instructions (also reproduced here)
```

---

## 3) Frontend (index.html)

**Purpose:** Declares the UI, loads Leaflet, and wires up the controls.

Key elements:
```html
<header>
  <h1>AtmosInsight</h1>
  <div class="controls">
    <label>Layer <select id="layer">…</select></label>
    <label>Date (UTC) <input type="date" id="date"></label>
    <button id="gen">Generate Narration</button>
    <label>Voice <select id="voice">…</select></label>
  </div>
</header>

<main>
  <div id="map"></div>
  <aside id="panel">
    <h3>Layer Info</h3>
    <div id="layerName">—</div>
    <code id="tileUrl"></code>

    <h3>Narration</h3>
    <p id="narrationText" class="narration">Click “Generate Narration”…</p>
    <audio id="audio" controls></audio>
  </aside>
</main>
```
**What it does:**  
- Provides inputs for **layer** and **date**, a **Generate Narration** button, and **voice** selector.  
- Displays **Leaflet map** and an **information panel** with the live WMTS URL and narration audio player.

---

## 4) Styling (styles.css)

**Purpose:** Clean, readable layout with a simple two‑column view (map + side panel).
- Sticky header, responsive grid, code block styling.
- The `.narration` class highlights the explanation text in a soft panel.

---

## 5) Map & GIBS logic (app.js)

**Purpose:** Initialize Leaflet, manage the selected layer/date, build the WMTS URL, and request narrations.

### 5.1) GIBS WMTS template & defaults
```js
function wmtsUrl(layer, date) {
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`;
}

function defaultUTCDate() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1); // “yesterday” to avoid NRT edges
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
```
**What it does:**  
- Builds the correct **NASA GIBS WMTS tile URL** for the chosen layer/date.  
- Sets a **default date** (UTC yesterday), which is safer for Near‑Real‑Time layers.

### 5.2) Leaflet setup & live tile updates
```js
const map = L.map("map", { center: [4.711, -74.072], zoom: 4, minZoom: 1, maxZoom: 9 });

let layer = layerSel.value;
let date = dateInput.value;

let tileLayer = L.tileLayer(wmtsUrl(layer, date), { attribution: "&copy; NASA EOSDIS GIBS" });
tileLayer.addTo(map);

function refreshLayer() {
  const url = wmtsUrl(layer, date);
  tileEl.textContent = url;
  layerNameEl.textContent = LABELS[layer] || layer;
  tileLayer.setUrl(url);
}
```
**What it does:**  
- Initializes the map centered in Bogotá.  
- Creates a `tileLayer` with the initial selection.  
- `refreshLayer()` updates both the **visual tiles** and the **URL shown** in the panel.

### 5.3) Building and requesting the narration
```js
function buildNarrative(layerId, when) {
  const friendly = LABELS[layerId] || layerId;
  return (
    `Today we explore NASA EOSDIS GIBS layer: ${friendly}. ` +
    `This visualization for ${when} helps track environmental signals like ` +
    `vegetation health, surface water, soil moisture, or atmospheric gases. ` +
    `Compare dates to find regional trends.`
  );
}

genBtn.addEventListener("click", async () => {
  const text = buildNarrative(layer, date);
  narrationP.textContent = text;

  const res = await fetch("/narrate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice: voiceSel.value }),
  });
  const data = await res.json();
  if (data?.audioContent) {
    audioEl.src = `data:audio/mp3;base64,${data.audioContent}`;
    audioEl.play().catch(()=>{});
  }
});
```
**What it does:**  
- Builds a **concise explainer** for the selected layer/date.  
- Sends it to the **backend `/narrate`** endpoint to synthesize an **MP3** via Google TTS.  
- Plays the resulting audio in the built‑in `<audio>` player.

---

## 6) Backend (server.js)

**Purpose:** Serve the static frontend **and** expose a **/narrate** endpoint that calls **Google Cloud Text‑to‑Speech**.

```js
const express = require("express");
const cors = require("cors");
const path = require("path");
const tts = require("@google-cloud/text-to-speech");

const app = express();
app.use(cors());
app.use(express.json());

// Serve the static files (index.html, app.js, styles.css)
app.use("/", express.static(path.join(__dirname)));

const client = new tts.TextToSpeechClient();

app.post("/narrate", async (req, res) => {
  const { text, voice = "en-US-Neural2-C" } = req.body || {};
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode: voice.startsWith("es-") ? "es-ES" : "en-US", name: voice },
    audioConfig: { audioEncoding: "MP3", speakingRate: 1.02 },
  });
  res.json({ audioContent: response.audioContent.toString("base64") });
});
```
**What it does:**  
- Hosts the **static app** on the same origin (`/`).  
- Implements **/narrate**, which receives `{ text, voice }`, calls Google TTS, and returns `{ audioContent }` (Base64 MP3).  
- Picks a **sensible languageCode** based on the voice (English/Spanish).

---

## 7) Voices (English & Spanish)

The **voice selector** supports:
- `en-US-Neural2-C` (US English)
- `en-GB-Neural2-A` (UK English)
- `es-ES-Neural2-C` (Spanish Spain)
- `es-CO-Neural2-A` (Spanish Colombia)

You can add more Google voices by inserting new `<option>` values that match the names available in your GCP project/region.

---

## 8) Where to adjust layers

In `index.html` (the `<select id="layer">`) and `app.js` (`LABELS` object).  
Use NASA GIBS layer identifiers such as:
- `MODIS_Terra_CorrectedReflectance_TrueColor`
- `MODIS_Terra_L3_NDVI_16Day`
- `VIIRS_NOAA20_NDVI_8Day`
- `SMAP_L3_Passive_Day_Soil_Moisture`
- `OPERA_L3_Dynamic_Surface_Water_Extent-HLS`
- `TROPOMI_L2_Sulfur_Dioxide_Total_Vertical_Column_Daily`

---

## 9) Common pitfalls

- **No audio plays**: Check credentials, API enabled, billing, and console logs.  
- **Tiles not loading**: Verify **layer name** and that the **date** exists for that product (some are 8‑day/16‑day composites).  
- **CORS errors** (if serving files separately): use the included Express server which serves both frontend and backend together.

---

## 10) What to demo (talk track)

1) Change **Layer** to “MODIS Terra – True Color”. Pick a **recent date** (yesterday).  
2) Show the **Tiles URL** updating and the map rendering.  
3) Click **Generate Narration** → a short explainer appears; press **Play** (auto‑plays if allowed).  
4) Switch to **VIIRS NDVI 8‑day** and repeat → showcase different cadence and insight.  
5) Change **Voice** to `es-CO-Neural2-A` → generate una narración en español tipo podcast.

---

**That’s it!** You now have a clean, reproducible prototype that meets the hackathon’s requirements: **NASA/partner data** via **GIBS**, and a **Google TTS** narration that turns science into an accessible story.
