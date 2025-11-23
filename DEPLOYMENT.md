# 🚀 Guía de Despliegue

Esta aplicación está configurada para desplegarse automáticamente:
- **Frontend**: GitHub Pages
- **Backend**: Render.com (o cualquier servicio Python)

## 📋 Requisitos Previos

- Cuenta de GitHub
- Cuenta de [Render.com](https://render.com) (gratuita)
- Repositorio en GitHub

---

## 🎨 Paso 1: Desplegar el Frontend en GitHub Pages

### 1.1 Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona:
   - Source: **GitHub Actions**

### 1.2 Actualizar la Configuración Base

En `vite.config.ts`, asegúrate de que la línea `base` tenga el nombre correcto de tu repositorio:

```typescript
base: process.env.NODE_ENV === 'production' ? '/TU-REPO-NOMBRE/' : '/',
```

Por ejemplo, si tu repo se llama `svd-compressor`:
```typescript
base: process.env.NODE_ENV === 'production' ? '/svd-compressor/' : '/',
```

### 1.3 Hacer Push y Desplegar

```bash
git add .
git commit -m "Configure deployment"
git push origin main
```

El GitHub Action se ejecutará automáticamente y tu frontend estará disponible en:
```
https://TU-USUARIO.github.io/TU-REPO-NOMBRE/
```

---

## 🐍 Paso 2: Desplegar el Backend en Render

### 2.1 Crear Servicio en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **New +** > **Web Service**
3. Conecta tu repositorio de GitHub
4. Configura el servicio:

**Configuración:**
- **Name**: `svd-backend` (o el nombre que prefieras)
- **Environment**: `Python 3`
- **Build Command**: `pip install -r backend/requirements.txt`
- **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
- **Plan**: Free

5. Click en **Create Web Service**

### 2.2 Obtener la URL del Backend

Una vez desplegado, Render te dará una URL como:
```
https://svd-backend-xxxx.onrender.com
```

---

## 🔗 Paso 3: Conectar Frontend con Backend

### 3.1 Actualizar Variables de Entorno

Edita el archivo `.env.production`:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

### 3.2 Reemplazar por tu URL Real

Por ejemplo:
```env
VITE_API_URL=https://svd-backend-abc123.onrender.com
```

### 3.3 Hacer Push de los Cambios

```bash
git add .env.production
git commit -m "Update production API URL"
git push origin main
```

El GitHub Action se ejecutará de nuevo y tu frontend ahora se conectará al backend en producción.

---

## ✅ Verificación

1. Visita tu sitio en GitHub Pages
2. Verifica que el indicador de API muestre "EN LÍNEA" (círculo verde)
3. Sube una imagen y prueba la compresión

---

## 🔧 Solución de Problemas

### El indicador de API muestra "FUERA DE LÍNEA"

**Posibles causas:**

1. **El backend está dormido** (Render free tier duerme después de 15 min de inactividad)
   - Solución: Espera 30-60 segundos, la primera petición lo despertará

2. **CORS no configurado correctamente**
   - Verifica que `backend/main.py` tenga:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

3. **URL incorrecta en `.env.production`**
   - Verifica que la URL no tenga `/` al final
   - Debe ser: `https://tu-backend.onrender.com` ✅
   - NO debe ser: `https://tu-backend.onrender.com/` ❌

### El build en GitHub Actions falla

1. Revisa los logs en **Actions** tab de tu repositorio
2. Verifica que todas las dependencias estén en `package.json`
3. Asegúrate de que `npm run build` funcione localmente

### El backend en Render falla

1. Revisa los logs en Render Dashboard
2. Verifica que `backend/requirements.txt` tenga todas las dependencias
3. Verifica que el `Start Command` sea correcto

---

## 🆓 Alternativas Gratuitas al Backend

Si Render no funciona, puedes usar:

### Railway.app
```bash
# Instala Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Vercel (con Serverless Functions)
Requiere adaptar el código a funciones serverless.

### Fly.io
```bash
# Instala Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
```

---

## 🌐 URLs de Ejemplo

Una vez desplegado, tendrás:

- **Frontend**: `https://tu-usuario.github.io/svd-image-compressor/`
- **Backend**: `https://svd-backend-xxxx.onrender.com`
- **API Health**: `https://svd-backend-xxxx.onrender.com/health`

---

## 📝 Notas Importantes

1. **Plan Free de Render**: El backend se dormirá después de 15 minutos de inactividad
2. **GitHub Pages**: Solo puede servir contenido estático (HTML, CSS, JS)
3. **Build automático**: Cada push a `main` desplegará automáticamente
4. **HTTPS**: Tanto GitHub Pages como Render proporcionan HTTPS gratis

---

## 🎉 ¡Listo!

Tu aplicación SVD Image Compressor ahora está completamente desplegada y accesible desde cualquier lugar del mundo. 🚀
