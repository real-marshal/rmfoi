import { usePrevious } from '@/hooks'
import { RefObject, useEffect, useRef } from 'react'
import { ImageCanvas } from '../image-canvas'
import { selectCurrentImage, selectPersistRehydrated, useCurrentSelector } from '../store'

export const useImageCanvas = ({
  canvasRef,
  canvasContainerRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement>
  canvasContainerRef: RefObject<HTMLDivElement>
}) => {
  const imageCanvas = useRef<ImageCanvas>()

  const currentImage = useCurrentSelector(selectCurrentImage)
  const rehydrated = useCurrentSelector(selectPersistRehydrated)

  const prevRehydrated = usePrevious(rehydrated)

  useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current) return

    imageCanvas.current = new ImageCanvas({
      canvas: canvasRef.current,
      canvasContainer: canvasContainerRef.current,
    })
  }, [canvasContainerRef, canvasRef])

  useEffect(() => {
    if (!imageCanvas.current || !currentImage) return

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    imageCanvas.current.draw(currentImage)
  }, [currentImage, imageCanvas])

  useEffect(() => {
    if (!imageCanvas.current || !currentImage) return

    if (!prevRehydrated && rehydrated) {
      imageCanvas.current.initializeImageCanvas(currentImage)
    }
  }, [currentImage, imageCanvas, prevRehydrated, rehydrated])

  return imageCanvas
}
