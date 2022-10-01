import { dt } from '@/features/Theming'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import { Emoji, emojisMap } from '../constants'
import { selectdEmojiStats, useCurrentSelector } from '../store'

interface EmojiStatisticsProps {
  isBusy: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const EmojiStat = styled.div`
  display: grid;
  grid-template-columns: 30px auto 20px;
`

const EmojiName = styled.span`
  color: white;
`

const EmojiSpan = styled.span`
  padding-right: 20px;
`

const EmojiWins = styled.span`
  color: #b1e9ff;
`

const Message = styled.span`
  color: white;
  text-transform: uppercase;
  margin-bottom: ${dt.margin.lg};
`

const EmojiStatistics = ({ isBusy }: EmojiStatisticsProps) => {
  const { wonEmojis, wonEmojisNumber, leftEmojis } = useCurrentSelector(selectdEmojiStats)

  useEffect(() => {
    if (leftEmojis === 0 && !isBusy) {
      // eslint-disable-next-line no-alert
      alert(
        'Did you really waste you time for this? Well, congratulations I guess. Maybe someday I will make this more of an event, but for now this is all you have for this great achievement.'
      )
    }
  }, [leftEmojis, isBusy])

  if (isBusy) return <Message>Let's see...</Message>

  return (
    <Container>
      <Message>
        {wonEmojisNumber} emojis won, {leftEmojis} left
      </Message>
      {(Object.entries(wonEmojis) as Array<[Emoji, number]>).map(([emoji, wins]) => (
        <EmojiStat key={emoji}>
          <EmojiSpan>{emoji}</EmojiSpan>
          <EmojiName>
            {'<'}
            {emojisMap[emoji]}
            {'>'}
          </EmojiName>
          <EmojiWins>{wins}</EmojiWins>
        </EmojiStat>
      ))}
    </Container>
  )
}

export { EmojiStatistics }
export type { EmojiStatisticsProps }
