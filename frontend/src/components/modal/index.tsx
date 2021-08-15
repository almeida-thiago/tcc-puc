/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { H2 } from '@components/typography'
import { ModalProps } from './models'
import { ModalContainer, ModalBody } from './styles'

const Modal = ({ title, children, showAction, show = false, width, height, noPadding }: ModalProps): JSX.Element => {
  const [hideElement, setHideElement] = useState<boolean>(true)

  useEffect(() => {
    document.addEventListener('keyup', ({ keyCode }: KeyboardEvent) => {
      if (keyCode === 27) {
        showAction(false)
      }
    }, false)
  }, [])

  useEffect(() => {
    if (show) {
      setHideElement(false)
    } else if (!show) {
      setTimeout(() => {
        setHideElement(true)
      }, 1000)
    }
  }, [show])

  return !hideElement ? (
    <ModalContainer show={show}>
      <ModalBody title={title} show={show} noPadding={noPadding} width={width} height={height}>
        <header>
          {title && (<H2>{title}</H2>)}
          <button onClick={() => showAction(false)}>
            <FiX />
          </button>
        </header>
        <section>{children}</section>
      </ModalBody>
    </ModalContainer>
  ) : (<Fragment />)
}

export default Modal
