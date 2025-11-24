# 🗜️ Compresor de Imágenes SVD

Aplicación web interactiva para comprimir imágenes utilizando **Descomposición en Valores Singulares (SVD)**, con visualización de fórmulas matemáticas en tiempo real.

## ✨ Características Principales

- 📊 **Visualización de Fórmulas Matemáticas**: Fórmulas LaTeX renderizadas con KaTeX para entender el proceso matemático
- 🎨 **Interfaz Mejorada en Español**: UX/UI optimizada con diseño moderno y responsive
- ⚡ **Compresión en Tiempo Real**: Visualiza los cambios instantáneamente al ajustar el valor k
- 📈 **Comparación Visual**: Lado a lado de imagen original vs comprimida
- 📉 **Métricas de Compresión**: Visualización del porcentaje de reducción de tamaño

## 🚀 Ejecutar Localmente

**Requisitos Previos:**

- Node.js 18+
- Python 3.10+

### Frontend

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Copiar el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

3. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`

### Backend API

1. (Opcional) Crear y activar un entorno virtual de Python:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # En Windows
   source .venv/bin/activate  # En Linux/Mac
   ```

2. Instalar dependencias del backend:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Iniciar el servidor FastAPI:
   ```bash
   python backend/main.py
   ```

El API estará disponible en `http://localhost:8000`

---

## 🌐 Desplegar en Producción

Esta aplicación puede desplegarse fácilmente de forma **GRATUITA**:

- **Frontend**: GitHub Pages (automático con GitHub Actions)
- **Backend**: Replit Deployments (plan gratuito)


### Despliegue Rápido

1. **Push a GitHub**: Los cambios en `main` desplegarán automáticamente el frontend
2. **Configura un Repl para el backend**:
   - En [replit.com](https://replit.com/~) selecciona *Create Repl* → *Import from GitHub* y apunta a este repositorio
   - Mantén el repositorio sincronizado para recibir los últimos cambios del backend
3. **Define los Secrets en Replit** (por ejemplo `ALLOWED_ORIGINS` si lo necesitas) y asegura que el archivo `.replit` use el comando `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
4. **Actualiza `.env.production`**: Usa la URL HTTPS que Replit genera (`https://tu-backend.<usuario>.repl.co`)
5. **¡Listo!** Tu app estará disponible en: `https://TU-USUARIO.github.io/TU-REPO/`

#### Configuración recomendada en Replit

- Activa el archivo `.replit` incluido para instalar dependencias y ejecutar `uvicorn`
- Usa Deployments o el botón **Run** para mantener activo el backend (en planes gratuitos se suspende tras inactividad)
- Gestiona variables sensibles desde la sección **Secrets** de Replit
- Verifica que el puerto sea provisto por la variable `PORT` (Replit lo define automáticamente)

### Endpoints Disponibles

- `GET /health` - Verificación de estado del servidor
- `POST /compress` - Comprime una imagen usando SVD
  - Acepta `multipart/form-data` con campos:
    - `file`: Archivo de imagen
    - `k`: Valor entero del rango (número de valores singulares a mantener)
  - Retorna: Imagen comprimida en formato JPEG con headers de metadata

## 🧮 Fundamento Matemático

La aplicación utiliza **SVD (Singular Value Decomposition)** para comprimir imágenes:

### 1. Descomposición
```
A = U Σ V^T
```

### 2. Aproximación de Rango k
```
A_k = Σ(i=1 to k) σ_i u_i v_i^T
```

### 3. Factor de Compresión
```
Factor = mn / k(m + n + 1)
```

Donde:
- **m × n**: Dimensiones de la imagen
- **k**: Número de valores singulares preservados
- **σ_i**: Valores singulares ordenados de mayor a menor

## 📚 Tecnologías Utilizadas

### Frontend
- **React 19** con TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **KaTeX** - Renderizado de fórmulas matemáticas
- **Lucide React** - Iconos

### Backend
- **FastAPI** - Framework web Python
- **NumPy** - Cálculos matriciales y SVD
- **Pillow (PIL)** - Procesamiento de imágenes
- **Uvicorn** - Servidor ASGI

## 🎯 Mejoras Implementadas

### Interfaz de Usuario
- ✅ Traducción completa al español
- ✅ Diseño más intuitivo con emojis y colores mejorados
- ✅ Slider con gradientes y animaciones suaves
- ✅ Tarjetas con sombras y efectos hover
- ✅ Indicadores visuales de tamaño de archivo mejorados

### Educación Matemática
- ✅ Panel expandible con fórmulas matemáticas
- ✅ 4 secciones explicativas con LaTeX:
  1. Descomposición SVD
  2. Aproximación de Rango k
  3. Error de Aproximación (Teorema de Eckart-Young)
  4. Aplicación a Compresión de Imágenes
- ✅ Notas informativas sobre el proceso

### Experiencia de Usuario
- ✅ Mensajes de estado claros en español
- ✅ Animaciones fluidas para feedback visual
- ✅ Botones con efectos de escala al hover
- ✅ Mejor contraste y legibilidad

## 📝 Flujo de Trabajo Recomendado

### Desarrollo Local
1. Ejecuta `npm run dev` en una terminal para el frontend
2. Ejecuta `python backend/main.py` en otra terminal para el backend
3. Abre `http://localhost:3000` en tu navegador
4. Sube una imagen y ajusta el valor k para ver la compresión en tiempo real

### Configuración Rápida
Usa el script automatizado para configurar todo:

**Windows:**
```powershell
.\scripts\setup-deployment.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/setup-deployment.sh
./scripts/setup-deployment.sh
```

## 📚 Documentación Adicional

- 📖 **[QUICK_START.md](QUICK_START.md)** - Guía rápida para empezar en 5 minutos
- 🚀 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía completa de despliegue en producción
- 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** - Documentación técnica de la arquitectura
- 🔧 **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solución de problemas de despliegue

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de:
- Mantener el código limpio y documentado
- Seguir las convenciones de estilo existentes
- Probar los cambios antes de enviar un PR

## 🎯 Características del Despliegue

- ✅ **GitHub Actions**: Despliegue automático del frontend
- ✅ **GitHub Pages**: Hosting gratuito del frontend
- ✅ **Replit**: Backend Python gratuito
- ✅ **HTTPS**: Certificados SSL automáticos
- ✅ **CORS**: Configurado para producción
- ✅ **Variables de entorno**: Configuración por ambiente

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

<div align="center">

**¿Tienes preguntas?** Abre un issue en el repositorio.

**¿Quieres contribuir?** ¡Los PRs son bienvenidos!

Made with ❤️ using SVD & Linear Algebra

</div>
