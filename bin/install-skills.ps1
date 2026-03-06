param(
    [ValidateSet("kiro", "cursor", "antigravity", "vscode", "copilot", "generic")]
    [string]$Ide = "",

    [ValidateSet("project", "global")]
    [string]$Scope = "project"
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Resolve-Path (Join-Path $ScriptDir "..")
$CliPath = Join-Path $RepoRoot "bin\\cli.js"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js is required to run the installer."
}

$Args = @()
if ($Scope -eq "global") {
    $Args += "global"
} else {
    $Args += "init"
}

if ($Ide) {
    $Args += "--ide=$Ide"
}

& node $CliPath @Args
