# ============================================================
# create_github_repo.ps1
# Cree le depot GitHub via l'API REST et configure le remote
# ============================================================

param(
    [string]$RepoName = "perou-amitie-solidarite",
    [string]$Description = "Migration statique benevole du site Perou Amitie Solidarite",
    [bool]$IsPrivate = $false
)

# Recuperer le token GitHub
$token = $env:GITHUB_TOKEN
if (-not $token) {
    Write-Host ""
    Write-Host "Aucun token GitHub trouve dans GITHUB_TOKEN." -ForegroundColor Yellow
    Write-Host "Entrez votre GitHub Personal Access Token (scope: repo) :" -ForegroundColor Cyan
    $token = Read-Host "Token"
}

if (-not $token) {
    Write-Host "Token vide. Abandon." -ForegroundColor Red
    exit 1
}

# Headers communs
$headers = @{
    "Authorization" = "token $token"
    "Accept"        = "application/vnd.github+json"
    "User-Agent"    = "perou-migration-script"
}

# Recuperer le nom d'utilisateur GitHub
Write-Host ""
Write-Host "Verification du profil GitHub..." -ForegroundColor Cyan
try {
    $user = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method GET
    $username = $user.login
    Write-Host "  Connecte en tant que : $username" -ForegroundColor Green
} catch {
    Write-Host "Erreur d'authentification : $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Creer le depot
Write-Host ""
Write-Host "Creation du depot '$RepoName'..." -ForegroundColor Cyan

$bodyObj = @{
    name        = $RepoName
    description = $Description
    private     = $IsPrivate
    auto_init   = $false
}
$body = $bodyObj | ConvertTo-Json

$repoUrl  = $null
$cloneUrl = $null

try {
    $repo    = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Headers $headers -Method POST -Body $body -ContentType "application/json"
    $repoUrl  = $repo.html_url
    $cloneUrl = $repo.clone_url
    Write-Host "  Depot cree : $repoUrl" -ForegroundColor Green
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 422) {
        Write-Host "  Le depot existe deja - recuperation de l'URL..." -ForegroundColor Yellow
        $existingRepo = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$RepoName" -Headers $headers
        $repoUrl  = $existingRepo.html_url
        $cloneUrl = $existingRepo.clone_url
        Write-Host "  URL : $repoUrl" -ForegroundColor Green
    } else {
        Write-Host "Erreur creation depot ($statusCode) : $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Configurer le remote et pousser
Write-Host ""
Write-Host "Configuration du remote 'origin'..." -ForegroundColor Cyan

$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "  Remote existant detecte - mise a jour..." -ForegroundColor Yellow
    git remote set-url origin $cloneUrl
} else {
    git remote add origin $cloneUrl
}

Write-Host "  Remote : $cloneUrl" -ForegroundColor Green

Write-Host ""
Write-Host "Push vers GitHub..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCES ! Code pousse sur GitHub." -ForegroundColor Green
    Write-Host "  Depot : $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Echec du push. Verifiez vos credentials Git." -ForegroundColor Red
    Write-Host "Conseil : configurez le credential helper :" -ForegroundColor Yellow
    Write-Host "  git config --global credential.helper manager" -ForegroundColor Cyan
}
