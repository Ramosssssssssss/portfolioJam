import { NextResponse } from 'next/server'

// In-memory storage for suggestions (in production, use a database)
let suggestions: Array<{
  id: string
  songName: string
  artist: string
  suggestedBy: string
  timestamp: string
  spotifyUrl?: string
}> = []

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Return suggestions sorted by most recent
    const sortedSuggestions = [...suggestions].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    
    return NextResponse.json({ suggestions: sortedSuggestions })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json({ suggestions: [] }, { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { songName, artist, suggestedBy, spotifyUrl } = body

    if (!songName || !artist || !suggestedBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newSuggestion = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      songName,
      artist,
      suggestedBy,
      spotifyUrl: spotifyUrl || undefined,
      timestamp: new Date().toISOString(),
    }

    suggestions.push(newSuggestion)

    // Keep only the last 50 suggestions
    if (suggestions.length > 50) {
      suggestions = suggestions.slice(-50)
    }

    return NextResponse.json({ success: true, suggestion: newSuggestion })
  } catch (error) {
    console.error('Error adding suggestion:', error)
    return NextResponse.json(
      { error: 'Failed to add suggestion' },
      { status: 500 }
    )
  }
}

// Optional: DELETE endpoint to clear suggestions or remove specific ones
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      suggestions = suggestions.filter((s) => s.id !== id)
    } else {
      // Clear all suggestions
      suggestions = []
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting suggestion:', error)
    return NextResponse.json(
      { error: 'Failed to delete suggestion' },
      { status: 500 }
    )
  }
}
