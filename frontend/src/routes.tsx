import { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ProtectedRoute } from '@utils/security'
import { PageContentLoading } from '@components/layout'

const NotFound = lazy(() => import('@pages/not-found'))
const Denied = lazy(() => import('@pages/denied'))
const SignUp = lazy(() => import('@pages/authentication/sign-up'))
const SignIn = lazy(() => import('@pages/authentication/sign-in'))
const ForgotPassword = lazy(() => import('@pages/authentication/forgot-password'))
const ChangePassword = lazy(() => import('@pages/authentication/change-password'))
const Home = lazy(() => import('@pages/home'))
const Ticket = lazy(() => import('@pages/helpdesk/ticket'))

const Routes = (): JSX.Element => (
  <Suspense fallback={PageContentLoading}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route exact path="/denied" component={Denied} />
        <Route path="/ticket/:id/:user" component={Ticket} />
        <ProtectedRoute
          path="/"
          redirect="/sign-in"
          permission={[]}
          component={Home}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Suspense>
)

export default Routes