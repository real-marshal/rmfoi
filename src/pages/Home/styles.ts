import { dt, dtValues, ThemeSwitcher } from '@/features/Theming'
import styled from '@emotion/styled'
import wavesMobile from '@/assets/waves-mobile.svg'
import { NavLink } from 'react-router-dom'

export const Container = styled.div`
  background: ${dt.theme.background};
  display: flex;
  flex-direction: column;
  gap: ${dt.gap.lg};
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LogoWrapper = styled.div`
  width: 100%;
  height: fit-content;
  background: ${dt.colors.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
  &::after {
    content: url(${wavesMobile});
    display: block;
    width: 100%;
    background: ${dt.theme.background};
  }
`

export const LogoImg = styled.img`
  width: clamp(240px, 70vw, 300px);
  margin-top: 4vh;
`

export const LogoTitle = styled.h1`
  font-family: 'Sedgwick Ave Display';
  position: relative;
  font-size: 2.5rem;
  color: #b2e2d8;
  text-shadow: 4px 4px 4px #097382;
  margin: 0;
  margin-top: 20px;
`

export const LogoSubtitle = styled.span`
  font-family: 'Mansalva';
  font-size: 0.6em;
  position: absolute;
  left: -1.2em;
  top: -2rem;
  color: ${dt.colors.light};
`

export const StyledThemeSwitcher = styled(ThemeSwitcher)`
  align-self: flex-end;
  margin-right: clamp(20px, 5vw, 100px);
  position: relative;
  top: 10px;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${dt.gap.lg};
  align-items: center;
`

export const StyledNavLink = styled(NavLink)`
  font-family: 'Swanky and Moo Moo';
  font-size: 2.5rem;
  text-decoration: none;
  color: ${dt.theme.primary};
  border: 2px solid ${dt.theme.primary};
  width: fit-content;
  min-width: 13ch;
  padding: 0.5rem 2rem;
  border-radius: 15px;
  text-align: center;

  &:hover,
  &.active {
    background: ${dt.theme.primary};
    color: ${dt.theme.background};
  }
`

export const Footer = styled.footer`
  background: ${dt.colors.dark};
  color: ${dt.theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  overflow: hidden;

  &::before {
    content: url(${wavesMobile});
    // Fix stupid border when this is transformed in chrome (isn't everything supposed to work in chrome lol?)
    will-change: transform;
    transform: rotate(180deg) scaleX(140%);
    display: block;
    width: 100%;
    background: ${dt.theme.background};
  }
`

export const FooterText = styled.p`
  color: ${dt.colors.light};
  margin: 0.25rem;
  font-size: 0.8rem;
  display: block;

  &:first-of-type {
    margin-top: 20px;
  }
`

export const Main = styled.main`
  @media ${dtValues.mq.big} {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 100px;
    margin: 0 100px;
  }
`
