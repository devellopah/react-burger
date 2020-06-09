import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from '../Checkout/ContactData'
import { BurgerState, Ingredient, Ingredients } from '../../store/types'
import { addIngredient, removeIngredient } from '../../store/actions'

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
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ingredients} clicked={this.handleSummaryContinue}/>
        <Route
          path={this.props.match.path + '/contact-data'}
          render={() => (<ContactData history={this.props.history} />)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: BurgerState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addIngredient: (ingredient: Ingredient) => dispatch(addIngredient(ingredient)),
  removeIngredient: (ingredient: Ingredient) => dispatch(removeIngredient(ingredient)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)