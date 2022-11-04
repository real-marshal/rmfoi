export enum ZoomDirection {
  CLOSER = 'closer',
  FARTHER = 'farther',
}

export class ImageCanvas {
  private canvas: HTMLCanvasElement
  private canvasContainer: HTMLDivElement

  private ctx: CanvasRenderingContext2D
  private imageData?: ImageData
  private scaleFactor = 1
  private offset = { x: 0, y: 0 }

  private readonly canvasPadding = 100
  private readonly scaleMultiplier = 0.1

  constructor({
    canvas,
    canvasContainer,
  }: {
    canvas: HTMLCanvasElement
    canvasContainer: HTMLDivElement
  }) {
    this.canvas = canvas
    this.canvasContainer = canvasContainer

    this.ctx = canvas.getContext('2d')!
  }

  initializeImageCanvas(imageData: ImageData) {
    this.imageData = imageData
    this.setInitialScaleFactor()
    this.scaleCanvas()
  }

  async draw(imageData?: ImageData) {
    if (imageData) this.imageData = imageData

    if (!this.imageData) return

    const bitmap = await createImageBitmap(this.imageData)

    this.ctx.drawImage(bitmap, this.offset.x, this.offset.y)
  }

  async zoom(direction: ZoomDirection) {
    this.scaleFactor *=
      direction === ZoomDirection.CLOSER ? 1 + this.scaleMultiplier : 1 - this.scaleMultiplier
    this.scaleCanvas()
    await this.draw()
  }

  async pan(offset: { x: number; y: number }) {
    this.offset.x += offset.x
    this.offset.y += offset.y

    await this.draw()
  }

  async downloadImage(filename: string) {
    if (!this.imageData) return

    const canvas = document.createElement('canvas')
    const link = document.createElement('a')

    const bitmap = await createImageBitmap(this.imageData)

    canvas.width = bitmap.width
    canvas.height = bitmap.height

    canvas.getContext('2d')!.drawImage(bitmap, 0, 0)

    link.download = `${filename}.png`
    link.href = canvas.toDataURL('image/png')

    link.click()
  }

  private scaleCanvas() {
    if (!this.imageData) return

    const { maxWidth, maxHeight } = this.getMaxDimensions()

    this.canvas.width =
      this.imageData.width * this.scaleFactor < maxWidth
        ? this.imageData.width * this.scaleFactor
        : maxWidth
    this.canvas.height =
      this.imageData.height * this.scaleFactor < maxHeight
        ? this.imageData.height * this.scaleFactor
        : maxHeight

    this.ctx.scale(this.scaleFactor, this.scaleFactor)
  }

  private setInitialScaleFactor() {
    if (!this.imageData) return

    this.scaleFactor = 1

    const { maxWidth, maxHeight } = this.getMaxDimensions()

    if (this.imageData.width > maxWidth || this.imageData.height > maxHeight) {
      this.scaleFactor = Math.min(
        maxWidth / this.imageData.width,
        maxHeight / this.imageData.height
      )
    }
  }

  private getMaxDimensions() {
    const { width: containerWidth, height: containerHeight } =
      this.canvasContainer.getBoundingClientRect()

    const maxWidth = containerWidth - this.canvasPadding
    const maxHeight = containerHeight - this.canvasPadding

    return { maxWidth, maxHeight }
  }
}
