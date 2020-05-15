import React, { Fragment } from 'react';
import Ingredient from '../Ingredient';
import Button from '../../../ui/Button'

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

interface IOrderSummaryProps {
  ingredients: { [k in Ingredient]: number },
  continued: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  cancelled: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  price: number,
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
      <p>Total price: <strong>{props.price.toFixed(2)}$</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="danger" clicked={props.cancelled}>Cancel</Button>
      <Button btnType="success" clicked={props.continued}>Continue</Button>
    </Fragment>
  );
};

export default OrderSummary;
