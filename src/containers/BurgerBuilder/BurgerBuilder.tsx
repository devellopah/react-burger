import React, { Component, Fragment } from 'react';
// import { browserHistory } from 'react-router-dom'
import { withRouter } from "react-router";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import Burger from '../../components/Burger'
import Controls from '../../components/Burger/components/Controls'
import OrderSummary from '../../components/Burger/components/OrderSummary'
import Modal from '../../components/ui/Modal'
import WithError from '../../hoc/WithError'
import axios from '../../axios-orders'

const override = css`
  display: block;
  margin: 0 auto;
`;

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.75,
  meat: 1.5,
  bacon: 1,
}

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'
export interface IBurgerBuilderProps {
  history: any,
}

export interface IBurgerBuilderState {
  ingredients: { [k in Ingredient]: number },
  totalPrice: number,
  isPurchasing: boolean,
  loading: boolean,
}

class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    isPurchasing: false,
    loading: false,
  }

  // componentDidMount() {
  //   axios.get('https://react-burger-d4ed6.firebaseio.com/ingredients')
  //     .then(response => {
  //       this.setState({ingredients: response.data})
  //     })
  // }

  addIngredient = (type :Ingredient) => {
    const ingredientOldCount = this.state.ingredients[type]
    const ingredients = { ...this.state.ingredients, [type]: ingredientOldCount + 1 }
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

    this.setState({ ingredients, totalPrice })
  }

  removeIngredient = (type: Ingredient) => {
      const ingredientOldCount = this.state.ingredients[type]
      const ingredients = { ...this.state.ingredients, [type]: ingredientOldCount - 1 }
      const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

      this.setState({ ingredients, totalPrice })
  }

  purchaseHandler = () => {
    this.setState({ isPurchasing: true })
  }

  purchaseCancelHander = () => {
    this.setState({ isPurchasing: false })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Test name',
    //     address: {
    //       street: 'Test street',
    //       zipCode: '111111',
    //       country: 'Russia',
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest',
    // }
    // axios
    //   .post('/orders.json', order)
    //   .then(response => {
    //     // this.setState({ loading: false, isPurchasing: false })
    //     this.props.history.replace({ pathname: "/checkout", state: { loading: false, isPurchasing: false }})
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, isPurchasing: false })
    //   })
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i as Ingredient]))
    }

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    })
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
        ingredients={this.state.ingredients}
        continued={this.purchaseContinueHandler}
        cancelled={this.purchaseCancelHander}
        price={this.state.totalPrice}
      />

    return (
      <Fragment>
        <Modal show={this.state.isPurchasing} modalClosed={this.purchaseCancelHander}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <Controls
          ingredientAdded={this.addIngredient}
          ingredientRemoved={this.removeIngredient}
          price={this.state.totalPrice}
          isPurchasing={this.state.isPurchasing}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    )
  }
}

export default withRouter(WithError(BurgerBuilder, axios))