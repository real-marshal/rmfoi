import { Button, Heading } from '@/components'
import { dt } from '@/features/Theming'
import styled from '@emotion/styled'
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react'
import { selectLoadedDate, useCurrentSelector } from '../store'
import { SaveModal } from './SaveModal'

export interface MenuPanelProps {
  onLoadImage: (file?: File) => void
  onSaveImage: (filename: string) => void
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${dt.gap.md};
`

const HiddenInput = styled.input`
  display: none;
`

const MenuPanel = ({ onLoadImage, onSaveImage }: MenuPanelProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  const loadedDate = useCurrentSelector(selectLoadedDate)

  const passthroughLoadImage: MouseEventHandler = () => {
    inputRef.current?.click()
  }

  const loadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    onLoadImage(e.target.files?.[0])
  }

  const saveImage = (filename: string) => onSaveImage(filename)

  return (
    <>
      <MenuContainer>
        <Heading type='h2'>Menu</Heading>
        <HiddenInput type='file' ref={inputRef} onChange={loadImage} />
        <Button onClick={passthroughLoadImage}>Load Image</Button>
        <Button
          onClick={() => setIsSaveModalOpen(true)}
          secondary={!loadedDate}
          disabled={!loadedDate}
        >
          Save Image
        </Button>
      </MenuContainer>
      <SaveModal
        isOpen={isSaveModalOpen}
        onSave={(filename) => {
          saveImage(filename)
          setIsSaveModalOpen(false)
        }}
        onCancel={() => setIsSaveModalOpen(false)}
      />
    </>
  )
}

export { MenuPanel }
