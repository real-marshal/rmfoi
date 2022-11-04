import { useEvent } from '@/hooks'
import type { MutableRefObject } from 'react'
import type { ImageCanvas } from '../image-canvas'
import { actions, useCurrentDispatch } from '../store'
import { getFileImageData } from '../utils'

export const useLoadSaveImage = ({
  imageCanvas,
}: {
  imageCanvas: MutableRefObject<ImageCanvas | undefined>
}) => {
  const dispatch = useCurrentDispatch()

  const loadImage = useEvent(async (image?: File) => {
    if (!image || !imageCanvas.current) return

    const imageData = await getFileImageData(image)

    imageCanvas.current.initializeImageCanvas(imageData)

    dispatch(actions.loadImage({ imageData, filename: image.name }))
  })

  const saveImage = useEvent((filename: string) => {
    if (!imageCanvas.current) return

    return imageCanvas.current.downloadImage(filename)
  })

  return { loadImage, saveImage }
}
