import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import lightenDarkenColor from '@utils/lighten-darken-color'
import { ContainerProps, HeaderContainerProps, ColumnProps, ContentProps, ContentLoadingProps } from './models'

const calculateCols = (cols: number): string => {
  let colsString: string = '1fr'
  for (let col = 1; col < cols; col++) {
    colsString = `${colsString} 1fr`
  }
  return colsString
}

const renderContent = (props: ContentProps): FlattenSimpleInterpolation => {
  if (props.type === 'flex') {
    return css`
      position: relative;
      display: flex;
      width: 100%;
      min-height: 100%;
      flex-direction: ${props.direction ? props.direction : 'column'};
      ${props.margin ? css`
        padding: 1.5rem;
      ` : css``}
      ${props.centerContent ? css`
        justify-content: center;
        align-items: center;
      ` : css``}
    `
  }
  return css`
    display: grid;
    ${props.gap && props.margin ? css`padding: 1.2rem;` : css``}
    ${props.gap ? css`grid-gap: 1.2rem;` : css``}
    grid-template-columns: ${props.cols ? calculateCols(props.cols) : `auto`};
    grid-template-rows: ${props.rows ? calculateCols(props.rows) : `auto`};
    min-height: ${props.full ? '100%' : 'auto'};
    box-sizing: border-box;
  `
}

export const MainContainer = styled.main<ContainerProps>`
  display: grid;
  height: 100%;
  grid-template:
    'nav header'
    'nav content';
  grid-template-rows: 3rem 1fr;
  grid-template-columns: 5rem 1fr;
  transition: all 1s;
  ${({ navMenu }: ContainerProps): FlattenSimpleInterpolation => navMenu ? css`
    width: 100%;
    ` : css`
      transform: translate(-5rem);
      width: calc(100% + 5rem);
    `}
`

export const HeaderContainer = styled.header<HeaderContainerProps>`
grid-area: header;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
border-bottom: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
background: #FFFFFF;

&>ul {
  margin-right: 1.5rem;
  list-style: none;

  &>li {
    position: relative;
    display: inline-block;
    padding: 0.5rem;
    font-weight: 600;
    justify-content: center;
    align-content: center;
    border-radius: 0.25rem;
    user-select: none;
    cursor: pointer;

    &:hover {
      transition: all ease-in-out 0.15s;
      background: ${({ theme }) => theme.colors.snow.dark}; 
    }

    &:not(.has-subitem):active {
      transition: all ease-in-out 0.15s;
      background: ${({ theme }) => theme.colors.snow.normal};
    }

    &>ul {
        display: none;
        list-style: none;
        top: 2rem;
        right: 0;
        position: absolute;
        border-radius: 0.25rem;
        border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
        background: #FFFFFF;
        box-shadow: 0 2px 8px rgb(31 45 61 / 15%);
        z-index: 100;

        & li { 
          display: flex;
          align-items: center;
          padding: 0.8rem;
          font-size: small;
          white-space: nowrap;
          border-bottom: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;

          & svg {
            margin-right: 0.25rem;
          }

          &:hover {
            transition: all ease-in-out 0.15s;
            background: ${({ theme }) => theme.colors.snow.dark}; 
          }

          &:active {
            transition: all ease-in-out 0.15s;
            background: ${({ theme }) => theme.colors.snow.normal};
          }
        }
      }

      &:hover ul {
        display: block;
      }

    &#notifications {
      position: relative;

      & #notifications-list {
        top: 2rem;
        right: 0;
        width: 15rem;
        position: absolute;
        border-radius: 0.25rem;
        border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
        background: #FFFFFF;
        box-shadow: 0 2px 8px rgb(31 45 61 / 15%);
        z-index: 100;

        &>div {
          cursor: default;
          transition: all ease-in-out 0.15s;

          &.link {
            &:hover {
              transition: all ease-in-out 0.15s;
              background: ${({ theme }) => theme.colors.snow.dark}; 
            }

            &:active {
              transition: all ease-in-out 0.15s;
              background: ${({ theme }) => theme.colors.snow.normal};
            }
            cursor: pointer;
          }
        }

        & dt,
        dd {
          padding: 0.5rem;
          font-size: small;
        }

        & dt {
          padding-bottom: 0;
        }

        & dd {
          padding-top: 0;
          font-weight: normal;
          border-bottom: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
        }

        &.show {
          display: block;
        }

        &.hide {
          display: none;
        }
      }


      & .badge {
        position: absolute;
        top: 0.1rem;
        right: 0.05rem;
        background: ${({ theme }) => theme.colors.danger};
        color: #FFFFFF;
        width: 1rem;
        height: 1rem;
        padding: 0.2rem;
        border-radius: 1rem;
        text-align: center;
        font-size: xx-small;
        font-weight: bold;
        transform: scale(0.9);
        box-shadow: 0 2px 8px rgb(31 45 61 / 15%);
      }

      &.active {
        transition: all ease-in-out 0.15s;
        background: ${({ theme }) => theme.colors.snow.dark}; 
        color: ${({ theme }) => theme.colors.dark.black}; 
      }
    }
  }
}

& img {
  height: 1.5rem;
  margin-left: 1rem;
  transition: all ease-in-out 1s;
  ${({ collapse }: HeaderContainerProps): FlattenSimpleInterpolation => collapse ? css`
    transform: translateY(-2.5rem);
  ` : css``}
}

& button {
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.dark.black};
  background: none;
  border: none;
  cursor: pointer;
  transition: all ease-in-out 1s;
  ${({ collapse }: HeaderContainerProps): FlattenSimpleInterpolation => collapse ? css`
    transform: translate(-10rem);
  ` : css``}

  &:hover {
    transition: all ease-in-out 0.15s;
    color: ${({ theme }) => theme.colors.dark.silver}; 
  }

  &:active {
    transition: all ease-in-out 0.15s;
    color: ${({ theme }) => theme.colors.smoke.extra};
  }
}
`

