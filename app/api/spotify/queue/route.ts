import { getQueue } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const response = await getQueue()

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ queue: [] })
    }

    const data = await response.json()

    const queue = data.queue?.slice(0, 10).map((item: any) => ({
      title: item.name,
      artist: item.artists.map((artist: any) => artist.name).join(', '),
      album: item.album.name,
      albumImageUrl: item.album.images[0]?.url,
      songUrl: item.external_urls.spotify,
    })) || []

    return NextResponse.json({ queue })
  } catch (error) {
    console.error('Error fetching queue:', error)
    return NextResponse.json({ queue: [] }, { status: 200 })
  }
}
