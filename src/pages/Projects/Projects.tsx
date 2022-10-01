import { Card, Heading } from '@/components'
import styled from '@emotion/styled'
import EmojiSlotMachineVideoLight from '@/assets/emoji-slot-machine-light.mp4'
import EmojiSlotMachineVideoDark from '@/assets/emoji-slot-machine-dark.mp4'
import { useAppSelector } from '@/app/store'
import { dt, selectActualTheme } from '@/features/Theming'
import { ThemeValue } from '@/features/Theming/constants'

export interface ProjectData {
  name: string
  description: string
  link: string
  video: {
    dark: string
    light: string
  }
}

const Container = styled.div`
  padding: ${dt.padding.lg};
  display: flex;
  flex-direction: column;
  gap: ${dt.gap.lg};
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  gap: ${dt.gap.md};
`

const projectsData: ProjectData[] = [
  {
    name: 'Emoji Slot Machine',
    description: 'Time to find out whether you are a loser or a gigachad.',
    link: 'emoji-slot-machine',
    video: {
      dark: EmojiSlotMachineVideoDark,
      light: EmojiSlotMachineVideoLight,
    },
  },
  {
    name: 'Simple Photo Editor',
    description: 'Edit photos right in your browser',
    link: 'simple-photo-editor',
    video: {
      dark: EmojiSlotMachineVideoDark,
      light: EmojiSlotMachineVideoLight,
    },
  },
]

const Projects = () => {
  const theme = useAppSelector(selectActualTheme)

  return (
    <Container>
      <Heading type='h1'>Projects</Heading>
      <Cards>
        {projectsData.map(({ video, ...projectData }, ind) => (
          <Card
            key={ind}
            media='video'
            src={theme === ThemeValue.DARK ? video.dark : video.light}
            {...projectData}
          />
        ))}
      </Cards>
    </Container>
  )
}

export { Projects }
