interface Track {
  title: string
  artist: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  playedAt?: string
}

interface SongListProps {
  tracks: Track[]
  title: string
  emptyMessage: string
  icon?: React.ReactNode
}

export function SongList({ tracks, title, emptyMessage, icon }: SongListProps) {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm text-muted-foreground">({tracks.length})</span>
      </div>
      
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <a
            key={`${track.title}-${index}`}
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
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
              <p className="font-medium text-sm truncate group-hover:text-green-500 transition-colors">
                {track.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {track.artist}
              </p>
            </div>

            <svg 
              className="w-4 h-4 text-muted-foreground group-hover:text-green-500 transition-colors flex-shrink-0"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
