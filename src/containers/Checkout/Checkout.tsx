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
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }
  handleSummaryContinue = () => {
    this.props.history.push({ pathname: `${this.props.history.location.pathname}/contact-data` })
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients : { [k in Ingredient]?: number } = {}

    for(const [key, value] of query.entries()) {
      ingredients[key as Ingredient] = +value
    }
    this.setState({ingredients})
  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} clicked={this.handleSummaryContinue}/>
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
      </div>
    );
  }
}
