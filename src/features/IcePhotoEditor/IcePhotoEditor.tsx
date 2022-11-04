import styled from '@emotion/styled'
import { useRef } from 'react'
import { dt } from '../Theming'
import { colors } from './colors'
import { Histogram } from './Histogram'
import { ImageHistory } from './ImageHistory'
import { MenuPanel } from './MenuPanel'
import { ImageManipulators } from './ImageManipulators'
import { useLoadSaveImage } from './hooks/useLoadImage'
import { useCanvasZoom } from './hooks/useCanvasZoom'
import { useCanvasPan } from './hooks/useCanvasPan'
import { useImageCanvas } from './hooks/useImageCanvas'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 15% auto 20%;
  background: ${colors.darkGray};
  border: 2px solid black;
  border-radius: 10px;
`

const LeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 2px solid black;
  background: #888;
  padding: ${dt.padding.lg};
  gap: ${dt.gap.lg};
`

const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MainCanvas = styled.canvas`
  opacity: 1;
  grid-area: canvas;
`

const RightSidebar = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 2px solid black;
  padding: ${dt.padding.lg};
  gap: ${dt.gap.lg};
  background: #888;
`

const IcePhotoEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  const imageCanvas = useImageCanvas({ canvasRef, canvasContainerRef })

  // TODO: drag-n-drop support
  const { loadImage, saveImage } = useLoadSaveImage({ imageCanvas })

  const wheelHandler = useCanvasZoom({ imageCanvas })

  const { mouseDownHandler, mouseUpHandler, mouseMoveHandler } = useCanvasPan({ imageCanvas })

  return (
    <Container>
      <LeftSidebar>
        <MenuPanel onLoadImage={loadImage} onSaveImage={saveImage} />
        <ImageHistory />
      </LeftSidebar>
      <CanvasContainer ref={canvasContainerRef}>
        <MainCanvas
          ref={canvasRef}
          onWheel={wheelHandler}
          onMouseDown={mouseDownHandler}
          onMouseUp={mouseUpHandler}
          onMouseMove={mouseMoveHandler}
        />
      </CanvasContainer>
      <RightSidebar>
        <Histogram />
        <ImageManipulators />
      </RightSidebar>
    </Container>
  )
}

export { IcePhotoEditor }
