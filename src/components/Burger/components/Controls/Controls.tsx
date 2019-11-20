import * as React from 'react';
import Control from './components/Control'
import classes from './Controls.module.scss'

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

const controls :{label: string, type: Ingredient}[] = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]

export interface IControlsProps {
  ingredientAdded: (type: Ingredient) => void,
  ingredientRemoved: (type: Ingredient) => void,
  ordered: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  price: number,
  isPurchasing: boolean,
}

export default function Controls (props: IControlsProps) {
  return (
    <div className={classes.Controls}>
      <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
      {controls.map(item =>
        <Control
          key={item.label}
          label={item.label}
          added={() => props.ingredientAdded(item.type)}
          removed={() => props.ingredientRemoved(item.type)}
        />
      )}
      <button
        disabled={!props.price}
        className={classes.OrderButton}
        onClick={props.ordered}
      >
        Order now
      </button>
    </div>
  );
}
