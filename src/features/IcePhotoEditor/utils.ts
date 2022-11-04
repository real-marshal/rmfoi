export const sanitizeNumberInput = (value: string): number => {
  const numberOrNaN = Number.parseInt(value, 10)

  return Number.isNaN(numberOrNaN) ? 0 : numberOrNaN
}

// If only stupid Safari supported OffscreenCanvas...
export const getFileImageData = async (image: File): Promise<ImageData> => {
  const bitmap = await window.createImageBitmap(image)

  const canvas = document.createElement('canvas')

  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const ctx = canvas.getContext('2d')!

  ctx.drawImage(bitmap, 0, 0)

  return ctx.getImageData(0, 0, bitmap.width, bitmap.height)
}
