// --- NASA GIBS Web Viewer (React + Leaflet) ---

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle2, Globe, Headphones, Loader2, Map, Network, Play, RefreshCw, TestTubes } from "lucide-react";

// Optional: set a backend base URL. In the browser console you can do:
//   window.__AI_BACKEND__ = "http://localhost:8787";
// If empty, the app will try relative paths and fall back to mock TTS.
const BACKEND_BASE_URL =
  (typeof window !== "undefined" && (window as any).__AI_BACKEND__) || "";

// --- Leaflet (runtime-safe) CSS injection ---
function useLeafletCss() {
  useEffect(() => {
    const id = "leaflet-css-dynamic";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
  }, []);
}

// --- GIBS Layers Catalog (minimal demo) ---
const LAYERS = [
  {
    key: "MODIS_Terra_CorrectedReflectance_TrueColor",
    label: "MODIS Terra – True Color (Optical)",
    category: "land",
    maxZoom: 9,
  },
  {
    key: "MERRA2_2m_Air_Temperature_Monthly",
    label: "MERRA‑2 – 2m Air Temperature (Atmosphere)",
    category: "atmosphere",
    maxZoom: 9,
  },
  {
    key: "OPERA_L3_Dynamic_Surface_Water_Extent-HLS",
    label: "OPERA – Surface Water Extent (Radar)",
    category: "water",
    maxZoom: 9,
  },
];

// Pick a sensible default date (yesterday UTC) to reduce NRT gaps
function isoYesterdayUTC() {
  const now = new Date();
  const utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const y = new Date(utc - 24 * 60 * 60 * 1000);
  return y.toISOString().slice(0, 10);
}

