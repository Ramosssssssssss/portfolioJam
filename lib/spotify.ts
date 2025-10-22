const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=10'
const QUEUE_ENDPOINT = 'https://api.spotify.com/v1/me/player/queue'
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
const ADD_TO_QUEUE_ENDPOINT = 'https://api.spotify.com/v1/me/player/queue'
const PLAY_ENDPOINT = 'https://api.spotify.com/v1/me/player/play'
const PAUSE_ENDPOINT = 'https://api.spotify.com/v1/me/player/pause'
const NEXT_ENDPOINT = 'https://api.spotify.com/v1/me/player/next'
const PREVIOUS_ENDPOINT = 'https://api.spotify.com/v1/me/player/previous'
const SEEK_ENDPOINT = 'https://api.spotify.com/v1/me/player/seek'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  })

  return response.json()
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken()

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getQueue = async () => {
  const { access_token } = await getAccessToken()

  return fetch(QUEUE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const searchTracks = async (query: string) => {
  const { access_token } = await getAccessToken()

  return fetch(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&type=track&limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const addToQueue = async (uri: string) => {
  const { access_token } = await getAccessToken()

  return fetch(`${ADD_TO_QUEUE_ENDPOINT}?uri=${uri}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const play = async (deviceId?: string) => {
  const { access_token } = await getAccessToken()
  const url = deviceId ? `${PLAY_ENDPOINT}?device_id=${deviceId}` : PLAY_ENDPOINT
  
  return fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const pause = async (deviceId?: string) => {
  const { access_token } = await getAccessToken()
  const url = deviceId ? `${PAUSE_ENDPOINT}?device_id=${deviceId}` : PAUSE_ENDPOINT
  
  return fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const skipToNext = async (deviceId?: string) => {
  const { access_token } = await getAccessToken()
  const url = deviceId ? `${NEXT_ENDPOINT}?device_id=${deviceId}` : NEXT_ENDPOINT
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const skipToPrevious = async (deviceId?: string) => {
  const { access_token } = await getAccessToken()
  const url = deviceId ? `${PREVIOUS_ENDPOINT}?device_id=${deviceId}` : PREVIOUS_ENDPOINT
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const seek = async (position_ms: number, deviceId?: string) => {
  const { access_token } = await getAccessToken()
  const url = deviceId 
    ? `${SEEK_ENDPOINT}?position_ms=${position_ms}&device_id=${deviceId}`
    : `${SEEK_ENDPOINT}?position_ms=${position_ms}`
  
  return fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
