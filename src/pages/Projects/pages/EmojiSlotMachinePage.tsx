import { Heading } from '@/components'
import { EmojiSlotMachine } from '@/features/EmojiSlotMachine'
import { dt } from '@/features/Theming'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: ${dt.gap.lg};
`

const EmojiSlotMachinePage = () => (
  <Container>
    <Heading type='h1'>Emoji Slot Machine</Heading>
    <EmojiSlotMachine />
  </Container>
)

export { EmojiSlotMachinePage }
