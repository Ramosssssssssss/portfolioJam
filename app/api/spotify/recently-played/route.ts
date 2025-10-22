import { getRecentlyPlayed } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const response = await getRecentlyPlayed()

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ tracks: [] })
    }

    const data = await response.json()

    const tracks = data.items.map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      album: item.track.album.name,
      albumImageUrl: item.track.album.images[0]?.url,
      songUrl: item.track.external_urls.spotify,
      playedAt: item.played_at,
    }))

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error('Error fetching recently played:', error)
    return NextResponse.json({ tracks: [] }, { status: 200 })
  }
}
