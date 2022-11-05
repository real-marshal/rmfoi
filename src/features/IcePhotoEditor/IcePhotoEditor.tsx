import styled from '@emotion/styled'
import { useRef } from 'react'
import { dt, dtValues } from '@/features/Theming'
import { colors } from './colors'
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
  grid-template-rows: auto 50vh auto;
  background: ${colors.darkGray};
  border: 2px solid ${dt.theme.primary};
  border-radius: 10px;

  @media ${dtValues.mq.bigger} {
    grid-template-columns: 20% auto 23%;
    grid-template-rows: none;
  }
`

const LeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 2px solid black;
  background: #888;
  padding: ${dt.padding.lg};
  gap: ${dt.gap.lg};
  border-radius: 10px 10px 0 0;

  @media ${dtValues.mq.bigger} {
    border-radius: 10px 0 0 10px;
  }
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
  border-radius: 0 0 10px 10px;

  @media ${dtValues.mq.bigger} {
    border-radius: 0 10px 10px 0;
  }
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
        <ImageManipulators />
      </RightSidebar>
    </Container>
  )
}

export { IcePhotoEditor }
