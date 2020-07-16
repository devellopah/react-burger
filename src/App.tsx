import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Layout from  './hoc/Layout'
import BurgerBuilder from './containers/BurgerBuilder'
import Checkout from './containers/Checkout'
import Orders from './containers/Orders'
import Auth from './containers/Auth'
import Logout from './containers/Logout'
import { logInMaybe } from './store/actions'


interface IAppProps {
  logInMaybe: any,
}

class App extends Component<IAppProps> {

  componentDidMount() {
    this.props.logInMaybe()
  }

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/" component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default connect(null, { logInMaybe })(App)
