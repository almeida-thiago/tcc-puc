import { ComponentType } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { isTokenValid, isAccessAllowed } from '@services/auth'

interface ProtectedRouteProps extends RouteProps {
  component: ComponentType;
  redirect?: string;
  permission: number[];
}

interface ProtectedContentProps {
  children: JSX.Element;
  permission: number[];
}

interface ProtectedValueProps {
  protectedValue: any;
  defaultValue?: any;
  permission: number[];
}

/**
 * Protected route
 * @param {ProtectedRouteProps} params
 * @returns {JSX.Element} protected route
 */
export const ProtectedRoute = ({ component: Component, redirect, permission = [], ...props }: ProtectedRouteProps): JSX.Element => {
  const accessAllowed: boolean = isAccessAllowed(permission)
  const validToken: boolean = isTokenValid()
  if (!redirect && !validToken) {
    redirect = '/sign-in'
  } else if (!redirect && !accessAllowed) {
    redirect = '/denied'
  }
  const render = (props: RouteProps): JSX.Element => {
    if (!accessAllowed || !validToken) {
      return <Redirect to={{ pathname: redirect, state: { from: props.location } }} />
    }
    return <Component {...props} />
  }
  return (
    <Route {...props} render={render} />
  )
}

/**
 * Protected content
 * @param {ProtectedContentProps} params
 * @returns {ReactNode} protected content or null
 */
export const ProtectedContent = ({ children, permission = [] }: ProtectedContentProps): JSX.Element | null => {
  const accessAllowed: boolean = isAccessAllowed(permission)
  return accessAllowed ? children : null
}

/**
 * Protected value
 * @param {ProtectedValueProps} params
 * @returns {any} protected value or default
 */
export const protectedValue = ({ permission, protectedValue, defaultValue = null }: ProtectedValueProps): any => {
  const accessAllowed: boolean = isAccessAllowed(permission)
  if (!accessAllowed) {
    return defaultValue
  }
  return protectedValue
}

/**
 * Protected action
 * @param {number[]} permission
 * @returns {boolean} true or false
 */
export const protectedAction = (permission: number[]): boolean =>
  isAccessAllowed(permission)