export const NavContainer = styled.nav`
  grid-area: nav;
  background-color: ${({ theme }) => theme.colors.dark.black};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.snow.normal};

  &>div {
    height: 3rem;
    padding: 0.8rem;
    display: flex;
    justify-content: center;
    align-content: center;
    user-select: none;

    & img {
      max-width: 100%;
      max-height: 100%;
      filter: grayscale(100)  brightness(100);
    }
  }

  & li {
    position: relative;
    padding: 0.8rem;
    display: flex;
    font-weight: 600;
    justify-content: center;
    align-content: center;
    user-select: none;
    cursor: pointer;

    & svg {
      height: 1.2rem;
      width: 1.2rem;
    }

    & span {
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;
      font-size: small;
      top: 0rem;
      left: 4rem;
      padding: 0.5rem;
      padding-left: 0;
      padding-right: 2.5rem;
      height: 2.8rem;
      color: #FFFFFF;
      background: ${({ theme }) => theme.colors.dark.steel}; 
      box-shadow: 0 2px 8px rgb(31 45 61 / 25%);
      border-radius: 0.25rem;
      z-index: 50;
    }

    &:hover span {
      display: flex;
    }

    &:active span {
      background: ${({ theme }) => theme.colors.dark.slate}; 
    }

    &:hover {
      background: ${({ theme }) => theme.colors.dark.steel}; 
    }

    &:active {
      background: ${({ theme }) => theme.colors.dark.slate}; 
    }
  }

  & button {
    padding: 0.8rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => lightenDarkenColor(theme.colors.dark.black, 15)}; 
    }

    &:active {
      background: ${({ theme }) => lightenDarkenColor(theme.colors.dark.black, 25)}; 
    }
  }
`

export const PageContent = styled.section`
  grid-area: content;
  height: calc(100vh - 3rem);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;

    &-track {
      background: ${({ theme }) => theme.colors.smoke.normal};
    }

    &-thumb {
      background: ${({ theme }) => theme.colors.smoke.extra};
      
      &:hover {
        background: ${({ theme }) => theme.colors.smoke.extra};
      }
    }
  }
`

export const LoadingContainer = styled.div<ContentLoadingProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ background, theme }) => background ? background : theme.colors.snow.normal};
  width: 100%;
  height: 100%;

  & svg {
    width: 5rem;
    fill: ${({ theme }) => theme.colors.dark.black}; 
  }
`

export const Column = styled.div<ColumnProps>`
  ${({ colStart }: ColumnProps): FlattenSimpleInterpolation => colStart ? css`grid-column-start: ${colStart}` : css``};
  ${({ colEnd }: ColumnProps): FlattenSimpleInterpolation => colEnd ? css`grid-column-end: ${colEnd + 1}` : css``};
  ${({ rowStart }: ColumnProps): FlattenSimpleInterpolation => rowStart ? css`grid-row-start: ${rowStart}` : css``};
  ${({ rowEnd }: ColumnProps): FlattenSimpleInterpolation => rowEnd ? css`grid-row-end: ${rowEnd + 1}` : css``};
`

export const Content = styled.div<ContentProps>`${renderContent}`
