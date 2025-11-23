# 🏗️ Arquitectura del Proyecto

## 📁 Estructura de Directorios

```
svd-image-compressor/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Action para despliegue automático
├── backend/
│   ├── __init__.py
│   ├── main.py                 # FastAPI server con endpoints SVD
│   └── requirements.txt        # Dependencias Python
├── components/
│   ├── ComparisonView.tsx      # Comparación lado a lado de imágenes
│   ├── Controls.tsx            # Slider y controles de compresión
│   ├── MathFormulas.tsx        # Panel con fórmulas LaTeX
│   └── UploadArea.tsx          # Área de carga de imágenes
├── services/
│   └── api.ts                  # Cliente API para comunicación con backend
├── scripts/
│   ├── setup-deployment.ps1    # Script de setup para Windows
│   └── setup-deployment.sh     # Script de setup para Linux/Mac
├── App.tsx                     # Componente principal de React
├── index.tsx                   # Punto de entrada de React
├── types.ts                    # Definiciones TypeScript
├── vite.config.ts              # Configuración de Vite
├── render.yaml                 # Configuración para Render.com
├── .env.example                # Template de variables de entorno
├── .env.production             # Variables para producción
├── DEPLOYMENT.md               # Guía de despliegue completa
└── README.md                   # Documentación principal
```

---

## 🔄 Flujo de Datos

### 1. Carga de Imagen
```
Usuario → UploadArea → App.tsx → Estado (file)
```

### 2. Compresión
```
App.tsx → api.compressImage(file, k) → Backend FastAPI
         ↓
    Backend procesa con NumPy SVD
         ↓
    Response con imagen comprimida + headers
         ↓
    App.tsx actualiza estado → ComparisonView muestra resultado
```

### 3. Visualización Matemática
```
Usuario click "Ver fórmulas" → MathFormulas (isExpanded: true)
                              ↓
                         Panel lateral con KaTeX renderizado
```

---

## 🔌 Comunicación Frontend-Backend

### Endpoints del Backend

#### `GET /health`
**Propósito**: Verificar que el backend está activo

**Response**:
```json
{
  "status": "ok"
}
```

#### `POST /compress`
**Propósito**: Comprimir imagen usando SVD

**Request** (multipart/form-data):
- `file`: Archivo de imagen (PNG, JPG, WEBP)
- `k`: Entero >= 1 (rango de SVD)

**Response**:
- Content-Type: `image/jpeg`
- Headers:
  - `X-Original-Size`: Tamaño original en bytes
  - `X-Compressed-Size`: Tamaño comprimido en bytes
  - `X-Original-Width`: Ancho de la imagen
  - `X-Original-Height`: Alto de la imagen
  - `X-Rank-Used`: Valor k usado (puede ser menor si excede dimensiones)

**Body**: Bytes de la imagen JPEG comprimida

---

## 🧮 Proceso de Compresión SVD

### Algoritmo Implementado

```python
def _svd_compress_channel(channel: np.ndarray, k: int) -> np.ndarray:
    # 1. Descomponer matriz en U, Σ, V^T
    u, s, vh = np.linalg.svd(channel, full_matrices=False)
    
    # 2. Tomar solo los primeros k valores singulares
    effective_rank = min(k, len(s))
    
    # 3. Reconstruir matriz aproximada
    reconstructed = (u[:, :effective_rank] * s[:effective_rank]) @ vh[:effective_rank, :]
    
    return reconstructed
```

### Procesamiento por Canal

Para imágenes RGB:
1. Se separan los 3 canales (R, G, B)
2. Se aplica SVD a cada canal independientemente
3. Se reconstruyen los canales comprimidos
4. Se combinan en una imagen RGB final

---

## 🎨 Componentes de UI

### Jerarquía de Componentes

```
App
├── Header (sticky)
│   ├── Logo + Título
│   └── Estado de API
├── Advertencias (condicionales)
│   ├── Backend offline
│   └── Errores
└── Main Grid
    ├── Columna Izquierda (controles)
    │   ├── UploadArea (si no hay imagen)
    │   ├── Controls (si hay imagen)
    │   │   ├── Slider de valor k
    │   │   ├── Indicador de compresión
    │   │   └── Botones de descarga
    │   ├── MathFormulas
    │   │   └── Side Panel (expandible)
    │   └── Card informativa
    └── Columna Derecha (visualización)
        ├── ComparisonView (si hay imagen)
        │   ├── Card Original
        │   └── Card Comprimida (con loader)
        └── Placeholder (si no hay imagen)
```

