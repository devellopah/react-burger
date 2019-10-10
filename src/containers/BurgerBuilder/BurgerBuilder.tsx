import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger'

export interface IBurgerBuilderProps {
}

export default class BurgerBuilder extends Component<IBurgerBuilderProps> {
  public render() {
    return (
      <Fragment>
        <Burger />
        <div>Build Controls</div>

      </Fragment>
    );
  }
}
