import { useEvent } from '@/hooks/useEvent'
import type { MutableRefObject, WheelEventHandler } from 'react'
import { ImageCanvas, ZoomDirection } from '../image-canvas'

export const useCanvasZoom = ({
  imageCanvas,
}: {
  imageCanvas: MutableRefObject<ImageCanvas | undefined>
}) => {
  const wheelHandler = useEvent<WheelEventHandler>((e) => {
    if (!imageCanvas.current) return

    return imageCanvas.current.zoom(e.deltaY > 0 ? ZoomDirection.FARTHER : ZoomDirection.CLOSER)
  })

  return wheelHandler
}
