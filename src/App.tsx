import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from  './hoc/Layout'
// import BurgerBuilder from './containers/BurgerBuilder'
// import Checkout from './containers/Checkout'
// import Orders from './containers/Orders'
// import Auth from './containers/Auth'
// import Logout from './containers/Logout'
import { logInMaybe } from './store/actions'
import { AppState } from './store'

const BurgerBuilder = lazy(() => import('./containers/BurgerBuilder'))
const Checkout = lazy(() => import('./containers/Checkout'))
const Orders = lazy(() => import('./containers/Orders'))
const Auth = lazy(() => import('./containers/Auth'))
const Logout = lazy(() => import('./containers/Logout'))

interface IAppProps {
  logInMaybe: any,
  isAuth: boolean,
}

class App extends Component<IAppProps> {

  componentDidMount() {
    this.props.logInMaybe()
  }

  render() {
    const { isAuth } = this.props;
    return (
      <Router>
        <Layout>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Switch>
              {isAuth && <Route path="/logout" component={Logout} />}
              <Route path="/auth" component={Auth} />
              {isAuth && <Route path="/checkout" component={Checkout} />}
              {isAuth && <Route path="/orders" component={Orders} />}
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Layout>
      </Router>

    );
  }
}

export default connect(
  (state:AppState) => ({ isAuth: state.auth.idToken !== null }),
  { logInMaybe }
)(App)
