// AtmosInsight minimal MVP
// NASA GIBS WMTS template (EPSG:3857)
function wmtsUrl(layer, date) {
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`;
}

// Sensible default: yesterday (UTC)
function defaultUTCDate() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Layer labels
const LABELS = {
  MODIS_Terra_CorrectedReflectance_TrueColor: "MODIS Terra – True Color",
  MODIS_Terra_L3_NDVI_16Day: "MODIS Terra – NDVI (16-day)",
  VIIRS_NOAA20_NDVI_8Day: "VIIRS NOAA-20 – NDVI (8-day)",
  SMAP_L3_Passive_Day_Soil_Moisture: "SMAP – Soil Moisture (L3 36km)",
  OPERA_L3_Dynamic_Surface_Water_Extent-HLS: "OPERA – Surface Water Extent (HLS)",
  TROPOMI_L2_Sulfur_Dioxide_Total_Vertical_Column_Daily: "Sentinel-5P TROPOMI – SO₂",
};

const map = L.map("map", {
  center: [4.711, -74.072], // Bogotá
  zoom: 4,
  minZoom: 1,
  maxZoom: 9,
});

const layerSel = document.getElementById("layer");
const dateInput = document.getElementById("date");
const tileEl = document.getElementById("tileUrl");
const layerNameEl = document.getElementById("layerName");
const genBtn = document.getElementById("gen");
const narrationP = document.getElementById("narrationText");
const audioEl = document.getElementById("audio");
const voiceSel = document.getElementById("voice");

dateInput.value = defaultUTCDate();

let layer = layerSel.value;
let date = dateInput.value;

let tileLayer = L.tileLayer(wmtsUrl(layer, date), {
  attribution: "&copy; NASA EOSDIS GIBS",
});
tileLayer.addTo(map);

function refreshLayer() {
  const url = wmtsUrl(layer, date);
  tileEl.textContent = url;
  layerNameEl.textContent = LABELS[layer] || layer;
  tileLayer.setUrl(url);
}

layerSel.addEventListener("change", () => {
  layer = layerSel.value;
  refreshLayer();
});

dateInput.addEventListener("change", () => {
  date = dateInput.value;
  refreshLayer();
});

// Build short narrative text
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

  try {
    genBtn.disabled = true;
    genBtn.textContent = "Generating…";

    // Try local Express dev server first; fallback to Next.js route if hosted together
    const endpoint = "/narrate"; // if serving both via one origin (proxy)
    // If CORS from a separate server: const endpoint = "http://localhost:8787/narrate";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice: voiceSel.value }),
    });

    if (!res.ok) throw new Error("TTS request failed");
    const data = await res.json();
    if (data?.audioContent) {
      audioEl.src = `data:audio/mp3;base64,${data.audioContent}`;
      audioEl.play().catch(()=>{});
    } else {
      audioEl.removeAttribute("src");
    }
  } catch (e) {
    console.error(e);
    alert("Narration failed. Check backend logs and credentials.");
  } finally {
    genBtn.disabled = false;
    genBtn.textContent = "Generate Narration";
  }
});

// Initial info
refreshLayer();
