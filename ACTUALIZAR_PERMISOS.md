# 🔴 IMPORTANTE: Actualizar Permisos de Spotify

Para que funcione el buscador, agregar a cola y el reproductor web, necesitas **regenerar tu Refresh Token** con más permisos.

## Paso 1: Generar nuevo código de autorización

Usa esta URL (reemplaza `df029155681241aab53acb36d7889520` con tu Client ID si es diferente):

```
https://accounts.spotify.com/authorize?client_id=df029155681241aab53acb36d7889520&response_type=code&redirect_uri=https://fyttsa.com&scope=user-read-currently-playing%20user-read-recently-played%20user-read-playback-state%20user-modify-playback-state%20streaming
```

## Paso 2: Autoriza la aplicación

1. Abre la URL en tu navegador
2. Haz clic en "Aceptar"  
3. Serás redirigido a `https://fyttsa.com/?code=CODIGO_LARGO...`
4. **Copia todo el código** después de `code=`

## Paso 3: Genera el nuevo Refresh Token

Abre PowerShell y ejecuta (reemplaza los valores):

```powershell
$clientId = "df029155681241aab53acb36d7889520"
$clientSecret = "8be5f4b1d90c4683a755712fcdf77f94"
$code = "PEGA_AQUI_EL_CODIGO_QUE_COPIASTE"
$redirectUri = "https://fyttsa.com"

$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${clientId}:${clientSecret}"))

$body = @{
    grant_type = "authorization_code"
    code = $code
    redirect_uri = $redirectUri
}

$response = Invoke-RestMethod -Uri "https://accounts.spotify.com/api/token" -Method Post -Headers @{
    "Authorization" = "Basic $auth"
    "Content-Type" = "application/x-www-form-urlencoded"
} -Body $body

Write-Host "Refresh Token: $($response.refresh_token)"
```

## Paso 4: Actualiza tu `.env.local`

Reemplaza el `SPOTIFY_REFRESH_TOKEN` con el nuevo valor:

```env
SPOTIFY_CLIENT_ID=df029155681241aab53acb36d7889520
SPOTIFY_CLIENT_SECRET=8be5f4b1d90c4683a755712fcdf77f94
SPOTIFY_REFRESH_TOKEN=NUEVO_REFRESH_TOKEN_AQUI
```

## Paso 5: Reinicia el servidor

```bash
pnpm dev
```

## ✅ Nuevos permisos incluidos:

- ✅ `user-read-currently-playing` - Ver lo que estás escuchando
- ✅ `user-read-recently-played` - Ver tu historial
- ✅ `user-read-playback-state` - Ver estado del reproductor
- ✅ `user-modify-playback-state` - Controlar reproducción y cola
- ✅ `streaming` - Reproducir música en el navegador

¡Listo! Ahora podrás usar todas las funciones del reproductor. 🎵
