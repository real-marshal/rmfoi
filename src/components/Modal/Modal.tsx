import { dt } from '@/features/Theming'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #555555aa;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
`

const ModalContent = styled.div`
  width: fit-content;
  min-width: max(20%, 200px);
  max-width: 90%;
  height: fit-content;
  min-height: max(20%, 100px);
  max-height: 90%;
  border: 1px solid ${dt.theme.primary};
  border-radius: 20px;
  z-index: ${dt.z.modal};
  background: ${dt.theme.background};
`

const Modal = ({ children, isOpen }: ModalProps) =>
  isOpen
    ? createPortal(
        <Container>
          <ModalContent>{children}</ModalContent>
        </Container>,
        document.body
      )
    : null

export { Modal }
export type { ModalProps }
