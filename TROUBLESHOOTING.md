# 🔧 Guía de Solución de Problemas

Esta guía te ayudará a resolver problemas comunes al desplegar el backend de SVD Image Compressor.

## 🚨 Problema: Backend aparece como "Desconectado" en Replit

### Síntomas
- El frontend muestra un error de conexión
- La aplicación no puede comprimir imágenes
- El health check falla

### Solución

#### 1. Verificar que el Backend está Corriendo

En Replit, ve a la pestaña "Shell" y ejecuta:

```bash
curl http://localhost:$PORT/health
```

Deberías ver una respuesta como:
```json
{
  "status": "ok",
  "service": "svd-image-compressor-backend",
  "version": "1.0.0"
}
```

#### 2. Verificar la Variable de Entorno PORT

Replit automáticamente asigna un puerto a través de la variable `$PORT`. Verifica que tu deployment esté configurado correctamente:

```bash
echo $PORT
```

Si no muestra un número, puede que necesites reiniciar el deployment.

#### 3. Revisar los Logs del Servidor

En la consola de Replit, busca estas líneas al iniciar:

```
Starting server on host=0.0.0.0 port=XXXX
INFO:     Started server process [XXXX]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:XXXX
```

Si no ves estos mensajes, el servidor no se está iniciando correctamente.

#### 4. Verificar el Archivo .replit

Asegúrate de que tu archivo `.replit` tenga la configuración correcta de deployment:

```toml
[deployment]
deploymentTarget = "autoscale"
run = ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port $PORT --log-level info"]
```

**IMPORTANTE**: El comando debe usar `$PORT` (no un puerto fijo como 5000).

#### 5. Verificar las Dependencias

Ejecuta en el shell de Replit:

```bash
pip list | grep -E "(fastapi|uvicorn|numpy|pillow)"
```

Deberías ver:
- `fastapi` (cualquier versión reciente)
- `uvicorn` (con [standard] extras instalados)
- `numpy` 
- `pillow`

Si falta alguna, instala las dependencias:

```bash
pip install -r backend/requirements.txt
```

#### 6. Verificar CORS

Si el backend está corriendo pero el frontend no puede conectarse, puede ser un problema de CORS. El backend está configurado para permitir todas las origins por defecto, pero puedes configurar origins específicas con la variable de entorno:

```bash
ALLOWED_ORIGINS=https://tu-usuario.github.io,https://tu-frontend.com
```

#### 7. Forzar Redeploy

A veces Replit necesita un redeploy completo:

1. En Replit, ve a "Deployments"
2. Haz click en los tres puntos (...) de tu deployment activo
3. Selecciona "Redeploy"

## 🐛 Problemas Comunes Adicionales

### Error: "Address already in use"

**Causa**: Otro proceso está usando el puerto.

**Solución**:
```bash
# Encontrar el proceso
lsof -i :$PORT

# Matar el proceso (reemplaza PID con el número del proceso)
kill -9 PID
```

### Error: "ModuleNotFoundError: No module named 'backend'"

**Causa**: El servidor no se está ejecutando desde la raíz del proyecto.

**Solución**: Asegúrate de ejecutar uvicorn desde el directorio raíz del proyecto:
```bash
cd /ruta/al/proyecto
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

### El Health Check Falla pero el Servidor Está Corriendo

**Causa**: Firewall o configuración de red de Replit.

**Solución**:
1. Verifica que estés usando `--host 0.0.0.0` (no `localhost` o `127.0.0.1`)
2. Asegúrate de que el endpoint `/health` esté definido correctamente
3. Prueba acceder al endpoint directamente desde el navegador usando la URL de Replit

### El Frontend No Puede Conectarse al Backend

**Causa**: Variable de entorno `VITE_API_URL` incorrecta.

**Solución**:
1. Para desarrollo local, usa `.env`:
   ```
   VITE_API_URL=http://localhost:8000
   ```

2. Para producción, actualiza `.env.production` con tu URL de Replit:
   ```
   VITE_API_URL=https://tu-backend.usuario.repl.co
   ```

## 📚 Comandos Útiles para Debugging

### Ver los Logs Completos
```bash
# En Replit, los logs se muestran en la consola
# Pero puedes redirigirlos a un archivo:
uvicorn backend.main:app --host 0.0.0.0 --port $PORT --log-level debug 2>&1 | tee server.log
```

### Probar el Endpoint de Compresión
```bash
# Crear una imagen de prueba simple
curl -X POST http://localhost:$PORT/compress \
  -F "file=@tu-imagen.jpg" \
  -F "k=10" \
  --output compressed.jpg
```

### Verificar la Conectividad de Red
```bash
# Desde otro terminal o máquina
curl -v https://tu-backend.usuario.repl.co/health
```

## 🆘 ¿Aún Tienes Problemas?

Si después de seguir esta guía aún tienes problemas:

1. **Verifica los logs**: Los mensajes de error suelen indicar el problema exacto
2. **Revisa la documentación**: Consulta [README.md](README.md) y [DEPLOYMENT.md](DEPLOYMENT.md)
3. **Abre un Issue**: Crea un issue en GitHub con:
   - Descripción del problema
   - Logs del servidor
   - Pasos para reproducir el error
   - Configuración de tu entorno (Replit, local, etc.)

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Las dependencias están instaladas correctamente
- [ ] El archivo `.replit` tiene la configuración correcta
- [ ] La variable `PORT` está definida correctamente
- [ ] El servidor inicia sin errores
- [ ] El endpoint `/health` responde correctamente
- [ ] CORS está configurado apropiadamente
- [ ] La URL del backend en el frontend es correcta
- [ ] No hay conflictos de puerto
- [ ] Los logs no muestran errores críticos

---

**Última actualización**: 2025-11-24

Si esta guía te ayudó a resolver tu problema, considera dejar una ⭐ en el repositorio.
