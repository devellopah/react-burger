import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from  './hoc/Layout'
import BurgerBuilder from './containers/BurgerBuilder'
import Checkout from './containers/Checkout'

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          {/* <BurgerBuilder />
          <Checkout /> */}
          <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/" component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default App
