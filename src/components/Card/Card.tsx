import { dt } from '@/features/Theming'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Heading } from '../Heading'

interface CardProps {
  name: string
  description: string
  media: 'image' | 'video'
  src: string
  link?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  color: ${dt.theme.primary};
  background-color: ${dt.theme.background};
  border: 3px solid ${dt.theme.primary};
  border-radius: 10px;

  & > :not(img, a) {
    padding: ${dt.padding.lg};
  }
`

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`

const Video = styled.video`
  width: 100%;
  border-radius: 10px;
`

const Description = styled.p`
  margin: 0;
  font-size: 1.2rem;
`

const StyledHeading = styled(Heading)`
  padding: ${dt.padding.lg};
  background: ${dt.theme.gradientGreenBlue};
  border-radius: 10px 10px 0 0;
  border-bottom: 3px solid ${dt.theme.primary};
  font-size: 1.25rem;
`

const Card = ({ name, description, media, src, link }: CardProps) => {
  const heading = (
    <StyledHeading type='h3' underline={false}>
      {name}
    </StyledHeading>
  )
  return (
    <Container>
      {link ? <Link to={link}>{heading}</Link> : heading}
      <Description>{description}</Description>
      {media === 'image' && <Image src={src} alt={`${name} overview`} />}
      {media === 'video' && <Video src={src} autoPlay loop muted playsInline />}
    </Container>
  )
}

export { Card }
export type { CardProps }
