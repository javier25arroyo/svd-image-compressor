# ✅ Checklist de Despliegue

Usa este checklist para asegurarte de que todo esté configurado correctamente antes del despliegue.

## 📋 Pre-Despliegue

### Repositorio
- [ ] El código está en un repositorio de GitHub
- [ ] El repositorio es público o tienes GitHub Pages habilitado en privado
- [ ] Todos los archivos necesarios están commiteados
- [ ] El `.gitignore` está configurado correctamente

### Archivos de Configuración
- [ ] `.github/workflows/deploy.yml` existe
- [ ] `render.yaml` existe en la raíz
- [ ] `.env.example` existe
- [ ] `.env.production` existe (será actualizado después)
- [ ] `vite.config.ts` tiene el `base` correcto

### Dependencias
- [ ] `npm install` funciona sin errores
- [ ] `pip install -r backend/requirements.txt` funciona
- [ ] `npm run build` funciona localmente
- [ ] El proyecto corre localmente sin errores

---

## 🌐 Backend (Render.com)

### Crear Servicio
- [ ] Cuenta creada en [render.com](https://render.com)
- [ ] Repositorio conectado a Render
- [ ] Servicio web creado
- [ ] Build Command: `pip install -r backend/requirements.txt` ✅
- [ ] Start Command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT` ✅
- [ ] Plan: Free seleccionado
- [ ] Servicio desplegado exitosamente

### Verificar Backend
- [ ] URL del servicio obtenida: `https://_______.onrender.com`
- [ ] Endpoint `/health` responde correctamente
- [ ] No hay errores en los logs de Render
- [ ] CORS está configurado en `backend/main.py`

**URL del Backend**: `https://______________________.onrender.com`

---

## 📄 Frontend (GitHub Pages)

### Configurar GitHub Pages
- [ ] Settings > Pages abierto
- [ ] Source configurado a "GitHub Actions"
- [ ] Permisos de workflow están habilitados

### Actualizar Configuración
- [ ] `.env.production` actualizado con la URL del backend
- [ ] `vite.config.ts` tiene el nombre correcto del repositorio en `base`
  ```typescript
  base: '/___________/' // Nombre de tu repo
  ```
- [ ] Cambios commiteados y pusheados

### Verificar Despliegue
- [ ] GitHub Action se ejecutó sin errores
- [ ] Build completado exitosamente (revisar pestaña Actions)
- [ ] Sitio accesible en: `https://______.github.io/______/`
- [ ] No hay errores 404 en recursos
- [ ] Las imágenes y estilos se cargan correctamente

**URL del Frontend**: `https://___________.github.io/___________/`

---

## 🔗 Integración

### Conectividad
- [ ] El indicador de API muestra "EN LÍNEA" (verde)
- [ ] Se puede subir una imagen
- [ ] La compresión funciona correctamente
- [ ] Los tiempos de respuesta son aceptables (~5-10 segundos primera vez)
- [ ] La descarga de imágenes funciona

### CORS
- [ ] No hay errores de CORS en la consola del navegador
- [ ] Las peticiones al backend se completan exitosamente
- [ ] Los headers personalizados (`X-Original-Size`, etc.) se reciben

### Performance
- [ ] El backend se despierta en <60 segundos después de estar dormido
- [ ] La UI responde correctamente mientras el backend despierta
- [ ] Las imágenes comprimidas se muestran correctamente

---

## 🧪 Testing en Producción

### Funcionalidad Básica
- [ ] Cargar imagen funciona
- [ ] Slider de valor k funciona
- [ ] Compresión funciona
- [ ] Comparación visual funciona
- [ ] Descarga de imagen comprimida funciona
- [ ] Descarga de imagen original funciona
- [ ] Panel de fórmulas matemáticas funciona

### Dispositivos
- [ ] Probado en desktop
- [ ] Probado en tablet
- [ ] Probado en móvil
- [ ] Responsive design funciona correctamente

### Navegadores
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (si aplica)

---

## 🐛 Troubleshooting

### Si el backend no responde:
1. [ ] Verificar logs en Render Dashboard
2. [ ] Verificar que el servicio esté "Running" (no paused)
3. [ ] Verificar que la URL esté correcta en `.env.production`
4. [ ] Esperar 60 segundos (puede estar despertándose)

### Si el frontend no se despliega:
1. [ ] Verificar logs en GitHub Actions
2. [ ] Verificar que `npm run build` funcione localmente
3. [ ] Verificar que el `base` en `vite.config.ts` sea correcto
4. [ ] Verificar permisos en Settings > Actions

### Si CORS falla:
1. [ ] Verificar configuración en `backend/main.py`
2. [ ] Verificar que `allow_origins=["*"]` esté presente
3. [ ] Redeploy del backend si fue modificado

---

## 📝 Post-Despliegue

### Documentación
- [ ] README.md actualizado con URLs reales
- [ ] .env.production tiene la URL correcta
- [ ] Documentación adicional agregada si es necesario

### Monitoreo
- [ ] Configurar notificaciones de Render (opcional)
- [ ] Agregar analytics si es necesario (opcional)
- [ ] Documentar limitaciones del plan gratuito

### Compartir
- [ ] URL del proyecto agregada al README
- [ ] Capturas de pantalla actualizadas
- [ ] Demo en vivo compartida

---

## 🎉 ¡Completado!

**Frontend URL**: `https://____________.github.io/____________/`
**Backend URL**: `https://____________.onrender.com`
**Health Check**: `https://____________.onrender.com/health`

**Fecha de Despliegue**: ____/____/________

**Notas Adicionales**:
```
_____________________________________________________________

_____________________________________________________________

_____________________________________________________________
```

---

## 🔄 Actualizaciones Futuras

Para actualizar la aplicación:

1. Hacer cambios en tu código local
2. Probar localmente (`npm run dev` + `python backend/main.py`)
3. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Tu mensaje"
   git push origin main
   ```
4. El despliegue será automático para el frontend
5. El backend se actualizará automáticamente en Render

---

**Última actualización**: 2025-11-23
