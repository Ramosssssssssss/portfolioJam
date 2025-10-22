import { pause } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export async function POST() {
  const response = await pause()

  if (response.status === 204) {
    return new Response(null, { status: 204 })
  }

  if (response.status === 404) {
    return Response.json({ error: 'No active device' }, { status: 404 })
  }

  return Response.json({ error: 'Failed to pause' }, { status: 500 })
}
