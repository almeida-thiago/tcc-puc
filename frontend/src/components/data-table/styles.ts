import styled from 'styled-components'

export const TableContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0.5rem;

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

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border-spacing: 0;

  & th, & td {
      padding: 0.5rem;
      white-space: nowrap;
  }

  & thead {
    background: ${({ theme }) => theme.colors.snow.normal}; 

    & td {
      padding: 1rem;
      background: ${({ theme }) => theme.colors.snow.dark}; 

      & div {
        display: flex;
        width: 100%;
        justify-content: flex-end;

        & h1 {
          text-transform: uppercase;
          flex: 1;
          margin: 0;
        }

        & input {
          margin: 0;
        }

        & .download {
            width: auto;
            margin-left: 1rem;
        }

        & button {
          padding: 0.25rem 0.5rem;
          margin: 0;

          & svg {
            width: 1rem;
            height: 1rem;
          }
          
          &.refresh {
            margin:0 1rem;
          }

          &.add {
            background: ${({ theme }) => theme.colors.dark.black}; 
            color: white;

            &:hover {
              transition: all ease-in-out 0.15s;
              background: ${({ theme }) => theme.colors.dark.steel}; 
            }

            &:active {
              transition: all ease-in-out 0.15s;
              background: ${({ theme }) => theme.colors.dark.slate}; 
            }
          }

          &:last-of-type {
            margin-right: 0;
          }
        }
      }

      @media(max-width: 430px) {
          height: 6.5rem;

          & div{
            top: 1rem;
            flex-direction: column-reverse;
            position: absolute;
            max-width: calc(100% - 2rem);

            & h1 {
              display: none;
            }

            & input, & button {
              margin: 0;
              margin-bottom: 0.5rem;
            }
          }
        }
    }

    & th > div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: ${({ theme }) => theme.fonts.text}, sans-serif;
      font-size: 1rem;
      font-weight: 400;

      & button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: 0.25rem;
        border-radius: 0.25rem;
        background: none;
        cursor: pointer;

        & svg {
          width: 1.2rem;
          height: 1.2rem;
        }

        &:disabled {
          color: ${({ theme }) => theme.colors.smoke.dark}; 
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          transition: all ease-in-out 0.15s;
          background: ${({ theme }) => theme.colors.snow.dark}; 
        }

        &:not(:disabled):active {
          transition: all ease-in-out 0.15s;
          background: ${({ theme }) => theme.colors.smoke.normal};
        }
      }
    }

    & tr:last-of-type th {
      border-bottom: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
      border-top: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
    }
  }

  & tfoot {
    background: ${({ theme }) => theme.colors.snow.normal}; 
    user-select: none;

    & tr td {
      border-top: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
    }

    & td {
      & div {
        display: flex;
        width: 100%;
        justify-content: space-between;

        & span {
          width: 5rem;
          padding: 0.25rem;
          font-family: ${({ theme }) => theme.fonts.text}, sans-serif;
          font-size: 1rem;

          &.pagination {
            flex: 1;
            padding: 0;
            display: flex;
            justify-content: center;
          }
        }

        & select {
          width: 5rem;
          font-size: 1rem;
          padding: 0.25rem;
          border-radius: 0.25rem;
          font-family: ${({ theme }) => theme.fonts.text}, sans-serif;
          border: none;
          background: none;
          cursor: pointer;

          &:hover {
            transition: all ease-in-out 0.15s;
            background: ${({ theme }) => theme.colors.snow.dark}; 
          }
        }

        & button {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          padding: 0.25rem;
          border-radius: 0.25rem;
          background: none;
          cursor: pointer;

          & svg {
            width: 1.2rem;
            height: 1.2rem;
          }

          &:disabled {
            color: ${({ theme }) => theme.colors.smoke.dark}; 
            cursor: not-allowed;
          }

          &:not(:disabled):hover {
            transition: all ease-in-out 0.15s;
            background: ${({ theme }) => theme.colors.snow.dark}; 
          }

          &:not(:disabled):active {
            transition: all ease-in-out 0.15s;
            background: ${({ theme }) => theme.colors.smoke.normal};
          }
        }
      }
    }
  }

  & tbody {    
    & tr:not(.no-data,.loading ):nth-child(even){
      background: ${({ theme }) => theme.colors.snow.normal};
    }

    & tr:not(.no-data,.loading ):hover {
      background: ${({ theme }) => theme.colors.snow.dark};
    }

    & tr td { 
      white-space: pre-line;
    }

    & tr td.actions { 
      white-space: nowrap;

      & button {
        display: inline-block;
        border: none;
        padding: 0.25rem;
        margin: 0 0.25rem;
        border-radius: 0.25rem;
        background: ${({ theme }) => theme.colors.snow.dark}; 
        cursor: pointer;

        & svg {
          width: 1rem;
          height: 1rem;
        }

        &:disabled {
          color: ${({ theme }) => theme.colors.smoke.dark}; 
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          transition: all ease-in-out 0.15s;
          background: ${({ theme }) => theme.colors.snow.dark}; 
        }

        &:not(:disabled):active {
          transition: all ease-in-out 0.15s;
          background: ${({ theme }) => theme.colors.smoke.normal};
        }
      }
    }

    & tr.loading  td {
      text-align: center;
      cursor: wait;
      
      & svg {
        width: 5rem;
        fill: ${({ theme }) => theme.colors.dark.black}; 
      }
    }
  }
`