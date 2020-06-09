import React, { Component, Fragment } from 'react';
// import { browserHistory } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

import Burger from '../../components/Burger'
import Controls from '../../components/Burger/components/Controls'
import OrderSummary from '../../components/Burger/components/OrderSummary'
import Modal from '../../components/ui/Modal'
import WithError from '../../hoc/WithError'
import axios from '../../axios-orders'
import { BurgerState, Ingredient, Ingredients} from '../../store/types'
import { addIngredient, removeIngredient } from '../../store/actions'

const override = css`
  display: block;
  margin: 0 auto;
`;

export interface IBurgerBuilderProps {
  history: any,
  ingredients: Ingredients,
  totalPrice: number,
  addIngredient: (type: Ingredient) => void,
  removeIngredient: (type: Ingredient) => void,

}

export interface IBurgerBuilderState {
  isPurchasing: boolean,
  loading: boolean,
}

class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {

  state = {
    isPurchasing: false,
    loading: false,
  }

  // componentDidMount() {
  //   axios.get('https://react-burger-d4ed6.firebaseio.com/ingredients')
  //     .then(response => {
  //       this.setState({ingredients: response.data})
  //     })
  // }

  purchaseHandler = () => {
    this.setState({ isPurchasing: true })
  }

  purchaseCancelHander = () => {
    this.setState({ isPurchasing: false })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    this.props.history.push('/checkout')
  }

  public render() {
    const orderSummary = this.state.loading
      ? <HashLoader
          css={override}
          size={100}
          color={"#8F5E1E"}
          loading={true}
        />
      : <OrderSummary
        ingredients={this.props.ingredients}
        continued={this.purchaseContinueHandler}
        cancelled={this.purchaseCancelHander}
        price={this.props.totalPrice}
      />

    return (
      <Fragment>
        <Modal show={this.state.isPurchasing} modalClosed={this.purchaseCancelHander}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        <Controls
          ingredientAdded={this.props.addIngredient}
          ingredientRemoved={this.props.removeIngredient}
          price={this.props.totalPrice}
          isPurchasing={this.state.isPurchasing}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithError(BurgerBuilder, axios)))