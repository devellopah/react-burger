import React from 'react';
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from '../Checkout/ContactData'

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

export interface ICheckoutProps {
  location: any,
  match: any,
  history: any,
}

export interface ICheckoutState {
  ingredients: { [k in Ingredient]: number },
}

export default class Checkout extends React.Component<ICheckoutProps> {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    price: '',
  }
  handleSummaryContinue = () => {
    this.props.history.push({ pathname: `${this.props.history.location.pathname}/contact-data` })
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients : { [k in Ingredient]?: number } = {}
    let price = null

    for(const [key, value] of query.entries()) {
      if(key === 'price') {
        price = value
      } else {
        ingredients[key as Ingredient] = +value
      }
    }
    this.setState({ingredients, price})
  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} clicked={this.handleSummaryContinue}/>
        <Route
          path={this.props.match.path + '/contact-data'}
          render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.price} history={this.props.history} />)}
        />
      </div>
    );
  }
}
