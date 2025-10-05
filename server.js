/**
 * Minimal Express server for Google Cloud Text-to-Speech
 * Usage:
 *   npm i express cors @google-cloud/text-to-speech
 *   export GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
 *   node server.js
 */
const express = require("express");
const cors = require("cors");
const path = require("path");
const tts = require("@google-cloud/text-to-speech");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend (index.html, app.js, styles.css)
app.use("/", express.static(path.join(__dirname)));

const client = new tts.TextToSpeechClient();

app.post("/narrate", async (req, res) => {
  try {
    const { text, voice = "en-US-Neural2-C" } = req.body || {};
    if (!text) return res.status(400).json({ error: "Missing text" });

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: voice.startsWith("es-") ? "es-ES" : "en-US", name: voice },
      audioConfig: { audioEncoding: "MP3", speakingRate: 1.02 },
    });

    res.json({ audioContent: response.audioContent.toString("base64") });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "TTS failed" });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`AtmosInsight server on http://localhost:${PORT}`));
