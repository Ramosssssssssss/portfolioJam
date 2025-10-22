import { searchTracks } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    const response = await searchTracks(query)

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ tracks: [] })
    }

    const data = await response.json()

    const tracks = data.tracks?.items?.map((item: any) => ({
      id: item.id,
      uri: item.uri,
      title: item.name,
      artist: item.artists.map((artist: any) => artist.name).join(', '),
      album: item.album.name,
      albumImageUrl: item.album.images[0]?.url,
      songUrl: item.external_urls.spotify,
      duration: item.duration_ms,
    })) || []

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error('Error searching tracks:', error)
    return NextResponse.json({ tracks: [] }, { status: 200 })
  }
}
