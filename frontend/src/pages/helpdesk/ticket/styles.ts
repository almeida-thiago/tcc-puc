import styled from 'styled-components'

export const TicketContainer = styled.div`
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`

export const TicketHead = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;

  & h2 {
    font-family: ${({ theme }) => theme.fonts.text};
    text-align: left;
    font-size: medium;
    text-transform: capitalize;
    width: 100%;
  }

  & div {
    display: flex;
    width: 100%;

    & p {
      flex: 1;
      font-size: small;
      font-weight: 600;
      text-transform: capitalize;

      &:last-of-type {
        text-align: right;
      }
    }
    
  }
`

export const TicketBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .messages-container {
    position: relative;
    flex: 1;

    & ul {
      position: absolute;
      max-height: 100%;
      width: 100%;
      align-self: stretch;
      overflow-y: auto;
      list-style: none;
      padding-top: 1rem;

      & li {
        position: relative;
        margin: 1rem;
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
        width: fit-content;
        max-width: calc(100% - 2rem);

        & a {
          color: ${({ theme }) => theme.colors.dark.slate};
          text-decoration: none;

          & span {
            display: flex;
            align-content: center;
            margin: 0.25rem;

            & svg {
              margin-right: 0.25rem;
            }
          }

          & img {
            max-width: 100%;
            border-radius: 0.25rem;
            margin: 0.25rem 0;
            padding: 0.5rem;
            background-color: white;
            border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
          }

          &:hover{
            color: ${({ theme }) => theme.colors.dark.silver};
          }
        }


        & p {
          white-space: pre-wrap;

          & small {
            display: block;
            font-size: x-small;
            margin-top: 0.5rem;
            text-align: right;
          }
        }

        &.agent {
          background: ${({ theme }) => theme.colors.snow.dark};
          margin-right: auto;
        }

        &.person {
          background: ${({ theme }) => theme.colors.snow.normal};
          margin-left: auto;
        }
      }

      &::-webkit-scrollbar {
        width: 0.25rem;

          &-track {
          background: white;
        }

          &-thumb {
          background: ${({ theme }) => theme.colors.smoke.extra};
            
            &:hover {
            background: ${({ theme }) => theme.colors.smoke.extra};
          }
        }
      }
    }
  }

  & .input-container {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;

    & textarea {
      flex: 1;
      margin-right: 1rem;
      font-family: ${({ theme }) => theme.fonts.text}, sans-serif;
      padding: 0.5rem;
      resize: none;
      border-radius: 0.25rem;
      border: ${({ theme }) => theme.colors.smoke.normal} solid 0.025rem;
      background: #FFFFFF;
      box-shadow: none;
      transition: all ease-in-out 0.25s;

      &:focus{
        transition: all ease-in-out 0.25s;
        box-shadow: 0 2px 8px rgb(31 45 61 / 5%);
        border: ${({ theme }) => theme.colors.smoke.extra}  solid 0.025rem;
      }
    }

    & button {
      padding: 0.5rem 1rem;
      background: ${({ theme }) => theme.colors.dark.black}; 
      margin: 0;
      color: white;

      & svg {
        width: 1.2rem;
        height: 1.2rem;
      }

      &:hover {
        transition: all ease-in-out 0.15s;
        background: ${({ theme }) => theme.colors.dark.steel}; 
      }

      &:focus {
        transition: all ease-in-out 0.15s;
        outline: 0.025rem ${({ theme }) => theme.colors.dark.steel} dashed;
      }

      &:active {
        transition: all ease-in-out 0.15s;
        background: ${({ theme }) => theme.colors.dark.slate}; 
      }
    }
  }
`

export const HelpdeskNav = styled.nav`
  display: flex;
  & button {
    flex: 1;
    margin-top: 0;
    margin-bottom: 0;

    &.active {
      background: ${({ theme }) => theme.colors.dark.black}; 
      color: white;
    }

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`
