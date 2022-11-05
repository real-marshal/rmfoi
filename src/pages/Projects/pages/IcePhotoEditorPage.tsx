import { Heading } from '@/components'
import { IcePhotoEditor } from '@/features/IcePhotoEditor'
import { dt } from '@/features/Theming'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: ${dt.gap.lg};
  padding: ${dt.padding.md};
`

const IcePhotoEditorPage = () => (
  <Container>
    <Heading type='h1'>Ice Photo Editor</Heading>
    <IcePhotoEditor />
  </Container>
)

export default IcePhotoEditorPage
