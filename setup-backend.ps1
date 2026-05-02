# ClaritAI Deployment Helper
# Run this AFTER you've created Supabase project and have the DATABASE_URL

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ClaritAI Backend Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
$backendDir = Join-Path $PSScriptRoot "backend"

if (-Not (Test-Path (Join-Path $backendDir ".env"))) {
    Write-Host "[!] No .env file found in backend/" -ForegroundColor Yellow
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item (Join-Path $backendDir ".env.example") (Join-Path $backendDir ".env")
    Write-Host ""
    Write-Host "[ACTION REQUIRED] Edit backend/.env with your real values:" -ForegroundColor Red
    Write-Host "  1. DATABASE_URL    - From Supabase Settings > Database" -ForegroundColor White
    Write-Host "  2. DIRECT_URL      - From Supabase Settings > Database" -ForegroundColor White
    Write-Host "  3. JWT_SECRET      - Any random string (32+ chars)" -ForegroundColor White
    Write-Host "  4. RESEND_API_KEY  - From resend.com dashboard" -ForegroundColor White
    Write-Host ""
    Write-Host "After editing .env, run this script again." -ForegroundColor Yellow
    exit 0
}

Write-Host "[1/4] Installing backend dependencies..." -ForegroundColor Green
Set-Location $backendDir
npm install

Write-Host ""
Write-Host "[2/4] Generating Prisma client..." -ForegroundColor Green
npx prisma generate

Write-Host ""
Write-Host "[3/4] Pushing schema to database..." -ForegroundColor Green
npx prisma db push

Write-Host ""
Write-Host "[4/4] Building backend..." -ForegroundColor Green
npm run build

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Backend setup complete!" -ForegroundColor Green
Write-Host "  Run 'npm run dev' in backend/ to test locally" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
