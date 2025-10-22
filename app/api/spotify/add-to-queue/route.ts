import { addToQueue } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { uri } = body

    if (!uri) {
      return NextResponse.json({ error: 'URI is required' }, { status: 400 })
    }

    const response = await addToQueue(uri)

    if (response.status === 204) {
      return NextResponse.json({ success: true, message: 'Canción agregada a la cola' })
    }

    if (response.status === 404) {
      return NextResponse.json(
        { error: 'No se encontró un dispositivo activo. Abre Spotify en algún dispositivo.' },
        { status: 404 }
      )
    }

    if (response.status > 400) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.error?.message || 'Error al agregar canción' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding to queue:', error)
    return NextResponse.json(
      { error: 'Error al agregar canción a la cola' },
      { status: 500 }
    )
  }
}
