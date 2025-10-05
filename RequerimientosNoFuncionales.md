# Requerimientos No Funcionales – AtmosInsight

## 1. Objetivo
Definir los atributos de calidad, restricciones técnicas y expectativas operativas del prototipo AtmosInsight, garantizando su confiabilidad, escalabilidad y accesibilidad en diferentes entornos.

## 2. Descripción General del Sistema
AtmosInsight es una aplicación web diseñada para visualizar datos satelitales abiertos de NASA GIBS mediante mapas interactivos y narraciones de audio. El prototipo incluye un frontend estático (React + Leaflet) y un backend opcional para los servicios de Text-to-Speech (TTS).

## 3. Requerimientos No Funcionales

| ID | Categoría | Requerimiento | Descripción |
|------|------------|----------------|-------------|
| RNF-01 | Rendimiento | Tiempo de Respuesta | El mapa base y la interfaz deben cargar en menos de 3 segundos en redes 3G rápidas. |
| RNF-02 | Escalabilidad | Despliegue Modular | El prototipo debe soportar modos de operación autónomo y conectado a una API. |
| RNF-03 | Disponibilidad | Tiempo de Servicio | El frontend debe mantener al menos 99% de disponibilidad durante las demostraciones. |
| RNF-04 | Seguridad | Privacidad de Datos | El sistema no debe almacenar datos de usuarios ni credenciales en el frontend. |
| RNF-05 | Accesibilidad | Cumplimiento WCAG | Cumplir con WCAG 2.1 AA: foco visible, contraste adecuado, roles ARIA. |
| RNF-06 | Usabilidad | Experiencia de Usuario | Mantener un diseño intuitivo, textos legibles y flujo de interacción lógico. |
| RNF-07 | Mantenibilidad | Estructura de Código | Utilizar código modular con separación clara entre la interfaz y la lógica de datos. |
| RNF-08 | Resiliencia | Tolerancia a Fallos | La aplicación debe recuperarse de forma segura ante errores de red o API. |
| RNF-09 | Portabilidad | Multiplataforma | La interfaz debe funcionar en Chrome, Edge y Firefox (últimas 2 versiones). |
| RNF-10 | Despliegue | Simplicidad | Debe operar como frontend estático con backend opcional en Node/Next para TTS. |

## 4. Restricciones
- Solo se permiten endpoints públicos de NASA GIBS para el acceso a imágenes.  
- El backend (si se usa) debe ser sin estado y sin acceso a credenciales de usuario.  
- El sistema debe ejecutarse sin requerir tokens de autenticación en el cliente.

## 5. Aseguramiento de la Calidad
- Pruebas manuales de usabilidad y respuesta en móvil y escritorio.  
- Pruebas automatizadas (mock) para generación de URLs, manejo de fechas y lógica de fallbacks.  
- Validación de accesibilidad mediante herramientas del navegador (Lighthouse, axe-core).  

## 6. Criterios de Aceptación
- El prototipo se ejecuta en modo demo sin llaves privadas ni autenticación.  
- Los mosaicos del mapa se muestran correctamente y responden dentro de la latencia esperada.  
- La narración funciona mediante SpeechSynthesis o Google Cloud TTS.  
- El código fuente pasa validaciones de linting y compilación en CI limpio.
