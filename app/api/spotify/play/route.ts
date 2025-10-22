import { play } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export async function POST() {
  const response = await play()

  if (response.status === 204) {
    return new Response(null, { status: 204 })
  }

  if (response.status === 404) {
    return Response.json({ error: 'No active device' }, { status: 404 })
  }

  return Response.json({ error: 'Failed to play' }, { status: 500 })
}
