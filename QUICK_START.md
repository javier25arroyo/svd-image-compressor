# ⚡ Guía Rápida de Inicio

## 🚀 En 5 Minutos

### 1. Clonar y Configurar (2 min)

```bash
# Clonar el repositorio
git clone https://github.com/TU-USUARIO/svd-image-compressor.git
cd svd-image-compressor

# Copiar variables de entorno
cp .env.example .env

# Instalar dependencias
npm install
pip install -r backend/requirements.txt
```

### 2. Ejecutar Localmente (1 min)

**Terminal 1** - Frontend:
```bash
npm run dev
```

**Terminal 2** - Backend:
```bash
python backend/main.py
```

### 3. Probar (2 min)

1. Abre http://localhost:3000
2. Sube una imagen
3. Mueve el slider de valor k
4. ¡Observa la compresión en tiempo real! 🎉

---

## 🌐 Despliegue en Internet (15 minutos)

### Opción A: Script Automático ⚡

**Windows:**
```powershell
.\scripts\setup-deployment.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/setup-deployment.sh
./scripts/setup-deployment.sh
```

Luego sigue las instrucciones en pantalla.

---

### Opción B: Manual 🔧

#### 1. Backend en Render (5 min)

1. Ve a https://render.com
2. Crea cuenta gratuita
3. **New** > **Web Service**
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
6. Click **Create Web Service**
7. Copia la URL: `https://tu-app.onrender.com`

#### 2. Frontend en GitHub Pages (5 min)

1. Ve a tu repositorio en GitHub
2. **Settings** > **Pages**
3. Source: **GitHub Actions**
4. Edita `.env.production`:
   ```env
   VITE_API_URL=https://tu-app.onrender.com
   ```
5. Edita `vite.config.ts` línea 9:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/TU-REPO-NOMBRE/' : '/',
   ```
6. Push los cambios:
   ```bash
   git add .
   git commit -m "Configure deployment"
   git push origin main
   ```

#### 3. Verificar (5 min)

Espera ~3-4 minutos y accede a:
```
https://TU-USUARIO.github.io/TU-REPO-NOMBRE/
```

---

## 🆘 Solución Rápida de Problemas

### ❌ "API: FUERA DE LÍNEA"

**Causa 1**: Backend dormido (Render free tier)
- ✅ **Solución**: Espera 30 segundos, se despertará solo

**Causa 2**: URL incorrecta en `.env.production`
- ✅ **Solución**: Verifica que no tenga `/` al final

**Causa 3**: CORS bloqueado
- ✅ **Solución**: Verifica que `backend/main.py` tenga configurado CORS

### ❌ Build falla en GitHub Actions

- ✅ Verifica que `npm run build` funcione localmente
- ✅ Revisa los logs en la pestaña **Actions** de GitHub

### ❌ Página 404 en GitHub Pages

- ✅ Verifica que el `base` en `vite.config.ts` sea correcto
- ✅ Espera 2-3 minutos más (puede tardar en propagar)

---

## 📖 Documentación Completa

- **Guía de Despliegue Detallada**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Arquitectura del Proyecto**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **README Principal**: [README.md](README.md)

---

## 💡 Tips Útiles

### Desarrollo Local

**Ver logs del backend**:
```bash
python backend/main.py  # Muestra logs en consola
```

**Ver errores del frontend**:
- Abre DevTools (F12) > Console

### Producción

**Ver logs del backend en Render**:
1. Dashboard de Render > Tu servicio > **Logs**

**Ver build logs en GitHub**:
1. Repositorio > **Actions** > Click en el workflow

**Actualizar solo el frontend**:
```bash
npm run build
git add dist
git commit -m "Update frontend"
git push
```

---

## 🎓 Recursos de Aprendizaje

### SVD (Singular Value Decomposition)
- [Wikipedia - SVD](https://es.wikipedia.org/wiki/Descomposición_en_valores_singulares)
- [3Blue1Brown - Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)

### React + TypeScript
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### FastAPI
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [NumPy User Guide](https://numpy.org/doc/stable/user/)

---

## 🤝 Obtener Ayuda

1. **Revisa DEPLOYMENT.md** para problemas de despliegue
2. **Revisa ARCHITECTURE.md** para entender el código
3. **Abre un Issue** en GitHub si encuentras un bug
4. **Contribuye** con un Pull Request

---

¡Disfruta comprimiendo imágenes con SVD! 🎉
