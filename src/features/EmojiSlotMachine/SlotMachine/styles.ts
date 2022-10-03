import styled from '@emotion/styled'
import { dt } from '@/features/Theming'
import { css, keyframes } from '@emotion/react'
import type { PullState } from './SlotMachine'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: ${dt.gap.sm};
  border: 4px solid ${dt.theme.primary};
  padding: ${dt.padding.lg};
  border-radius: 10px;
  background: linear-gradient(100deg, #0095ff 50%, #1457a9 100%);
`

export const Columns = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
  gap: ${dt.gap.sm};
`

export const emojiHeight = 60

export const Column = styled.div<{ elementsInColumn: number }>`
  padding: 0 ${dt.padding.lg};
  border: 2px solid ${dt.colors.dark};
  border-radius: 10px;
  height: ${({ elementsInColumn }) => elementsInColumn * emojiHeight}px;
  overflow: hidden;
  background: linear-gradient(90deg, #777 2%, white 20%, white 80%, #777 98%);
`

export const EmojiElement = styled.div`
  font-size: 3rem;
  height: ${emojiHeight}px;
`

export const centerRowAnimation = keyframes`
from, to {
  border-color: #df4040;
  background: #aa1eac4d;
}

20% {
  border-color: #aee409;
  background: #ac1e1e4d;
}

40% {
  border-color: #12cfcb;
  background: #1eac234d;
}

80% {
  border-color: #e23bcf;
  background: #1ea0ac4d;
}
`

export const wonEmojiAnimation = keyframes`
from {
  opacity: 1;
}

80% {
  transform: scale(1000%) rotate(360deg);
  filter: blur(1px);
  visibility: hidden;
}

to {
  opacity: 0;
}
`

export const centerRowTextAnimation = keyframes`
  from, to {
  transform: scale(100%);
  opacity: 1;
}

50% {
  transform: scale(200%);
}
`

export const CenterRowOverlay = styled.div<{ pullState: PullState }>`
  position: absolute;
  width: 110%;
  height: ${emojiHeight * 1.5}px;
  top: calc(50% - ${(emojiHeight * 1.5) / 2}px);
  left: -5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  -webkit-text-stroke: 1px ${dt.colors.dark};
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
  // Default fonts are variable on some platforms (iOS) which breaks -webkit-text-stroke
  font-family: 'Helvetica';

  ${({ pullState }) =>
    pullState.status === 'won' &&
    css`
      border: 4px solid red;
      border-radius: 10px;
      animation: ${centerRowAnimation} 1s infinite;
      background: #ac1e1e4d;

      &::before {
        content: '${pullState.wonEmoji}';
        opacity: 0;
        position: absolute;
        width: 50px;
        height: 50px;
        top: calc(50% - 25px);
        left: calc(50% - 25px);
        animation: ${wonEmojiAnimation} 3s;
      }

      & > span {
        background-image: radial-gradient(red 40%, #d4da18);
        background-clip: text;
        text-fill-color: transparent;
        opacity: 0;
        animation: ${centerRowTextAnimation} 1s infinite 1.25s;
      }
    `}

  ${({ pullState }) =>
    pullState.status === 'lost' &&
    css`
      border-radius: 10px;
      top: 0;
      width: 100%;
      left: 0;
      height: 100%;
      background: radial-gradient(#ff000085, #ffffff85 150%);
      border: 2px solid ${dt.colors.dark};
      font-size: 3rem;
    `}
`

export const PullButton = styled.button`
  text-transform: uppercase;
  font-weight: bold;
  background: #df451b;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 60px;
  font-size: 1.2rem;
  border: 2px solid ${dt.colors.dark};

  &:hover {
    background: #df2222;
  }

  &:disabled {
    cursor: default;
    background: #aaa;
  }
`

export const ModesContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const ModeButton = styled.button<{ selected: boolean }>`
  padding: ${dt.padding.sm} ${dt.padding.lg};
  border-radius: 5px;
  border: 2px solid ${dt.colors.dark};
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background: #fbdc00;
  }

  &:disabled {
    cursor: default;
    background: #aaa;
  }

  ${({ selected }) =>
    selected &&
    css`
      background: #fbdc00;
    `}
`
