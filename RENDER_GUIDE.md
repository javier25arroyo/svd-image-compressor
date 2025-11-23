# 🚀 Guía Paso a Paso: Despliegue del Backend en Render

Este proyecto ya está configurado para ser desplegado fácilmente en Render.com. Tienes dos opciones: la **automática** (recomendada, usa el archivo `render.yaml` que ya tienes) o la **manual**.

## 📋 Requisitos Previos
1. Tener una cuenta en [Render.com](https://dashboard.render.com/register).
2. Tener tu código subido a GitHub.

---

## 🔹 Opción 1: Despliegue Automático (Blueprints) - ¡Recomendada!

Como tu proyecto ya tiene un archivo `render.yaml`, esta es la forma más rápida.

1. Ve a tu [Dashboard de Render](https://dashboard.render.com/).
2. Haz clic en el botón **New +** (arriba a la derecha) y selecciona **Blueprint**.
3. En la lista de repositorios, busca y conecta `svd-image-compressor` (o como hayas llamado a tu repo).
4. Render detectará automáticamente la configuración del archivo `render.yaml`:
   - **Name**: `svd-backend`
   - **Runtime**: Python
   - **Plan**: Free
5. Haz clic en **Apply** o **Create Blueprint**.
6. Render comenzará a construir tu aplicación. Podrás ver los logs en tiempo real.

---

## 🔹 Opción 2: Configuración Manual (Web Service)

Si prefieres configurar cada detalle tú mismo:

1. Ve a tu [Dashboard de Render](https://dashboard.render.com/).
2. Haz clic en **New +** y selecciona **Web Service**.
3. Conecta tu repositorio `svd-image-compressor`.
4. Rellena el formulario con estos datos exactos:

| Campo | Valor |
|-------|-------|
| **Name** | `svd-backend` (o el que gustes) |
| **Region** | La más cercana a ti (ej. Oregon, Frankfurt) |
| **Branch** | `main` |
| **Root Directory** | *(Déjalo en blanco)* |
| **Runtime** | **Python 3** |
| **Build Command** | `pip install -r backend/requirements.txt` |
| **Start Command** | `uvicorn backend.main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | **Free** |

5. **Importante**: Baja a la sección **Environment Variables** y agrega:
   - **Key**: `PYTHON_VERSION`
   - **Value**: `3.11.0`
   *(Esto asegura compatibilidad con las librerías matemáticas)*.

6. Haz clic en **Create Web Service**.

---

## ⏳ ¿Qué esperar durante el despliegue?

1. **Build**: Render descargará Python, instalará `numpy`, `pillow`, `fastapi`, etc. Esto puede tardar 2-3 minutos la primera vez.
2. **Deploy**: Una vez instalado todo, ejecutará el comando de inicio.
3. **Live**: Verás un mensaje que dice "Your service is live" y un indicador verde.

---

## 🔗 Paso Final: Conectar con el Frontend

Una vez que el backend esté "Live":

1. Copia la URL que te da Render (ejemplo: `https://svd-backend-xyz.onrender.com`).
2. Ve a tu código local en VS Code.
3. Abre el archivo `.env.production`.
4. Pega la URL en la variable `VITE_API_URL`:
   ```env
   VITE_API_URL=https://svd-backend-xyz.onrender.com
   ```
   *(Asegúrate de no dejar una barra `/` al final)*.
5. Guarda el archivo.
6. Sube los cambios a GitHub:
   ```bash
   git add .env.production
   git commit -m "Vincular backend de Render"
   git push origin main
   ```

¡Listo! GitHub Actions reconstruirá tu frontend y ahora se conectará a tu nuevo backend en la nube. 🚀
