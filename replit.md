# SVD Image Compressor

## Overview
Interactive web application for compressing images using Singular Value Decomposition (SVD) with real-time mathematical formula visualization. The project demonstrates linear algebra concepts applied to image compression.

## Project Architecture

### Frontend (React + Vite + TypeScript)
- **Port**: 5000 (development)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6.4.1
- **Styling**: Tailwind CSS
- **Math Rendering**: KaTeX for LaTeX formulas
- **Icons**: Lucide React

### Backend (FastAPI + Python)
- **Port**: 8000 (development)
- **Framework**: FastAPI
- **Server**: Uvicorn ASGI server
- **Image Processing**: NumPy (SVD calculations) + Pillow (image handling)
- **API**: RESTful endpoints with CORS enabled

### Key Features
- Real-time SVD image compression
- Interactive slider to adjust compression ratio (k value)
- Side-by-side comparison view
- Mathematical formula visualization with LaTeX
- Compression metrics display
- Responsive Spanish-language UI

## Recent Changes (Nov 24, 2025)
- ✅ Configured for Replit environment
- ✅ Updated Vite to use port 5000 with allowed hosts for Replit proxy
- ✅ Backend configured to use localhost:8000
- ✅ Installed Python 3.11 and all dependencies
- ✅ Set VITE_API_URL environment variable to Replit domain
- ✅ Updated .gitignore for Python and Node.js
- ✅ Configured deployment for Autoscale (FastAPI backend)

## Environment Variables
- `VITE_API_URL`: Backend API URL (set to Replit dev domain with port 8000)

## Project Structure
```
.
├── frontend/          # React frontend (clean architecture)
│   ├── app/          # Application entry point
│   ├── ui/           # UI components
│   ├── domain/       # Domain models
│   ├── application/  # Services
│   ├── infrastructure/ # HTTP clients
│   └── shared/       # Config and hooks
├── backend/          # FastAPI backend (clean architecture)
│   ├── domain/       # Domain models and SVD logic
│   ├── application/  # Compression service
│   └── interfaces/   # HTTP routes
└── components/       # Legacy component folder
```

## Deployment
- **Type**: Autoscale deployment (FastAPI backend)
- **Run Command**: `uvicorn backend.main:app --host 0.0.0.0 --port 5000`
- **Ideal for**: High-performance API with automatic scaling

## Technical Implementation
The application uses SVD (Singular Value Decomposition) to compress images:
1. Decompose image matrix: A = U Σ V^T
2. Keep only k largest singular values
3. Reconstruct approximation: A_k = Σ(i=1 to k) σ_i u_i v_i^T
4. Compression factor: mn / k(m + n + 1)
