import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { selectGeneralStats, useCurrentSelector } from '../store'

interface GeneralStatisticsProps {
  isBusy: boolean
}

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const Stat = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`
const StatName = styled.span`
  text-transform: uppercase;
  color: white;

  &::after {
    content: ': ';
  }
`
const StatValueSpan = styled.span`
  color: #b1e9ff;
`

const StatValue = ({ isBusy, children }: { isBusy: boolean; children: ReactNode }) => (
  <StatValueSpan>{isBusy ? '?' : children}</StatValueSpan>
)

const GeneralStatistics = ({ isBusy }: GeneralStatisticsProps) => {
  const stats = useCurrentSelector(selectGeneralStats)

  return (
    <>
      <StatsContainer>
        <Stat>
          <StatName>Pulls</StatName>
          <StatValue isBusy={isBusy}>{stats.pulls}</StatValue>
        </Stat>
        <Stat>
          <StatName>Wins</StatName>
          <StatValue isBusy={isBusy}>{stats.wins}</StatValue>
        </Stat>
        <Stat>
          <StatName>Loses</StatName>
          <StatValue isBusy={isBusy}>{stats.loses}</StatValue>
        </Stat>
        <Stat>
          <StatName>WR</StatName>
          <StatValue isBusy={isBusy}>{Math.round(stats.WR * 100)}%</StatValue>
        </Stat>
      </StatsContainer>
      <StatsContainer>
        <Stat>
          <StatName>Chance</StatName>
          <StatValue isBusy={isBusy}>{stats.chance}</StatValue>
        </Stat>
        <Stat>
          <StatName>Chance+</StatName>
          <StatValue isBusy={isBusy}>{stats.chanceIncrement}</StatValue>
        </Stat>
      </StatsContainer>
    </>
  )
}

export { GeneralStatistics }
export type { GeneralStatisticsProps }
