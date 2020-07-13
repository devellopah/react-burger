import React, { Component } from 'react';
// import { browserHistory } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import axios from '../../axios-orders'
import Burger from '../../components/Burger'
import Controls from '../../components/Burger/components/Controls'
import OrderSummary from '../../components/Burger/components/OrderSummary'
import Modal from '../../components/ui/Modal'
import WithError from '../../hoc/WithError'
import { Ingredients } from '../../store/actions/types'
import { addIngredient, removeIngredient, initIngredients } from '../../store/actions'
import { AppState } from '../../store';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export interface IBurgerBuilderProps {
  history: any,
  ingredients: Ingredients,
  totalPrice: number,
  error: boolean,
  isAuth: boolean,
  addIngredient: typeof addIngredient,
  removeIngredient: typeof removeIngredient,
  initIngredients: typeof initIngredients,
}

export interface IBurgerBuilderState {
  isPurchasing: boolean,
  // loading: boolean,
}

class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {

  state = {
    isPurchasing: false,
  }

  componentDidMount() {
    this.props.initIngredients();
  }

  purchaseHandler = () => {
    this.props.isAuth
    ? this.setState({ isPurchasing: true })
    : this.props.history.push('/auth')
  }

  purchaseCancelHander = () => {
    this.setState({ isPurchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  public render() {
    const orderSummary =
      <OrderSummary
        ingredients={this.props.ingredients}
        continued={this.purchaseContinueHandler}
        cancelled={this.purchaseCancelHander}
        price={this.props.totalPrice}
      />
    const content = <>
      <Burger ingredients={this.props.ingredients} />
      <Controls
        ingredientAdded={this.props.addIngredient}
        ingredientRemoved={this.props.removeIngredient}
        price={this.props.totalPrice}
        isPurchasing={this.state.isPurchasing}
        ordered={this.purchaseHandler}
        isAuth={this.props.isAuth}
      />
    </>
    const modal =
      <Modal show={this.state.isPurchasing} modalClosed={this.purchaseCancelHander}>
        {orderSummary}
      </Modal>

    return (
      <>
        {this.props.ingredients && modal}
        <HashLoader
          css={override}
          size={100}
          color={"#703b09"}
          loading={!this.props.ingredients}
        />
        {this.props.ingredients && content}
      </>
    )
  }
}


export default withRouter(connect(
  (state: AppState) => ({ ...state.builder, isAuth: state.auth.idToken !== null }),
  { addIngredient, removeIngredient, initIngredients }
)(WithError(BurgerBuilder, axios)))