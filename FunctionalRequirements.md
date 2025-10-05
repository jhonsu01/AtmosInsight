# Functional Requirements – AtmosInsight

## 1. General Objective
Show how open satellite data can be transformed into interactive maps and narrated experiences that inform the public about environmental conditions.

## 2. Prototype Scope
- Web client built with Leaflet and NASA GIBS WMTS layers.  
- Time selection and basic animation (time-lapse).  
- Podcast-style narration via Text-to-Speech (TTS), using mock mode for development and Google Cloud TTS for production.

## 3. Functional Requirements
| ID | Requirement | Description |
|----|--------------|-------------|
| FR-01 | Layer Selection | Select and display GIBS layers (MODIS, VIIRS, SMAP, OPERA, TROPOMI, MERRA-2). |
| FR-02 | Date Input | Specify ISO-formatted date and refresh map tiles. |
| FR-03 | Time-Lapse Playback | Animate N consecutive days of imagery. |
| FR-04 | Metadata Display | Show source, cadence, and URL metadata per layer. |
| FR-05 | Narration Generation | Create explanatory narration (EN/ES) describing current layer and date. |
| FR-06 | Export Options | Export current map view as image and JSON metadata. |
| FR-07 | Internationalization | Switch interface language (EN/ES). |
| FR-08 | Backend Health Check | Query backend readiness via `/health`. |
| FR-09 | TTS Fallback | Use browser SpeechSynthesis when TTS API is unavailable. |
| FR-10 | Settings Persistence | Store last user settings locally in the browser. |

## 4. Constraints
- No private API keys or credentials in the repository.  
- Tile resolution limited to EPSG:3857 Level 9 for demo purposes.  
- Certain datasets (NRT/STD) have inherent update delays or historical limits.

## 5. Success Criteria
- Jury can switch between layers and dates with valid map rendering.  
- Narration works in both modes (mock SpeechSynthesis or real TTS).  
- Setup and usage instructions are clearly documented in README.  
- The prototype runs successfully on a standard laptop or Vercel/Render hosting.
