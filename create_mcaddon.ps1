# ========================================
# SCRIPT DE EMPACOTAMENTO - FULL ORE CHEST ADDON
# Cria arquivos .mcaddon a partir dos packs
# ========================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  FULL ORE CHEST ADDON - Empacotamento" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Definir caminhos
$addonPath = $PSScriptRoot
$bpPath = Join-Path $addonPath "full_ore_chest_BP"
$rpPath = Join-Path $addonPath "full_ore_chest_RP"
$outputPath = Join-Path $addonPath "mcaddon_output"

# Criar pasta de saída
if (-not (Test-Path $outputPath)) {
    New-Item -ItemType Directory -Path $outputPath | Out-Null
    Write-Host "[+] Pasta de saída criada: mcaddon_output" -ForegroundColor Green
}

Write-Host ""
Write-Host "Verificando arquivos..." -ForegroundColor Cyan
Write-Host ""

# Verificar se os diretórios existem
$bpExists = Test-Path $bpPath
$rpExists = Test-Path $rpPath

if (-not $bpExists) {
    Write-Host "[!] ERRO: Behavior Pack não encontrado em: $bpPath" -ForegroundColor Red
    exit 1
}

if (-not $rpExists) {
    Write-Host "[!] ERRO: Resource Pack não encontrado em: $rpPath" -ForegroundColor Red
    exit 1
}

Write-Host "[+] Behavior Pack encontrado" -ForegroundColor Green
Write-Host "[+] Resource Pack encontrado" -ForegroundColor Green
Write-Host ""

# Função para criar arquivo .mcpack
function Create-MCPack {
    param (
        [string]$SourcePath,
        [string]$OutputName,
        [string]$PackType
    )
    
    Write-Host "Empacotando $PackType..." -ForegroundColor Yellow
    
    $zipPath = Join-Path $outputPath "$OutputName.zip"
    $mcpackPath = Join-Path $outputPath "$OutputName.mcpack"
    
    # Remover arquivo anterior se existir
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }
    if (Test-Path $mcpackPath) {
        Remove-Item $mcpackPath -Force
    }
    
    try {
        # Comprimir em ZIP
        Compress-Archive -Path "$SourcePath\*" -DestinationPath $zipPath -CompressionLevel Optimal
        
        # Renomear para .mcpack
        Rename-Item -Path $zipPath -NewName "$OutputName.mcpack"
        
        $fileSize = (Get-Item $mcpackPath).Length / 1KB
        Write-Host "  [+] $OutputName.mcpack criado com sucesso! ($([math]::Round($fileSize, 2)) KB)" -ForegroundColor Green
        
        return $true
    }
    catch {
        Write-Host "  [!] ERRO ao criar $OutputName.mcpack: $_" -ForegroundColor Red
        return $false
    }
}

# Criar .mcpack para Behavior Pack
$bpSuccess = Create-MCPack -SourcePath $bpPath -OutputName "full_ore_chest_BP" -PackType "Behavior Pack"

Write-Host ""

# Criar .mcpack para Resource Pack
$rpSuccess = Create-MCPack -SourcePath $rpPath -OutputName "full_ore_chest_RP" -PackType "Resource Pack"

Write-Host ""
Write-Host "Criando arquivo .mcaddon combinado..." -ForegroundColor Yellow

# Criar .mcaddon (combina BP e RP)
$mcaddonName = "full_ore_chest_addon"
$mcaddonZip = Join-Path $outputPath "$mcaddonName.zip"
$mcaddonPath = Join-Path $outputPath "$mcaddonName.mcaddon"

# Remover arquivo anterior se existir
if (Test-Path $mcaddonZip) {
    Remove-Item $mcaddonZip -Force
}
if (Test-Path $mcaddonPath) {
    Remove-Item $mcaddonPath -Force
}

try {
    # Criar ZIP com ambos os pacotes
    $compress = @{
        Path = $bpPath, $rpPath
        DestinationPath = $mcaddonZip
        CompressionLevel = "Optimal"
    }
    Compress-Archive @compress
    
    # Renomear para .mcaddon
    Rename-Item -Path $mcaddonZip -NewName "$mcaddonName.mcaddon"
    
    $fileSize = (Get-Item $mcaddonPath).Length / 1KB
    Write-Host "  [+] $mcaddonName.mcaddon criado com sucesso! ($([math]::Round($fileSize, 2)) KB)" -ForegroundColor Green
}
catch {
    Write-Host "  [!] ERRO ao criar .mcaddon: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  RESUMO DO EMPACOTAMENTO" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Listar arquivos criados
$files = Get-ChildItem -Path $outputPath -File

if ($files.Count -eq 0) {
    Write-Host "[!] Nenhum arquivo foi criado." -ForegroundColor Red
} else {
    Write-Host "Arquivos criados em: $outputPath" -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($file in $files) {
        $size = [math]::Round($file.Length / 1KB, 2)
        $icon = if ($file.Extension -eq ".mcaddon") { "📦" } else { "📄" }
        Write-Host "  $icon $($file.Name) - $size KB" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  COMO INSTALAR" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Método 1 (Recomendado - .mcaddon):" -ForegroundColor Green
Write-Host "  1. Dê duplo clique no arquivo:" -ForegroundColor White
Write-Host "     full_ore_chest_addon.mcaddon" -ForegroundColor Cyan
Write-Host "  2. O Minecraft abrirá automaticamente" -ForegroundColor White
Write-Host "  3. Os packs serão importados" -ForegroundColor White
Write-Host ""
Write-Host "Método 2 (Individual - .mcpack):" -ForegroundColor Green
Write-Host "  1. Dê duplo clique em:" -ForegroundColor White
Write-Host "     full_ore_chest_BP.mcpack" -ForegroundColor Cyan
Write-Host "     full_ore_chest_RP.mcpack" -ForegroundColor Cyan
Write-Host "  2. Cada pack será importado separadamente" -ForegroundColor White
Write-Host ""
Write-Host "Método 3 (Manual):" -ForegroundColor Green
Write-Host "  1. Copie as pastas originais para:" -ForegroundColor White
Write-Host "     %localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\" -ForegroundColor Cyan
Write-Host "     LocalState\games\com.mojang\" -ForegroundColor Cyan
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Abrir pasta de saída
$openFolder = Read-Host "Deseja abrir a pasta com os arquivos? (S/N)"
if ($openFolder -eq "S" -or $openFolder -eq "s") {
    Start-Process explorer.exe -ArgumentList $outputPath
}

Write-Host ""
Write-Host "[+] Processo concluído!" -ForegroundColor Green
Write-Host ""
