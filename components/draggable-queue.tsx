"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"

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

interface DraggableQueueProps {
  queue: Track[]
  onReorder?: (newQueue: Track[]) => void
}

function SortableTrack({ track, index }: { track: Track; index: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: track.id || track.uri || `${track.title}-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-border/50 hover:bg-card/80 transition-colors"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>

      {track.albumImageUrl && (
        <div className="flex-shrink-0">
          <img
            src={track.albumImageUrl}
            alt={track.album}
            className="w-12 h-12 rounded-md object-cover"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-green-500 transition-colors"
        >
          <h3 className="font-medium truncate">{track.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
        </a>
      </div>

      <div className="text-xs text-muted-foreground font-mono">
        #{index + 1}
      </div>
    </div>
  )
}

export function DraggableQueue({ queue, onReorder }: DraggableQueueProps) {
  const [items, setItems] = useState(queue)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => (item.id || item.uri || item.title) === active.id
        )
        const newIndex = items.findIndex(
          (item) => (item.id || item.uri || item.title) === over.id
        )

        const newItems = arrayMove(items, oldIndex, newIndex)
        
        if (onReorder) {
          onReorder(newItems)
        }

        return newItems
      })
    }
  }

  // Update items when queue prop changes
  if (JSON.stringify(items) !== JSON.stringify(queue)) {
    setItems(queue)
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <div className="text-muted-foreground">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <p className="text-lg font-medium">La cola está vacía</p>
          <p className="text-sm">Busca canciones para agregarlas a la cola</p>
        </div>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((track, i) => track.id || track.uri || `${track.title}-${i}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {items.map((track, index) => (
            <SortableTrack
              key={track.id || track.uri || `${track.title}-${index}`}
              track={track}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
