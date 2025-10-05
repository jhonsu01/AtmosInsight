# Non-Functional Requirements – AtmosInsight

## 1. Objective
Define the quality attributes, technical constraints, and operational expectations for the AtmosInsight prototype, ensuring reliability, scalability, and accessibility across environments.

## 2. System Overview
AtmosInsight is a web-based application designed to visualize open satellite data from NASA GIBS through interactive maps and audio narrations. The prototype includes a static frontend (React + Leaflet) and an optional backend for Text-to-Speech (TTS) services.

## 3. Non-Functional Requirements

| ID | Category | Requirement | Description |
|----|-----------|-------------|-------------|
| NFR-01 | Performance | Response Time | The base map and interface should load in under 3 seconds on 3G-fast networks. |
| NFR-02 | Scalability | Modular Deployment | The prototype must support both standalone and API-connected operation modes. |
| NFR-03 | Availability | Service Uptime | The frontend should maintain at least 99% availability under demo conditions. |
| NFR-04 | Security | Data Privacy | The system must avoid storing user data or API credentials in the frontend. |
| NFR-05 | Accessibility | WCAG Compliance | Follow WCAG 2.1 AA guidelines: visible focus, contrast ratio, ARIA roles. |
| NFR-06 | Usability | User Experience | Maintain an intuitive layout, readable texts, and logical interaction flow. |
| NFR-07 | Maintainability | Code Structure | Use clean modular code with clear separation between UI and data logic. |
| NFR-08 | Resilience | Fault Tolerance | The app must recover gracefully from API or network errors. |
| NFR-09 | Portability | Cross-Platform | The interface must run on Chrome, Edge, and Firefox (latest 2 versions). |
| NFR-10 | Deployment | Simplicity | Should operate as a static frontend with optional Node/Next backend for TTS. |

## 4. Constraints
- Only public NASA GIBS endpoints are allowed for imagery access.  
- Backend (if used) must be stateless and isolated from user credentials.  
- The system must run without requiring cloud authentication tokens in the client.

## 5. Quality Assurance
- Manual testing for usability and responsiveness on mobile and desktop.  
- Automated tests (mocked) for URL generation, date handling, and fallback logic.  
- Accessibility validation using browser dev tools (Lighthouse, axe-core).  

## 6. Acceptance Criteria
- Prototype runs in demo mode without private keys or login.  
- Map tiles display accurately and respond within acceptable latency.  
- Narration generation works either via mock SpeechSynthesis or Google Cloud TTS.  
- Source code passes linting and build checks in a clean CI environment.
