/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@models/messages'
import { ToastContainer, ToastCardContainer } from './styles'

export type ToastProps = {
  data: Alert;
}

const ToastCard = ({ data }: ToastProps): JSX.Element => {
  const [action, setAction] = useState<string>('show')
  const [display, setDisplay] = useState<boolean>(true)
  const [timer, setTimer] = useState<number>(0)

  useEffect(() => {
    const time: number = data.time || 5000
    let sum: number = 1
    const timerCoun: NodeJS.Timeout = setInterval(() => {
      setTimer(sum++)
      if (sum >= 105) {
        clearInterval(timerCoun)
      }
    }, (time / 105))
    setTimeout(() => {
      setAction('hide')
      clearInterval(timerCoun)
    }, time)
    setTimeout(() => {
      setDisplay(false)
    }, (time + 400))
  }, [])

  return (
    <Fragment>
      {display && (
        <ToastCardContainer className={`${data.style} ${action}`}>
          <div className="bar"><div style={{ width: `${timer}%` }} /></div>
          {data.icon && <img src={data.icon} alt={data.title} draggable={false} />}
          <h6>{data.title}</h6>
          <p>{data.message}</p>
        </ToastCardContainer>
      )}
    </Fragment>
  )
}

const Toast = (): JSX.Element => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const alert: Alert = useSelector(({ alert }: any): Alert => alert)

  useEffect(() => {
    if (alert) {
      setAlerts((oldAlert: Alert[]): Alert[] => [...oldAlert, alert])
    }
  }, [alert])

  return (
    <ToastContainer>
      {alerts.map((toast: Alert, index: number) => (
        <ToastCard key={index} data={toast} />
      ))}
    </ToastContainer>
  )
}

export default Toast
