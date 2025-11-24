# Script de configuración de despliegue para Windows PowerShell

Write-Host "🚀 Configuración de Despliegue - SVD Image Compressor" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Verificar si estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Este script debe ejecutarse desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

# 1. Verificar Node.js
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Descárgalo de: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# 2. Verificar Python
Write-Host "🔍 Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✅ Python instalado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python no está instalado. Descárgalo de: https://python.org/" -ForegroundColor Red
    exit 1
}

# 3. Instalar dependencias de Node
Write-Host ""
Write-Host "📦 Instalando dependencias de Node.js..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias de Node.js instaladas" -ForegroundColor Green
} else {
    Write-Host "❌ Error instalando dependencias de Node.js" -ForegroundColor Red
    exit 1
}

# 4. Crear archivo .env si no existe
if (-not (Test-Path ".env")) {
    Write-Host ""
    Write-Host "📝 Creando archivo .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Archivo .env creado" -ForegroundColor Green
}

# 5. Instalar dependencias de Python
Write-Host ""
Write-Host "📦 Instalando dependencias de Python..." -ForegroundColor Yellow
pip install -r backend/requirements.txt
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias de Python instaladas" -ForegroundColor Green
} else {
    Write-Host "❌ Error instalando dependencias de Python" -ForegroundColor Red
    exit 1
}

# 6. Verificar que se puede construir
Write-Host ""
Write-Host "🏗️ Probando build del proyecto..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build exitoso" -ForegroundColor Green
} else {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}

# 7. Instrucciones finales
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Green
Write-Host "✅ ¡Configuración completada!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configura GitHub Pages en tu repositorio:" -ForegroundColor White
Write-Host "   Settings > Pages > Source: GitHub Actions" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Despliega el backend en Replit:" -ForegroundColor White
Write-Host "   https://replit.com/~ > Create Repl > Import from GitHub" -ForegroundColor Gray
Write-Host "   Usa los secrets de Replit y el comando definido en .replit" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Actualiza .env.production con la URL de Replit:" -ForegroundColor White
Write-Host "   VITE_API_URL=https://tu-backend.usuario.repl.co" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Haz push a GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Configure deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Para más detalles, consulta DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Para ejecutar localmente:" -ForegroundColor Cyan
Write-Host "   Terminal 1: npm run dev" -ForegroundColor Gray
Write-Host "   Terminal 2: python backend/main.py" -ForegroundColor Gray
Write-Host ""
