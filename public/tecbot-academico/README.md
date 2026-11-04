# TecBot Académico

Asistente de información académica que responde preguntas sobre servicio social, residencias profesionales, titulación y acreditación académica usando documentos de demostración.

> **Aviso:** los documentos en `documentos-demo/` son ficticios y se incluyen únicamente con fines didácticos. No representan normativa oficial.

## Requisitos

- Python 3.11+
- Node.js 20+
- PowerShell (Windows)

## Instalación

### Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

Edita `.env` con tu proveedor de IA.

### Frontend

```powershell
cd frontend
npm install
```

## Ejecución

Terminal 1 (backend):

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

Terminal 2 (frontend):

```powershell
cd frontend
npm run dev
```

Abre `http://localhost:5173`.

## Pruebas

```powershell
cd backend
pytest -q
```

## Estructura

```text
backend/   # FastAPI
frontend/  # React + TypeScript
documentos-demo/  # corpus ficticio
documentacion/    # requerimientos, arquitectura, pruebas
prompts/          # prompts de subagentes
agentes/          # configuración OpenCode
```

## Alcance

No incluye autenticación, trámites oficiales ni datos personales. Es un prototipo didáctico.

## Licencia

Material didáctico del curso. Revisa permisos antes de reutilizar.
