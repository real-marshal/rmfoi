import { Card, Heading } from '@/components'
import styled from '@emotion/styled'
import EmojiSlotMachineVideoLight from '@/assets/emoji-slot-machine-light.mp4'
import EmojiSlotMachineVideoDark from '@/assets/emoji-slot-machine-dark.mp4'
import { useAppSelector } from '@/app/store'
import { dt, selectActualTheme } from '@/features/Theming'
import { ThemeValue } from '@/features/Theming/constants'
import IcePhotoEditorScreenshot from '@/assets/ice-photo-editor.png'
export interface ProjectData {
  name: string
  description: string
  link: string
  mediaType: 'image' | 'video'
  source:
    | {
        dark: string
        light: string
      }
    | string
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
    mediaType: 'video',
    source: {
      dark: EmojiSlotMachineVideoDark,
      light: EmojiSlotMachineVideoLight,
    },
  },
  {
    name: 'Ice Photo Editor',
    description:
      'Edit photos right in your browser. Very basic and works like shit, especially on mobile devices as it really needs some performance optimizations.',
    link: 'ice-photo-editor',
    mediaType: 'image',
    source: IcePhotoEditorScreenshot,
  },
]

const Projects = () => {
  const theme = useAppSelector(selectActualTheme)

  return (
    <Container>
      <Heading type='h1'>Projects</Heading>
      <Cards>
        {projectsData.map(({ mediaType, source, ...projectData }, ind) => {
          const isMediaThemed = typeof source !== 'string'
          const sourceString = isMediaThemed
            ? theme === ThemeValue.DARK
              ? source.dark
              : source.light
            : source

          return <Card key={ind} media={mediaType} src={sourceString} {...projectData} />
        })}
      </Cards>
    </Container>
  )
}

export { Projects }