// Build NASA GIBS WMTS URL (EPSG:3857 Level9)
function gibsUrl(layerId, dateIso) {
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layerId}/default/${dateIso}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`;
}

// Try real backend. Prefer BACKEND_BASE_URL if provided; ignore 405/404 and keep probing.
async function tryRealNarrateEndpoint(body) {
  const candidates = [];
  if (BACKEND_BASE_URL) {
    const base = BACKEND_BASE_URL.replace(/\/$/, "");
    candidates.push(`${base}/narrate`, `${base}/api/narrate`);
  } else {
    // In canvas/preview there is usually no API route; '/api/narrate' often returns 405.
    candidates.push('/narrate', '/api/narrate');
  }
  const errors = [];
  for (const url of candidates) {
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body ?? { text: 'Hello from AtmosInsight', lang: 'en-US' }),
      });
      if (r.ok) return { ok: true, status: r.status, url, response: r };
      // if 405/404, continue probing next candidate
      if (r.status === 405 || r.status === 404) {
        errors.push(`${url} -> HTTP ${r.status}`);
        continue;
      }
      return { ok: false, status: r.status, url, response: r, errors };
    } catch (e) {
      errors.push(`${url} -> ${String(e)}`);
      continue;
    }
  }
  return { ok: false, status: 0, url: '(none)', errors };
}

// Mock narration using Web Speech API
function speakMock(text, lang = "en-US", rate = 1.08) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    throw new Error("SpeechSynthesis not available in this environment");
  }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

// Determine language automatically based on layer category
function autoLangForLayer(category) {
  // atmosphere (air temp, SO2, gases) => English; land/water => Spanish
  if (category === "atmosphere") return { lang: "en-US", voice: "en-US" };
  return { lang: "es-ES", voice: "es-ES" };
}

// Self tests
async function runSelfTests({ layer, date }) {
  const results = [];
  // 1) Date is <= yesterday
  try {
    const today = new Date().toISOString().slice(0, 10);
    const ok = date <= today;
    results.push({ name: "Date not in the future", pass: ok, detail: `${date} <= ${today}` });
  } catch (e) {
    results.push({ name: "Date parse", pass: false, detail: String(e) });
  }
  // 2) URL format
  try {
    const url = gibsUrl(layer.key, date);
    const ok = url.includes("GoogleMapsCompatible_Level9");
    results.push({ name: "GIBS URL pattern", pass: ok, detail: url });
  } catch (e) {
    results.push({ name: "GIBS URL pattern", pass: false, detail: String(e) });
  }
  // 3) Catalog contains essentials
  const need = ["MODIS_Terra_CorrectedReflectance_TrueColor", "MERRA2_2m_Air_Temperature_Monthly"];
  results.push({ name: "Catalog essentials", pass: need.every(k => LAYERS.find(l => l.key === k)), detail: need.join(", ") });
  // 4) SpeechSynthesis availability
  results.push({ name: "SpeechSynthesis available", pass: typeof window !== "undefined" && "speechSynthesis" in window, detail: "mock capable" });
  return results;
}

export default function AtmosInsightCanvas() {
  useLeafletCss();
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const tileRef = useRef(null);

  const [layerKey, setLayerKey] = useState(LAYERS[0].key);
  const activeLayer = useMemo(() => LAYERS.find(l => l.key === layerKey)!, [layerKey]);
  const [dateIso, setDateIso] = useState(isoYesterdayUTC());

  const [mockTts, setMockTts] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [probe, setProbe] = useState(null);
  const [loadingProbe, setLoadingProbe] = useState(false);

  // Initialize Leaflet map lazily
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (mapRef.current || !mapEl.current) return;
      const L = await import("leaflet");
      if (cancelled) return;
      const map = L.map(mapEl.current, { center: [4.6, -74.1], zoom: 5 });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
      mapRef.current = map;
      // load first GIBS layer
      updateGibsLayer();
    })();
    return () => { cancelled = true; };
  }, []);

  // Update GIBS layer when layer/date changes
  useEffect(() => { updateGibsLayer(); }, [layerKey, dateIso]);

  async function updateGibsLayer() {
    if (!mapRef.current) return;
    const L = await import("leaflet");
    if (tileRef.current) {
      mapRef.current.removeLayer(tileRef.current);
      tileRef.current = null;
    }
    const url = gibsUrl(activeLayer.key, dateIso);
    const t = L.tileLayer(url, { maxZoom: activeLayer.maxZoom ?? 9, crossOrigin: true });
    t.addTo(mapRef.current);
    tileRef.current = t;
  }

  async function onGenerateNarration() {
    const { lang } = autoLangForLayer(activeLayer.category);
    const textEN = `AtmosInsight: Displaying ${activeLayer.label} for ${dateIso}.`;
    const textES = `AtmosInsight: Mostrando ${activeLayer.label} para ${dateIso}.`;
    const text = lang.startsWith("en") ? textEN : textES;

    if (mockTts) {
      try {
        speakMock(text, lang, 1.06);
      } catch (e) {
        alert("Mock TTS not available in this runtime.");
      }
      return;
    }

    // try real backend first
    const resp = await tryRealNarrateEndpoint({ text, lang });
    if (!resp.ok) {
      // fallback to mock
      try {
        speakMock(text, lang, 1.06);
      } catch (_) {
        alert(`TTS backend failed (${resp.status}). Mock also unavailable.`);
      }
      return;
    }

    try {
      // Handle either JSON {audioContent} or binary MP3
      const ctype = resp.response.headers.get("content-type") || "";
      let audioUrl = null;
      if (ctype.includes("application/json")) {
        const data = await resp.response.json();
        const b64 = data.audioContent || data.audio || "";
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        audioUrl = URL.createObjectURL(new Blob([bytes], { type: "audio/mpeg" }));
      } else {
        const blob = await resp.response.blob();
        audioUrl = URL.createObjectURL(blob);
      }
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (e) {
      // last fallback
      try {
        speakMock(text, lang, 1.06);
      } catch (_) {
        alert("Could not play TTS (backend + mock failed).");
      }
    }
  }

  async function onTestBackend() {
    setLoadingProbe(true);
    // If no BACKEND_BASE_URL, we still attempt relative endpoints; likely 405 in canvas.
    const res = await tryRealNarrateEndpoint({ text: 'Probe', lang: 'en-US' });
    setProbe(res);
    setLoadingProbe(false);
  }

  async function onRunSelfTests() {
    setTesting(true);
    const results = await runSelfTests({ layer: activeLayer, date: dateIso });
    setTestResults(results);
    setTesting(false);
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[380px_1fr]">
      {/* Sidebar */}
      <div className="p-5 border-r border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <h1 className="text-xl font-semibold">AtmosInsight – NASA GIBS Viewer</h1>
        </div>

        {/* Layer select */}
        <div className="space-y-2">
          <Label htmlFor="layer">Layer</Label>
          <select
            id="layer"
            className="w-full border rounded-md px-3 py-2 bg-background"
            value={layerKey}
            onChange={(e) => setLayerKey(e.target.value)}
          >
            {LAYERS.map((l) => (
              <option key={l.key} value={l.key}>{l.label}</option>
            ))}
          </select>
        </div>

        {/* Date input */}
        <div className="space-y-2">
          <Label htmlFor="date">Date (UTC)</Label>
          <Input id="date" type="date" value={dateIso} onChange={(e) => setDateIso(e.target.value)} />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button onClick={onGenerateNarration} className="gap-2">
            <Headphones className="h-4 w-4" /> Generate Narration
          </Button>
          <Button variant="secondary" onClick={onTestBackend} className="gap-2">
            {loadingProbe ? <Loader2 className="h-4 w-4 animate-spin" /> : <Network className="h-4 w-4" />} Test Real Backend
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch id="mock" checked={mockTts} onCheckedChange={setMockTts} />
            <Label htmlFor="mock">Mock Narration (browser SpeechSynthesis)</Label>
          </div>
        </div>

        {/* Probe result */}
        {probe && (
          <Card>
            <CardContent className="p-3 text-sm">
              <div className="flex items-center gap-2">
                {probe.ok ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                <div>
                  <div><b>Endpoint:</b> {probe.url}</div>
                  <div><b>Status:</b> {probe.status}</div>
                </div>
              </div>
              {probe.errors?.length ? (
                <pre className="mt-2 whitespace-pre-wrap text-xs opacity-80">{probe.errors.join("\n")}</pre>
              ) : null}
            </CardContent>
          </Card>
        )}

        {/* Self tests */}
        <div className="space-y-2">
          <Button variant="outline" onClick={onRunSelfTests} className="gap-2">
            <TestTubes className="h-4 w-4" /> Run Self-Tests
          </Button>
          {!!testResults.length && (
            <ul className="text-sm list-disc ml-5 space-y-1">
              {testResults.map((t, i) => (
                <li key={i} className={t.pass ? "text-green-700" : "text-red-700"}>
                  <b>{t.name}:</b> {t.pass ? "PASS" : "FAIL"} <span className="opacity-70">— {t.detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Map area */}
      <div className="relative">
        <div ref={mapEl} className="absolute inset-0" />
        <div className="absolute top-3 right-3 bg-white/85 dark:bg-black/60 rounded-md shadow px-3 py-1 text-xs flex items-center gap-2">
          <Map className="h-3.5 w-3.5" />
          <span>{activeLayer.label}</span>
        </div>
      </div>
    </div>
  );
}
