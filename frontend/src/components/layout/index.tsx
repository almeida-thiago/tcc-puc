import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiArrowLeftCircle, FiArrowRightCircle, FiBell } from 'react-icons/fi'
import { Notification } from '@models/messages'
import { HeaderProps, LayoutProps, MenuItem, MenuItemTop, NavProps, ContentLoadingProps } from './models'
import { LoadingContainer, HeaderContainer, MainContainer, NavContainer, PageContent } from './styles'

export { Column, Content } from './styles'

const Header = ({ children, collapse, collapseHander, logo }: HeaderProps): JSX.Element => {
  const history = useHistory()

  return (
    <HeaderContainer collapse={collapse}>
      <button onClick={() => collapseHander(!collapse)}><FiArrowRightCircle size="1.2rem" /></button>
      <img
        src={logo}
        alt="app logo"
        draggable={false}
        style={{ cursor: 'pointer' }}
        onClick={() => history.push('/')}
      />
      <ul>{children}</ul>
    </HeaderContainer>
  )
}

const Nav = ({ children, logo = undefined, collapse, collapseHander }: NavProps): JSX.Element => {
  const history = useHistory()

  return (
    <NavContainer>
      <div>
        <img
          src={logo}
          alt="app logo"
          draggable={false}
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/')}
        />
      </div>
      <ul>{children}</ul>
      <button onClick={() => collapseHander(!collapse)}><FiArrowLeftCircle size="1.2rem" /></button>
    </NavContainer>
  )
}

export const PageContentLoading = ({ background }: ContentLoadingProps): JSX.Element => (
  <LoadingContainer background={background}>
    <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="-22 0 100 100" enableBackground="new 0 0 0 0">
      <circle stroke="none" cx="6" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
      </circle>
      <circle stroke="none" cx="26" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
      </circle>
      <circle stroke="none" cx="46" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
      </circle>
    </svg>
  </LoadingContainer >
)

export const PageLayout = ({ children, menuState, menuActionHandler, logo, notifications, menuTop = [], mainMenu = [] }: LayoutProps): JSX.Element => {
  const history = useHistory()
  const [showNotifications, setShowNotification] = useState<boolean>(false)

  const notificationsCount = (notifications: Notification[]): JSX.Element | null => {
    const sum: number = notifications.length
    if (sum === 0) {
      return null
    }
    return (
      <p className="badge">{sum < 10 ? sum : '9+'}</p>
    )
  }

  return (
    <MainContainer navMenu={menuState} onClick={() => showNotifications && setShowNotification(false)}>
      <Header collapse={menuState} collapseHander={menuActionHandler} logo={logo}>
        {notifications && <li id="notifications" className={showNotifications ? 'active' : ''} onClick={() => setShowNotification((old: boolean) => !old)}>
          {notificationsCount(notifications)}
          <FiBell />
          {notifications.length ? (
            <dl id="notifications-list" className={showNotifications ? 'show' : 'hide'}>
              {notifications.map(({ title, message, page }: Notification, index: number) => (
                <div key={index} className={page && 'link'} onClick={() => page && history.push(page)}>
                  <dt>{title}</dt>
                  <dd>{message}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </li>}
        {menuTop.map(({ label, icon, subItem, disabled, action }: MenuItemTop, index: number): JSX.Element | null => disabled ? null : (
          <li key={index} onClick={action} className={subItem?.length ? 'has-subitem' : ''}>
            {icon ? icon : label}
            {subItem && (
              <ul>
                {subItem.map(({ label, icon, disabled, action }: MenuItem, index: number) => !disabled && (
                  <li key={index} onClick={action}>{icon && icon} {label}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </Header>
      <Nav logo={logo} collapse={menuState} collapseHander={menuActionHandler} >
        {mainMenu.map(({ label, icon, disabled, action }: MenuItem, index: number): JSX.Element | null => disabled ? null : (
          <li key={index} onClick={action}>
            {icon ? icon : label}
            {icon && (<span>{label}</span>)}
          </li>
        ))}
      </Nav>
      <PageContent>{children}</PageContent>
    </MainContainer >
  )
}
