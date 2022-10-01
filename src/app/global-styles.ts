import { css } from '@emotion/react'
import SedgwickWoff from '@/assets/fonts/sedgwickavedisplay-regular-webfont.woff'
import SedgwickWoff2 from '@/assets/fonts/sedgwickavedisplay-regular-webfont.woff2'
import MansalvaWoff from '@/assets/fonts/mansalva-regular-webfont.woff'
import MansalvaWoff2 from '@/assets/fonts/mansalva-regular-webfont.woff2'
import SwankyWoff from '@/assets/fonts/swankyandmoomoo-regular-webfont.woff'
import SwankyWoff2 from '@/assets/fonts/swankyandmoomoo-regular-webfont.woff2'

export const globalStyles = css`
  @font-face {
    font-family: 'Sedgwick Ave Display';
    src: url(${SedgwickWoff2}) format('woff2'), url(${SedgwickWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Mansalva';
    src: url(${MansalvaWoff2}) format('woff2'), url(${MansalvaWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Swanky and Moo Moo';
    src: url(${SwankyWoff2}) format('woff2'), url(${SwankyWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;

    a {
      text-decoration: none;
    }
  }
`
