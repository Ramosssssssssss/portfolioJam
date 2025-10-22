# Configura   - **Redirect URIs**: Agrega AMBAS URLs (Spotify permite múltiples):
     - Para desarrollo: `http://localhost:3000`
     - Para producción: `https://fyttsa.com`
     - ⚠️ Si usas www: `https://www.fyttsa.com` (agrégala también si aplica)
     - 💡 **NO necesitas** agregar `/api/auth/callback/spotify` - solo el dominio basede Spotify Now Playing

## Paso 1: Crear una aplicación en Spotify Developer Dashboard

1. Ve a https://developer.spotify.com/dashboard
2. Inicia sesión con tu cuenta de Spotify
3. Haz clic en "Create app"
4. Llena los campos:
   - **App name**: Diego Portfolio
   - **App description**: Portfolio personal con integración de Spotify
   - **Which API/SDKs are you planning to use?**: Marca ✅ **Web API**
   - **Redirect URIs**: Agrega AMBAS URLs (Spotify permite múltiples):
     - Para desarrollo: `http://localhost:3000`
     - Para producción: `https://tu-dominio.com` (reemplaza con tu dominio real)
     - ⚠️ Si usas subdominios: `https://www.tu-dominio.com`
     - � **NO necesitas** agregar `/api/auth/callback/spotify` - solo el dominio base
5. Marca las casillas de términos y condiciones
6. Haz clic en "Save"
7. Copia tu **Client ID** y **Client Secret**

> **Nota sobre seguridad**: 
> - Localhost está permitido sin HTTPS por Spotify para desarrollo.
> - En producción usa HTTPS (tu dominio: `https://fyttsa.com`).
> - **NO uses rutas complejas** como `/api/auth/callback/spotify` - Spotify solo necesita el dominio base.
> - Puedes tener múltiples Redirect URIs (localhost + producción) configurados al mismo tiempo.

## Paso 2: Obtener el Refresh Token

### Opción A: Usando la URL simplificada (recomendado)

1. Crea la siguiente URL (⚠️ **IMPORTANTE**: reemplaza `CLIENT_ID` con tu Client ID real de Spotify):

```
https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-recently-played%20user-read-playback-state%20user-modify-playback-state%20streaming
```

**Ejemplo con Client ID real:**
```
https://accounts.spotify.com/authorize?client_id=a1b2c3d4e5f6&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-recently-played%20user-read-playback-state%20user-modify-playback-state%20streaming
```

💡 **Para producción**, usa tu dominio:
```
https://accounts.spotify.com/authorize?client_id=TU_CLIENT_ID_REAL&response_type=code&redirect_uri=https://fyttsa.com&scope=user-read-currently-playing%20user-read-recently-played%20user-read-playback-state%20user-modify-playback-state%20streaming
```

⚠️ **IMPORTANTE**: Si ya tienes un refresh token, necesitas generar uno nuevo con estos scopes adicionales para que funcione la cola y el reproductor web.

2. Abre la URL en tu navegador (con tu CLIENT_ID real, no la palabra "CLIENT_ID")
3. Autoriza la aplicación
4. Serás redirigido a una URL como: `http://localhost:3000?code=AQD...`
5. Copia el valor del parámetro `code` de la URL

### Opción B: Si localhost no funciona, usa 127.0.0.1

Si tienes problemas con localhost, reemplaza `http://localhost:3000` por `http://127.0.0.1:3000` en todos los pasos:

```
https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://127.0.0.1:3000&scope=user-read-currently-playing
```

6. Abre PowerShell y ejecuta este comando (reemplaza CLIENT_ID, CLIENT_SECRET y CODE):

```powershell
$clientId = "TU_CLIENT_ID"
$clientSecret = "TU_CLIENT_SECRET"
$code = "TU_CODE"
$redirectUri = "http://localhost:3000"  # O "http://127.0.0.1:3000" si usaste esa opción

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

7. Copia el **Refresh Token** que aparece en la salida

## Paso 3: Configurar Variables de Entorno

1. Crea un archivo `.env.local` en la raíz del proyecto:

```env
SPOTIFY_CLIENT_ID=tu_client_id_aquí
SPOTIFY_CLIENT_SECRET=tu_client_secret_aquí
SPOTIFY_REFRESH_TOKEN=tu_refresh_token_aquí
```

2. Asegúrate de que `.env.local` esté en tu `.gitignore`

## Paso 4: Reiniciar el servidor de desarrollo

```bash
npm run dev
# o
pnpm dev
# o
yarn dev
```

## ¡Listo! 🎵

Ahora cuando estés escuchando música en Spotify, aparecerá automáticamente en tu portfolio con un efecto de burbuja/blob animado.

## Notas

- La información se actualiza cada 10 segundos
- Si no estás escuchando música, el componente no se mostrará
- Asegúrate de estar escuchando música en tu cuenta de Spotify para ver la integración funcionando
