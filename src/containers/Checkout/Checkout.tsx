import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary'


export interface ICheckoutProps {
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
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}
