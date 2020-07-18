import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from  './hoc/Layout'
import BurgerBuilder from './containers/BurgerBuilder'
import Checkout from './containers/Checkout'
import Orders from './containers/Orders'
import Auth from './containers/Auth'
import Logout from './containers/Logout'
import { logInMaybe } from './store/actions'
import { AppState } from './store'


interface IAppProps {
  logInMaybe: any,
  isAuth: boolean,
}

class App extends Component<IAppProps> {

  componentDidMount() {
    this.props.logInMaybe()
  }

  getRoutes = () => {
    return this.props.isAuth
    ? (
        <Switch>
          <Route exact path="/" component={BurgerBuilder}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Redirect to="/"/>
        </Switch>
      )
    : (
      <Switch>
        <Route exact path="/" component={BurgerBuilder}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Redirect to="/"/>
      </Switch>
    )
  }

  render() {
    return (
      <Router>
        <Layout>
          {this.getRoutes()}
        </Layout>
      </Router>
    )
  }
}

export default connect(
  (state:AppState) => ({ isAuth: state.auth.idToken !== null }),
  { logInMaybe }
)(App)
