# ============================================================
# create_github_repo.ps1
# Crée le dépôt GitHub via l'API REST et configure le remote
# ============================================================

param(
    [string]$RepoName = "perou-amitie-solidarite",
    [string]$Description = "Migration statique benevole du site Perou Amitie Solidarite - scraping BeautifulSoup vers architecture Markdown",
    [bool]$IsPrivate = $false
)

# ── Récupérer le token GitHub depuis gh ou depuis une variable d'env ──
$token = $env:GITHUB_TOKEN
if (-not $token) {
    # Essayer de lire depuis le keyring gh si disponible
    try {
        $token = (gh auth token 2>$null)
    } catch {}
}

if (-not $token) {
    Write-Host ""
    Write-Host "⚠️  Aucun token GitHub trouvé." -ForegroundColor Yellow
    Write-Host "   Deux options :" -ForegroundColor Yellow
    Write-Host "   1. Définir la variable d'environnement GITHUB_TOKEN" -ForegroundColor Cyan
    Write-Host "   2. Se connecter avec : gh auth login" -ForegroundColor Cyan
    Write-Host ""
    $token = Read-Host "Entrez votre GitHub Personal Access Token"
}

# ── Récupérer le nom d'utilisateur GitHub ──
Write-Host "`n🔍 Récupération du profil GitHub..." -ForegroundColor Cyan
$headers = @{
    "Authorization" = "token $token"
    "Accept"        = "application/vnd.github+json"
    "User-Agent"    = "perou-migration-script"
}

try {
    $user = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method GET
    $username = $user.login
    Write-Host "   Connecté en tant que : $username" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur d'authentification : $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# ── Créer le dépôt ──
Write-Host "`n📁 Création du dépôt '$RepoName'..." -ForegroundColor Cyan

$body = @{
    name        = $RepoName
    description = $Description
    private     = $IsPrivate
    auto_init   = $false
} | ConvertTo-Json

try {
    $repo = Invoke-RestMethod -Uri "https://api.github.com/user/repos" `
        -Headers $headers -Method POST `
        -Body $body -ContentType "application/json"
    
    $repoUrl = $repo.html_url
    $cloneUrl = $repo.clone_url
    Write-Host "   ✅ Dépôt créé : $repoUrl" -ForegroundColor Green
} catch {
    $errBody = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($errBody.errors[0].message -like "*already exists*") {
        Write-Host "   ℹ️  Le dépôt existe déjà — récupération de l'URL..." -ForegroundColor Yellow
        $existingRepo = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName" -Headers $headers
        $repoUrl  = $existingRepo.html_url
        $cloneUrl = $existingRepo.clone_url
    } else {
        Write-Host "❌ Erreur création dépôt : $($_.Exception.Message)" -ForegroundColor Red
        Write-Host $_.ErrorDetails.Message
        exit 1
    }
}

# ── Configurer le remote et pousser ──
Write-Host "`n🔗 Configuration du remote 'origin'..." -ForegroundColor Cyan

$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "   Remote 'origin' existant détecté — mise à jour..." -ForegroundColor Yellow
    git remote set-url origin $cloneUrl
} else {
    git remote add origin $cloneUrl
}

Write-Host "   Remote configuré : $cloneUrl" -ForegroundColor Green

Write-Host "`n🚀 Push vers GitHub..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ CODE POUSSÉ AVEC SUCCÈS !" -ForegroundColor Green
    Write-Host "   🌐 Dépôt : $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Échec du push. Vérifiez vos credentials Git." -ForegroundColor Red
    Write-Host "   Conseil : Configurez Git avec votre token :" -ForegroundColor Yellow
    Write-Host "   git config --global credential.helper manager" -ForegroundColor Cyan
}