### Estado Global (App.tsx)

```typescript
{
  file: File | null,              // Imagen cargada
  originalPreview: string | null, // URL.createObjectURL
  compressedPreview: string | null,
  kValue: number,                 // Valor del slider
  maxK: number,                   // Límite del slider
  isProcessing: boolean,          // Loading state
  backendStatus: 'checking' | 'online' | 'offline',
  error: string | null,
  stats: {
    originalSize: number,
    compressedSize: number
  }
}
```

---

## 🚀 Despliegue

### Arquitectura en Producción

```
┌─────────────────┐
│   GitHub Repo   │
│                 │
└────────┬────────┘
         │
         ├─────────────────────────────┐
         │                             │
         ▼                             ▼
┌─────────────────┐         ┌──────────────────┐
│  GitHub Actions │         │   Render.com     │
│   (Build + Deploy) │         │   (Python API)   │
└────────┬────────┘         └────────┬─────────┘
         │                           │
         ▼                           │
┌─────────────────┐                 │
│  GitHub Pages   │◄────────────────┘
│  (Static Host)  │    API Calls (HTTPS)
└─────────────────┘
         │
         ▼
    👤 Usuario
```

### Variables de Entorno

**Desarrollo** (`.env`):
```env
VITE_API_URL=http://localhost:8000
```

**Producción** (`.env.production`):
```env
VITE_API_URL=https://tu-backend.onrender.com
```

---

## 🔧 Tecnologías y Versiones

### Frontend
- **React**: 19.2.0
- **TypeScript**: 5.8.2
- **Vite**: 6.4.1
- **Tailwind CSS**: 3.4.15
- **KaTeX**: 0.16.25
- **Lucide React**: 0.554.0

### Backend
- **Python**: 3.10+
- **FastAPI**: Latest
- **NumPy**: Latest
- **Pillow**: Latest
- **Uvicorn**: Latest

---

## 🎯 Patrones de Diseño

### Custom Hooks
```typescript
function useDebounce<T>(value: T, delay: number): T
```
Debounce para el slider, evita compresiones excesivas.

### Optimización de Memoria
```typescript
// Revocar URLs cuando cambia la imagen
if (compressedPreview) URL.revokeObjectURL(compressedPreview);
```

### Error Boundaries
El backend valida:
- Tipo de archivo (solo imágenes)
- Valor k >= 1
- Dimensiones válidas

---

## 📊 Flujo de CI/CD

### GitHub Actions Workflow

```yaml
1. Trigger: Push a main/master
2. Checkout código
3. Setup Node.js 20
4. Instalar dependencias (npm ci)
5. Build producción (npm run build)
6. Upload artifact a GitHub Pages
7. Deploy automático
```

### Tiempo de Despliegue
- **Build**: ~2-3 minutos
- **Deploy**: ~30 segundos
- **Total**: ~3-4 minutos desde push hasta live

---

## 🔐 Seguridad

### CORS
Backend configurado con:
```python
allow_origins=["*"]  # En producción, especificar dominio
```

### Validación
- Tamaño máximo de archivo (implícito por el navegador)
- Tipo de archivo validado en backend
- Rango k validado (>= 1)

### HTTPS
- GitHub Pages: HTTPS automático
- Render.com: HTTPS automático con certificado SSL

---

## 📈 Mejoras Futuras

### Performance
- [ ] Implementar Web Workers para procesamiento en background
- [ ] Lazy loading de KaTeX
- [ ] Compresión progresiva (mostrar preview mientras procesa)

### Funcionalidad
- [ ] Múltiples imágenes en batch
- [ ] Comparación A/B con slider
- [ ] Exportar GIF animado mostrando diferentes valores de k
- [ ] Historial de compresiones

### Backend
- [ ] Caché de resultados comunes
- [ ] Rate limiting
- [ ] Soporte para otros algoritmos (PCA, Wavelets)

---

**Fecha de última actualización**: 2025-11-23
