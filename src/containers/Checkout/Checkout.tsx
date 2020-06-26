import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from '../Checkout/ContactData'
import { Ingredients } from '../../store/actions/types'
import { addIngredient, removeIngredient } from '../../store/actions'
import { AppState } from '../../store';

export interface ICheckoutProps {
  location: any,
  match: any,
  history: any,
  ingredients: Ingredients,
  totalPrice: number,
}

class Checkout extends React.Component<ICheckoutProps> {
  handleSummaryContinue = () => {
    this.props.history.push({ pathname: `${this.props.history.location.pathname}/contact-data` })
  }

  render() {
    return this.props.ingredients ? (
      <>
        <CheckoutSummary ingredients={this.props.ingredients} clicked={this.handleSummaryContinue}/>
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </>
    ) : <Redirect to="/" />;
  }
}

const mapStateToProps = (state: AppState) => ({
  ingredients: state.builder.ingredients!,
  totalPrice: state.builder.totalPrice,
})

export default connect(mapStateToProps, { addIngredient, removeIngredient })(Checkout)