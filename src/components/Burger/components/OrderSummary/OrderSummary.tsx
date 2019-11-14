import React, { Fragment } from 'react';
import Ingredient from '../Ingredient';

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

interface IOrderSummaryProps {
  ingredients: { [k in Ingredient]: number },
}

const OrderSummary: React.FunctionComponent<IOrderSummaryProps> = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((key) => {
      const ingredient = key as Ingredient
      return (
        <li key={ingredient}><span>{ingredient}</span>: {props.ingredients[ingredient]}</li>
      )
    })

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout?</p>
    </Fragment>
  );
};

export default OrderSummary;
