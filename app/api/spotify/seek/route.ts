import { seek } from '@/lib/spotify'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const { position_ms } = await request.json()

  if (typeof position_ms !== 'number') {
    return Response.json({ error: 'Invalid position' }, { status: 400 })
  }

  const response = await seek(position_ms)

  if (response.status === 204) {
    return new Response(null, { status: 204 })
  }

  if (response.status === 404) {
    return Response.json({ error: 'No active device' }, { status: 404 })
  }

  return Response.json({ error: 'Failed to seek' }, { status: 500 })
}
