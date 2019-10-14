import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger'

export interface IBurgerBuilderProps {
}

export interface IBurgerBuilderState {
  ingredients: Object,
}

export default class BurgerBuilder extends Component<IBurgerBuilderProps, IBurgerBuilderState> {

  state = {
    ingredients: {
      salad: 1,
      bacon: 2,
      cheese: 3,
      meat: 1,
    }
  }

  public render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>

      </Fragment>
    );
  }
}
