import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from  './hoc/Layout'
import BurgerBuilder from './containers/BurgerBuilder'
import Checkout from './containers/Checkout'
import Orders from './containers/Orders'
import Auth from './containers/Auth'
import Logout from './containers/Logout'


class App extends Component {
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

export default App
