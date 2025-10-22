"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Radio, Clock, ListMusic, Sparkles, Send, Search, Plus, Loader2, Play, Pause, SkipForward, SkipBack, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SongList } from "@/components/song-list"
import { DraggableQueue } from "@/components/draggable-queue"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  progress_ms?: number
  duration_ms?: number
}

interface Track {
  title: string
  artist: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  playedAt?: string
  uri?: string
  id?: string
}

interface Suggestion {
  id: string
  songName: string
  artist: string
  suggestedBy: string
  timestamp: string
  spotifyUrl?: string
}

export default function ReproductorPage() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false })
  const [loading, setLoading] = useState(true)
  const [listeners, setListeners] = useState(1)
  const [queue, setQueue] = useState<Track[]>([])
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([])
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Track[]>([])
  const [searching, setSearching] = useState(false)
  const [addingToQueue, setAddingToQueue] = useState<string | null>(null)
  
  // Suggestion form state
  const [songName, setSongName] = useState("")
  const [artistName, setArtistName] = useState("")
  const [yourName, setYourName] = useState("")
  const [spotifyUrl, setSpotifyUrl] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [nowPlayingRes, queueRes, recentlyPlayedRes, suggestionsRes] = await Promise.all([
          fetch("/api/spotify/now-playing"),
          fetch("/api/spotify/queue"),
          fetch("/api/spotify/recently-played"),
          fetch("/api/suggestions"),
        ])

        const [nowPlayingData, queueData, recentlyPlayedData, suggestionsData] = await Promise.all([
          nowPlayingRes.json(),
          queueRes.json(),
          recentlyPlayedRes.json(),
          suggestionsRes.json(),
        ])

        setData(nowPlayingData)
        setQueue(queueData.queue || [])
        setRecentlyPlayed(recentlyPlayedData.tracks || [])
        setSuggestions(suggestionsData.suggestions || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000) // Update every 5 seconds

    // Simulate random listeners joining/leaving
    const listenersInterval = setInterval(() => {
      setListeners((prev) => Math.max(1, prev + Math.floor(Math.random() * 3) - 1))
    }, 8000)

    return () => {
      clearInterval(interval)
      clearInterval(listenersInterval)
    }
  }, [])

  // Search for tracks
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const debounce = setTimeout(async () => {
      setSearching(true)
      try {
        const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(searchQuery)}`)
        const data = await response.json()
        setSearchResults(data.tracks || [])
      } catch (error) {
        console.error("Error searching:", error)
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 500) // Debounce 500ms

    return () => clearTimeout(debounce)
  }, [searchQuery])

  const handleAddToQueue = async (track: Track) => {
    if (!track.uri) return

    setAddingToQueue(track.id || track.uri)

    try {
      const response = await fetch("/api/spotify/add-to-queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uri: track.uri }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(`✅ "${track.title}" agregada a la cola!`)
        setSearchQuery("")
        setSearchResults([])
        
        // Refresh queue
        const queueRes = await fetch("/api/spotify/queue")
        const queueData = await queueRes.json()
        setQueue(queueData.queue || [])
      } else {
        alert(data.error || "Error al agregar canción a la cola")
      }
    } catch (error) {
      console.error("Error adding to queue:", error)
      alert("Error al agregar canción a la cola")
    } finally {
      setAddingToQueue(null)
    }
  }

  const handleSuggestSong = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!songName || !artistName || !yourName) {
      alert("Por favor llena todos los campos requeridos")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songName,
          artist: artistName,
          suggestedBy: yourName,
          spotifyUrl: spotifyUrl || undefined,
        }),
      })

      if (response.ok) {
        // Clear form
        setSongName("")
        setArtistName("")
        setYourName("")
        setSpotifyUrl("")
        
        // Refresh suggestions
        const suggestionsRes = await fetch("/api/suggestions")
        const suggestionsData = await suggestionsRes.json()
        setSuggestions(suggestionsData.suggestions || [])
        
        alert("¡Sugerencia enviada! 🎵")
      } else {
        alert("Error al enviar sugerencia. Intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error)
      alert("Error al enviar sugerencia. Intenta de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  // Playback controls
  const handlePlay = async () => {
    try {
      await fetch("/api/spotify/play", { method: "POST" })
    } catch (error) {
      console.error("Error playing:", error)
    }
  }

  const handlePause = async () => {
    try {
      await fetch("/api/spotify/pause", { method: "POST" })
    } catch (error) {
      console.error("Error pausing:", error)
    }
  }

  const handleNext = async () => {
    try {
      await fetch("/api/spotify/next", { method: "POST" })
    } catch (error) {
      console.error("Error skipping to next:", error)
    }
  }

  const handlePrevious = async () => {
    try {
      await fetch("/api/spotify/previous", { method: "POST" })
    } catch (error) {
      console.error("Error skipping to previous:", error)
    }
  }

  const handleRestart = async () => {
    try {
      await fetch("/api/spotify/seek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position_ms: 0 }),
      })
    } catch (error) {
      console.error("Error restarting song:", error)
    }
  }

  const handleSeek = async (value: number[]) => {
    const position_ms = value[0]
    try {
      await fetch("/api/spotify/seek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position_ms }),
      })
    } catch (error) {
      console.error("Error seeking:", error)
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / 1000 / 60) % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al Portfolio
            </Button>
          </Link>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
            <div className="flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <Radio className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">En Vivo</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Jam Session 🎵
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Únete a mi sesión de música en tiempo real. Lo que yo escucho, tú escuchas.
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span className="text-sm">
                {listeners} {listeners === 1 ? "oyente conectado" : "oyentes conectados"}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : !data.isPlaying ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">No hay música sonando</h2>
                <p className="text-muted-foreground">
                  Diego no está escuchando nada en este momento. Vuelve pronto! 🎧
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Album Art & Info */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-purple-500 to-green-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                
                <div className="relative bg-background/95 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Album Cover */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
                        {data.albumImageUrl ? (
                          <img
                            src={data.albumImageUrl}
                            alt={data.album}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-purple-500/20 flex items-center justify-center">
                            <svg className="w-24 h-24 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Vinyl effect */}
                      <div className="absolute -right-4 -bottom-4 w-32 h-32 border-8 border-background rounded-full bg-gradient-to-br from-muted to-muted/50 opacity-50"></div>
                    </div>

                    {/* Song Info */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          </div>
                          <span className="font-medium">Reproduciendo ahora</span>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                          {data.title}
                        </h2>
                        
                        <p className="text-xl text-muted-foreground">
                          {data.artist}
                        </p>
                        
                        <p className="text-sm text-muted-foreground/70">
                          {data.album}
                        </p>
                      </div>

                      {/* Spotify Link */}
                      <a
                        href={data.songUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block group/btn"
                      >
                        <Button className="gap-2 bg-green-500 hover:bg-green-600 text-white">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                          </svg>
                          Abrir en Spotify
                        </Button>
                      </a>

                      {/* Playback Controls */}
                      <div className="space-y-4 pt-4 border-t border-border/50">
                        {/* Progress Bar */}
                        {data.duration_ms && (
                          <div className="space-y-2">
                            <Slider
                              value={[data.progress_ms || 0]}
                              max={data.duration_ms}
                              step={1000}
                              onValueChange={handleSeek}
                              className="cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{formatTime(data.progress_ms || 0)}</span>
                              <span>{formatTime(data.duration_ms)}</span>
                            </div>
                          </div>
                        )}

                        {/* Control Buttons */}
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleRestart}
                            className="h-10 w-10"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handlePrevious}
                            className="h-10 w-10"
                          >
                            <SkipBack className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            size="icon"
                            onClick={data.isPlaying ? handlePause : handlePlay}
                            className="h-12 w-12 bg-green-500 hover:bg-green-600 text-white"
                          >
                            {data.isPlaying ? (
                              <Pause className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleNext}
                            className="h-10 w-10"
                          >
                            <SkipForward className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs: Queue, Recently Played, Suggestions */}
              <Tabs defaultValue="queue" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="queue" className="gap-2">
                    <ListMusic className="w-4 h-4" />
                    <span className="hidden sm:inline">Cola</span>
                    {queue.length > 0 && (
                      <span className="text-xs bg-green-500/20 text-green-600 px-1.5 py-0.5 rounded-full">
                        {queue.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="hidden sm:inline">Historial</span>
                  </TabsTrigger>
                  <TabsTrigger value="suggestions" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">Sugerencias</span>
                    {suggestions.length > 0 && (
                      <span className="text-xs bg-purple-500/20 text-purple-600 px-1.5 py-0.5 rounded-full">
                        {suggestions.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="queue" className="mt-6">
                  <div className="space-y-6">
                    {/* Search Box */}
                    <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-2xl p-6">
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                        <Search className="w-5 h-5 text-green-500" />
                        Buscar y agregar canciones
                      </h3>
                      
                      <div className="relative">
                        <Input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Busca por canción o artista..."
                          className="pl-10"
                        />
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        {searching && (
                          <Loader2 className="w-4 h-4 text-green-500 absolute right-3 top-1/2 -translate-y-1/2 animate-spin" />
                        )}
                      </div>

                      {/* Search Results */}
                      {searchResults.length > 0 && (
                        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                          {searchResults.map((track) => (
                            <div
                              key={track.id}
                              className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background border border-border/50 hover:border-border transition-all duration-200 group"
                            >
                              {track.albumImageUrl ? (
                                <img
                                  src={track.albumImageUrl}
                                  alt={track.album}
                                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
                                  <svg className="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                  </svg>
                                </div>
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {track.title}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {track.artist}
                                </p>
                              </div>

                              <Button
                                size="sm"
                                onClick={() => handleAddToQueue(track)}
                                disabled={addingToQueue === (track.id || track.uri)}
                                className="gap-1 bg-green-500 hover:bg-green-600 flex-shrink-0"
                              >
                                {addingToQueue === (track.id || track.uri) ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Plus className="w-4 h-4" />
                                )}
                                <span className="hidden sm:inline">Agregar</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {searchQuery && !searching && searchResults.length === 0 && (
                        <div className="mt-4 text-center py-4 text-muted-foreground text-sm">
                          No se encontraron resultados
                        </div>
                      )}
                    </div>

                    {/* Queue List */}
                    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <ListMusic className="w-5 h-5 text-green-500" />
                        <h3 className="font-semibold text-lg">Próximas canciones</h3>
                        <span className="text-xs text-muted-foreground ml-auto">
                          Arrastra para reordenar
                        </span>
                      </div>
                      <DraggableQueue queue={queue} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                  <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                    <SongList
                      tracks={recentlyPlayed}
                      title="Reproducidas recientemente"
                      emptyMessage="No hay historial disponible"
                      icon={<Clock className="w-5 h-5 text-blue-500" />}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="suggestions" className="mt-6">
                  <div className="space-y-6">
                    {/* Suggestion Form */}
                    <div className="bg-gradient-to-br from-purple-500/5 to-green-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        Sugiere una canción
                      </h3>
                      <form onSubmit={handleSuggestSong} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="songName" className="text-sm font-medium">
                              Nombre de la canción *
                            </label>
                            <Input
                              id="songName"
                              value={songName}
                              onChange={(e) => setSongName(e.target.value)}
                              placeholder="Ej: Bohemian Rhapsody"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="artistName" className="text-sm font-medium">
                              Artista *
                            </label>
                            <Input
                              id="artistName"
                              value={artistName}
                              onChange={(e) => setArtistName(e.target.value)}
                              placeholder="Ej: Queen"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="yourName" className="text-sm font-medium">
                            Tu nombre *
                          </label>
                          <Input
                            id="yourName"
                            value={yourName}
                            onChange={(e) => setYourName(e.target.value)}
                            placeholder="¿Quién sugiere?"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="spotifyUrl" className="text-sm font-medium">
                            URL de Spotify (opcional)
                          </label>
                          <Input
                            id="spotifyUrl"
                            value={spotifyUrl}
                            onChange={(e) => setSpotifyUrl(e.target.value)}
                            placeholder="https://open.spotify.com/track/..."
                            type="url"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full gap-2 bg-purple-500 hover:bg-purple-600"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>Enviando...</>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Enviar sugerencia
                            </>
                          )}
                        </Button>
                      </form>
                    </div>

                    {/* Suggestions List */}
                    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-purple-500" />
                        Sugerencias de la comunidad
                        {suggestions.length > 0 && (
                          <span className="text-sm text-muted-foreground">({suggestions.length})</span>
                        )}
                      </h3>
                      
                      {suggestions.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No hay sugerencias aún. ¡Sé el primero!</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {suggestions.map((suggestion) => (
                            <div
                              key={suggestion.id}
                              className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50"
                            >
                              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-purple-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">
                                  {suggestion.songName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {suggestion.artist}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Sugerido por <span className="font-medium">{suggestion.suggestedBy}</span>
                                </p>
                              </div>
                              {suggestion.spotifyUrl && (
                                <a
                                  href={suggestion.spotifyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0"
                                >
                                  <Button size="sm" variant="ghost" className="gap-1">
                                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                    </svg>
                                  </Button>
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Powered by Spotify Web API • Actualización en tiempo real</p>
        </div>
      </footer>
    </div>
  )
}
