import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from 'styled-components'

export const theme = {
  fonts: {
    title: 'Roboto Slab',
    text: 'Roboto'
  },
  colors: {
    primary: '#FF7849',
    secondary: '#FF7849',
    dark: {
      black: '#1F2D3D',
      steel: '#273444',
      slate: '#3C4858',
      silver: '#8492A6',
    },
    snow: {
      normal: '#F9FAFC',
      dark: '#EFF2F7',
      extra: '#E5E9F2'
    },
    smoke: {
      normal: '#E0E6ED',
      dark: '#D3DCE6',
      extra: '#C0CCDA'
    },
    success: '#13CE66',
    warning: '#FFC82C',
    danger: '#FF4949',
    info: '#1FB6FF'
  }
}

const GlobalStyle: GlobalStyleComponent<any, DefaultTheme> = createGlobalStyle`
  * {    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  ::selection {
    background: ${theme.colors.dark.black};
    color: ${theme.colors.snow.normal};
  }

  body {
    background: ${theme.colors.snow.normal};
    color: ${theme.colors.dark.black};
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: ${theme.fonts.text}, sans-serif;

    & #root {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.title}, sans-serif;
  }
`

export default GlobalStyle
