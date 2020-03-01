import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import _get from 'lodash/get'

import SignIn from 'components/SignIn'
import SignUp from 'containers/SignUp'
import MainLayout from 'containers/MainLayout'


const EmptyComponent = () => (null)
export const DashboardRoutes = () => (
  <Switch>
    <Route path={'/dashboard'} exact component={DashboardPage} />
  </Switch>
)

export const ClaimRoutes = () => (
  <Switch>
    <Route path={'/claims'} exact component={ClaimsPage} />
    <Route path={'/claims/:id'} component={ClaimsDetailPage} />
  </Switch>
)

export const VoucherRoutes = () => (
  <Switch>
    <Route path={'/vouchers'} exact component={VouchersPage} />
    <Redirect to={'/vouchers'} />
  </Switch>
)

class Routes extends React.Component {
  state = {
    loaded:          false,
    isAuthenticated: false, // FALSE when login is completely implemented....
    authArtifacts:   {},
  }

  componentDidMount() {
    this.authenticate()
  }

  authenticate() {
    certainCallToAuthenticationService
      .then((data) => {
        const authArtifacts = {
          sub:      _get(data, 'attributes.sub'),
          email:    _get(data, 'attributes.email'),
          username: _get(data, 'username'),
        }
        this.setState({ loaded: true, isAuthenticated: true, authArtifacts })
      })
      .catch(() => { this.setState({ loaded: true, isAuthenticated: false }) })
  }

  render() {
    const { loaded, isAuthenticated, authArtifacts } = this.state    
    if (!loaded) return null

    if (isAuthenticated) {
      return (
        <MainLayout>
          <Switch>
            <Route path={'/dashboard'} component={DashboardRoutes} />
            <Route path={'/claims'} component={ClaimRoutes} />
            <Route path={'/vouchers'} component={VoucherRoutes} />
            <Route path={'/users'} component={UserRoutes} />
            <Route path={'/vendors'} component={VendorRoutes} />
            <Route path={'/carriers'} component={CarrierRoutes} />
            <Redirect to={'/dashboard'} />
          </Switch>
        </MainLayout>
      )
    }

    return (
      <Switch>
        <Route
          path={'/login'}
          render={(props) => (
            <Authenticator
              onStateChange={(authState) => {
                authState = 'signedIn'
                if (authState === 'signedIn') {
                  this.setState({ isAuthenticated: true })
                  const {
                    history,
                  } = props
                  history.push('/home')
                }
              }}
              hide={[Greetings, AmplifySignIn]}
            >
              <SignIn />
              <EmptyComponent />
            </Authenticator>
          )}
        />
        <Route path={'/signup/:activation_code'} component={SignUp} />
        <Redirect to={'/login'} />
      </Switch>
    )
  }
}

export default Routes
