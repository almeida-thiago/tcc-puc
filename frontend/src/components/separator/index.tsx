import styled from 'styled-components'

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #C0CCDA;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: .025rem solid #C0CCDA;
  }

  &:not(:empty)::before {
    margin-right: .25rem;
  }

  &:not(:empty)::after {
    margin-left: .25rem;
  }
`

export default Separator
