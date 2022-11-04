import { MouseEventHandler, MutableRefObject, useRef } from 'react'
import type { ImageCanvas } from '../image-canvas'

const PRIMARY_BUTTON = 0

export const useCanvasPan = ({
  imageCanvas,
}: {
  imageCanvas: MutableRefObject<ImageCanvas | undefined>
}) => {
  const isDragging = useRef(false)
  const origin = useRef({ x: 0, y: 0 })

  const mouseDownHandler: MouseEventHandler = (e) => {
    if (e.button === PRIMARY_BUTTON) {
      isDragging.current = true
      origin.current.x = e.clientX
      origin.current.y = e.clientY
    }
  }

  const mouseUpHandler: MouseEventHandler = (e) => {
    if (e.button === PRIMARY_BUTTON) {
      isDragging.current = false
    }
  }

  const mouseMoveHandler: MouseEventHandler = (e) => {
    if (!isDragging.current || !imageCanvas.current) return

    const x = (e.clientX - origin.current.x) * 0.05
    const y = (e.clientY - origin.current.y) * 0.05

    return imageCanvas.current.pan({ x, y })
  }

  return { mouseDownHandler, mouseUpHandler, mouseMoveHandler }
}
