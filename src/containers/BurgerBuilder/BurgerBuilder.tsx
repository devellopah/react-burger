import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger'
import Controls from '../../components/Burger/components/Controls'
import OrderSummary from '../../components/Burger/components/OrderSummary'
import Modal from '../../components/ui/Modal'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.75,
  meat: 1.5,
  bacon: 1,
}

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'
export interface IBurgerBuilderProps {
}

export interface IBurgerBuilderState {
  ingredients: { [k in Ingredient]: number },
  totalPrice: number,
  isPurchasing: boolean,
}

export default class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    isPurchasing: false,
  }

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
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Test name',
        address: {
          street: 'Test street',
          zipCode: '111111',
          country: 'Russia',
        },
        email: 'test@test.com'
      }
    }
    axios
      .post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  public render() {
    return (
      <Fragment>
        <Modal show={this.state.isPurchasing} modalClosed={this.purchaseCancelHander}>
          <OrderSummary
           ingredients={this.state.ingredients}
            continued={this.purchaseContinueHandler}
            cancelled={this.purchaseCancelHander}
            price={this.state.totalPrice}
          />
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
    );
  }
}
