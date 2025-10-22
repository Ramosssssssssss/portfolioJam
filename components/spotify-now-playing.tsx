"use client"

import { useEffect, useState } from "react"

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify/now-playing")
        const data = await response.json()
        console.log("Spotify Data:", data) // Debug log
        setData(data)
      } catch (error) {
        console.error("Error fetching Spotify data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return null
  }

  // Show placeholder if not playing (for debugging)
  if (!data.isPlaying) {
    return (
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs opacity-50">
        <div className="relative">
          <div className="relative bg-background/95 backdrop-blur-sm border border-muted rounded-full px-4 py-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">
                  No estás escuchando música
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs">
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative">
          {/* Blob background with animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-green-400/20 to-green-500/20 rounded-[3rem] blur-xl animate-pulse" />
          
          <div className="relative bg-background/95 backdrop-blur-sm border border-green-500/20 rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              {/* Album cover with blob effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-md animate-pulse" />
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-green-500/50">
                  {data.albumImageUrl ? (
                    <img
                      src={data.albumImageUrl}
                      alt={data.album}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Song info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    Escuchando ahora
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-green-500 transition-colors">
                  {data.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {data.artist}
                </p>
              </div>

              {/* Spotify icon */}
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
