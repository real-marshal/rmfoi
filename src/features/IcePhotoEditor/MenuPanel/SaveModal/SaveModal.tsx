import { Button, Heading, Modal } from '@/components'
import { dt } from '@/features/Theming'
import styled from '@emotion/styled'
import { MouseEventHandler, useEffect, useState } from 'react'
import { selectFilename, useCurrentSelector } from '../../store'

interface SaveModalProps {
  isOpen: boolean
  onSave: (filename: string) => void
  onCancel: MouseEventHandler
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${dt.gap.md};
  padding: ${dt.padding.md};
`

const FilenameContainer = styled.div`
  display: flex;
  gap: ${dt.gap.sm};
  align-items: center;
`
const FilenameLabel = styled.label``
const FilenameInput = styled.input``

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const SaveModal = ({ isOpen, onSave, onCancel }: SaveModalProps) => {
  const originalFilename = useCurrentSelector(selectFilename)

  const [filename, setFilename] = useState(originalFilename ?? '')

  useEffect(() => {
    const filenameWithoutExtension = originalFilename?.split('.').slice(0, -1).join('')

    setFilename(filenameWithoutExtension ?? '')
  }, [originalFilename])

  return (
    <Modal isOpen={isOpen}>
      <ModalContainer>
        <Heading type='h1'>Save the image</Heading>
        <FilenameContainer>
          <FilenameLabel>Filename</FilenameLabel>
          <FilenameInput value={filename} onChange={(e) => setFilename(e.target.value)} />
        </FilenameContainer>
        <ButtonsContainer>
          <Button onClick={() => onSave(filename)}>Save</Button>
          <Button secondary onClick={onCancel}>
            Cancel
          </Button>
        </ButtonsContainer>
      </ModalContainer>
    </Modal>
  )
}

export { SaveModal }
export type { SaveModalProps }
