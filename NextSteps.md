## 🌍 **AtmosInsight – Next Steps (English Version)**

### **1. Overview**

The AtmosInsight prototype successfully demonstrates the integration of NASA EOSDIS GIBS data with interactive visualization and narration capabilities.
The next development phase will focus on improving data processing, real-time interaction, and deployment scalability.

### **2. Short-Term Goals (0–3 months)**

| Goal                                        | Description                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------------- |
| ✅ **Integrate Google Cloud Text-to-Speech** | Implement `/narrate` endpoint with real TTS output using Google credentials.       |
| 🌐 **Add multilingual narration**           | Enable automatic English/Spanish detection for narration text.                     |
| 🗺️ **Expand NASA GIBS layer catalog**      | Include more environmental datasets with metadata (frequency, source, and agency). |
| ⚙️ **Implement time-series animation**      | Animate daily/monthly changes in GIBS layers over time.                            |
| 🧩 **Enhance UI/UX**                        | Improve responsive layout, layer switching, and visual overlays.                   |

### **3. Mid-Term Goals (3–6 months)**

| Goal                                     | Description                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| ☁️ **Deploy backend to Cloud**           | Use AWS Lambda or Google Cloud Run for scalable execution.                   |
| 📡 **Integrate live environmental data** | Connect APIs for real-time air quality, vegetation, and hydrological layers. |
| 🔐 **Add authentication**                | Allow users to save map sessions and language preferences.                   |
| 📦 **Containerize project**              | Create Docker image for consistent deployment.                               |
| 📘 **API documentation**                 | Publish OpenAPI/Swagger docs for all endpoints.                              |

### **4. Long-Term Goals (6–12 months)**

| Goal                             | Description                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------- |
| 🤖 **AI Narration Engine**       | Use machine learning to auto-generate narrations from atmospheric anomalies. |
| 🛰️ **Connect to external APIs** | Integrate NASA POWER and Copernicus Sentinel Hub data.                       |
| 🌍 **Progressive Web App (PWA)** | Enable offline visualization and caching of satellite tiles.                 |
| 🧠 **Analytics Dashboard**       | Visualize usage metrics, narration requests, and performance stats.          |
| 📚 **Publish Whitepaper**        | Create a scientific publication on open satellite data integration.          |

### **5. Collaboration and Governance**

* Establish **GitHub Project Boards** and milestone tracking.
* Define **branch naming**, **commit message**, and **code review** conventions.
* Hold **bi-weekly stand-ups** with contributors (UNAD IMAN / SAT).
* Maintain **bilingual documentation** (EN/ES) for open collaboration.

### **6. Deployment and Dissemination**

| Action                             | Description                                                    |
| ---------------------------------- | -------------------------------------------------------------- |
| 🚀 **Host frontend**               | Deploy on GitHub Pages or Vercel with backend on Cloud Run.    |
| 🎙️ **Educational outreach**       | Produce podcast-style content using generated narrations.      |
| 🌐 **Domain registration**         | Register `atmosinsight.org` for the public portal.             |
| 🧭 **Institutional collaboration** | Align features with NASA’s Open Data and educational programs. |

---

# 🇪🇸 **AtmosInsight – Próximos Pasos (Versión en Español)**

### **1. Visión General**

El prototipo AtmosInsight demuestra con éxito la integración de datos del sistema NASA EOSDIS GIBS con visualización interactiva y narración.
La próxima fase del desarrollo se centrará en mejorar el procesamiento de datos, la interacción en tiempo real y la escalabilidad del despliegue.

### **2. Objetivos a Corto Plazo (0–3 meses)**

| Objetivo                                   | Descripción                                                                               |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| ✅ **Integrar Google Cloud Text-to-Speech** | Implementar el endpoint `/narrate` con salida TTS real utilizando credenciales de Google. |
| 🌐 **Añadir narración multilingüe**        | Activar la detección automática inglés/español para el texto narrativo.                   |
| 🗺️ **Ampliar el catálogo de capas GIBS**  | Incluir más conjuntos de datos ambientales con metadatos (frecuencia, fuente y agencia).  |
| ⚙️ **Implementar animación temporal**      | Visualizar cambios diarios/mensuales en las capas GIBS.                                   |
| 🧩 **Mejorar la interfaz de usuario**      | Optimizar el diseño adaptable, la selección de capas y las superposiciones visuales.      |

### **3. Objetivos a Mediano Plazo (3–6 meses)**

| Objetivo                                         | Descripción                                                          |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| ☁️ **Migrar el backend a la nube**               | Utilizar AWS Lambda o Google Cloud Run para una ejecución escalable. |
| 📡 **Integrar datos ambientales en tiempo real** | Conectar APIs para calidad del aire, vegetación y cuerpos de agua.   |
| 🔐 **Añadir autenticación de usuarios**          | Permitir guardar sesiones del mapa y preferencias de idioma.         |
| 📦 **Contenerizar el proyecto**                  | Crear una imagen Docker para despliegue reproducible.                |
| 📘 **Documentar la API**                         | Publicar especificaciones OpenAPI/Swagger para los endpoints.        |

### **4. Objetivos a Largo Plazo (6–12 meses)**

| Objetivo                               | Descripción                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 🤖 **Motor de narración con IA**       | Utilizar modelos de aprendizaje automático para generar narraciones basadas en anomalías atmosféricas. |
| 🛰️ **Conexión con APIs externas**     | Integrar datos de NASA POWER y Copernicus Sentinel Hub.                                                |
| 🌍 **Aplicación web progresiva (PWA)** | Permitir visualización sin conexión y almacenamiento en caché de mosaicos satelitales.                 |
| 🧠 **Panel analítico de métricas**     | Mostrar estadísticas de uso, solicitudes de narración y rendimiento.                                   |
| 📚 **Publicación técnica**             | Elaborar un artículo o whitepaper sobre integración de datos satelitales abiertos.                     |

### **5. Colaboración y Gobernanza**

* Establecer **tableros de proyecto en GitHub** para gestión de hitos.
* Definir convenciones de **nombres de ramas, commits y revisiones de código**.
* Realizar **reuniones quincenales** con los equipos IMAN y SAT de la UNAD.
* Mantener la **documentación bilingüe** (Inglés/Español) para la colaboración abierta.

### **6. Despliegue y Difusión**

| Acción                            | Descripción                                                             |
| --------------------------------- | ----------------------------------------------------------------------- |
| 🚀 **Publicar el frontend**       | Desplegar en GitHub Pages o Vercel con backend en Cloud Run.            |
| 🎙️ **Divulgación educativa**     | Crear contenido tipo podcast usando narraciones generadas.              |
| 🌐 **Registrar dominio**          | Registrar `atmosinsight.org` como portal público.                       |
| 🧭 **Colaboración institucional** | Alinear funcionalidades con los programas de Datos Abiertos de la NASA. |
