import * as React from 'react';
import classes from './Order.module.scss';

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

interface IOrderProps {
  name: string,
  ingredients: { [k in Ingredient]: number },
  price: number,
}

const Order: React.FunctionComponent<IOrderProps> = (props) => {
  let ingredients = []
  let name: Ingredient

  for(name in props.ingredients) {
    ingredients.push(
      {
        name,
        amount: props.ingredients[name]
      }
    )
  }

  return (
    <div className={classes.Order}>
      <p>Name: {props.name}</p>
      <p>Ingredients: {
        ingredients.map((ig, i) =>
          <span key={ig.name}>{ig.name}({ig.amount}){i < (ingredients.length - 1) && ', '}</span>
        )}
      </p>
      <p>Price: <strong>{props.price.toFixed(2)}$</strong></p>
    </div>
  );
};

export default Order;
