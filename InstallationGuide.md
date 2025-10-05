
# 🧭 AtmosInsight Prototype – Installation and Configuration Guide

## 🇬🇧 English

### 🔧 Objective
This prototype demonstrates how **open satellite data** can be transformed into **interactive maps and narrated experiences**, combining NASA’s GIBS visualization layers with AI-generated audio using Google Cloud Text-to-Speech.

---

### 🧩 1. Prerequisites
Before starting the installation, make sure you have:

- **Node.js** version 18 or higher  
  [Download from Node.js](https://nodejs.org)  
- A **Google Cloud account** with the **Text-to-Speech API** enabled  
  [Enable the API](https://cloud.google.com/text-to-speech/docs/before-you-begin)  
- A **service account key (JSON)** with `Text-to-Speech API User` permissions.  

---

### ⚙️ 2. Installation Steps

#### Step 1 — Clone the repository
```bash
git clone https://github.com/<your_user>/AtmosInsight.git
cd AtmosInsight/prototype
```

#### Step 2 — Install dependencies
```bash
npm install
```

This will install:
- **express** → web server  
- **cors** → cross-origin access  
- **@google-cloud/text-to-speech** → Google TTS client  

---

### 🧠 3. Environment Configuration

#### Step 3 — Add Google Cloud credentials
Place your service account file in the `/prototype` folder and name it:
```
service-account.json
```

Then, define the environment variable:
```bash
export GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
```

> 💡 On Windows (PowerShell), use:
> ```powershell
> setx GOOGLE_APPLICATION_CREDENTIALS ".\service-account.json"
> ```

---

### 🚀 4. Running the Prototype

#### Step 4 — Start the Node.js server
```bash
npm start
```

You should see:
```
AtmosInsight server on http://localhost:8787
```

#### Step 5 — Open the application
Open your browser and go to:
```
http://localhost:8787
```

You will see the **interactive map interface**, with controls for:
- Date selection  
- Satellite layer selection (MODIS, VIIRS, SMAP, TROPOMI, OPERA)  
- “Generate Narration” button to listen to AI-generated podcast narration  

---

### 🛰️ 5. Functional Verification

To confirm correct setup:
1. Select a **date** (preferably recent).  
2. Choose the **MODIS True Color** layer.  
3. Click **Generate Narration**.  
4. You should hear an audio narration of the dataset’s environmental context.  

If no audio plays:
- Check the console for errors (credentials or permissions).  
- Verify your Google Cloud project’s TTS quota.  
- Ensure NASA GIBS endpoints are reachable.

---

### 📁 6. Project Structure

```
prototype/
├── index.html        # User interface
├── app.js            # NASA GIBS + TTS logic
├── styles.css        # Visual design
├── server.js         # Node.js backend for TTS
├── package.json      # Dependencies
└── service-account.json (not committed)
```

---

### ✅ 7. Completion Criteria

AtmosInsight is successfully configured when:
- The **map** loads NASA imagery layers.  
- The **narration** button generates and plays an AI audio clip.  
- No authentication or CORS errors appear in the console.  

---

## 🇪🇸 Español

### 🔧 Objetivo
Este prototipo demuestra cómo los **datos satelitales abiertos** pueden transformarse en **mapas interactivos y experiencias narradas**, combinando las capas de visualización de **NASA GIBS** con narraciones de voz generadas por IA mediante **Google Cloud Text-to-Speech**.

---

### 🧩 1. Requisitos previos
Antes de iniciar la instalación, asegúrate de tener:

- **Node.js** versión 18 o superior  
  [Descargar desde Node.js](https://nodejs.org)  
- Una **cuenta en Google Cloud** con la **API de Text-to-Speech habilitada**  
  [Guía: Activar API](https://cloud.google.com/text-to-speech/docs/before-you-begin)  
- Una **clave de cuenta de servicio (JSON)** con permisos de `Text-to-Speech API User`.

---

### ⚙️ 2. Pasos de instalación

#### Paso 1 — Clonar el repositorio
```bash
git clone https://github.com/<tu_usuario>/AtmosInsight.git
cd AtmosInsight/prototype
```

#### Paso 2 — Instalar dependencias
```bash
npm install
```

Esto instalará:
- **express** → servidor web  
- **cors** → acceso entre orígenes  
- **@google-cloud/text-to-speech** → cliente de TTS de Google  

---

### 🧠 3. Configuración del entorno

#### Paso 3 — Agregar credenciales de Google Cloud
Coloca tu archivo de credenciales en la carpeta `/prototype` con el nombre:
```
service-account.json
```

Luego define la variable de entorno:
```bash
export GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
```

> 💡 En Windows (PowerShell):
> ```powershell
> setx GOOGLE_APPLICATION_CREDENTIALS ".\service-account.json"
> ```

---

### 🚀 4. Ejecución del prototipo

#### Paso 4 — Iniciar el servidor Node.js
```bash
npm start
```

Deberías ver en la consola:
```
AtmosInsight server on http://localhost:8787
```

#### Paso 5 — Abrir la aplicación
En tu navegador, abre:
```
http://localhost:8787
```

Aparecerá la **interfaz del mapa interactivo**, con controles para:
- Selección de fecha  
- Selección de capa satelital (MODIS, VIIRS, SMAP, TROPOMI, OPERA)  
- Botón **“Generate Narration / Podcast de la Tierra”** para escuchar la narración generada por IA.

---

### 🛰️ 5. Verificación funcional

Para comprobar la instalación:
1. Selecciona una **fecha reciente**.  
2. Escoge la capa **MODIS Color Real**.  
3. Haz clic en **Generar Narración**.  
4. Escucharás una narración sobre el contexto ambiental del dataset.  

Si no hay audio:
- Verifica la consola (credenciales o permisos).  
- Confirma el uso de la API TTS en Google Cloud.  
- Asegura la conexión con los endpoints de NASA GIBS.

---

### 📁 6. Estructura del proyecto

```
prototype/
├── index.html        # Interfaz principal
├── app.js            # Lógica de GIBS + TTS
├── styles.css        # Diseño visual
├── server.js         # Backend Node.js (TTS)
├── package.json      # Dependencias
└── service-account.json (no se sube al repositorio)
```

---

### ✅ 7. Criterios de finalización

La configuración es correcta cuando:
- El **mapa** muestra las capas satelitales de NASA.  
- El botón de **narración** genera y reproduce el audio.  
- No aparecen errores de autenticación ni CORS en consola.  
