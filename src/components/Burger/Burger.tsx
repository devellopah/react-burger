import * as React from 'react'
import classes from './Burger.module.scss'
import Ingredient from './components/Ingredient'

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

export interface IBurgerProps {
  ingredients: { [k in Ingredient]: number },
}

export default function Burger (props: IBurgerProps) {
  let ingredients: (JSX.Element[] | JSX.Element) = Object.keys(props.ingredients)
    .map(key => {
      return [...Array(props.ingredients[key as Ingredient])].map((_, i) => <Ingredient key={key + i} type={key} />)
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

    if(ingredients.length === 0) {
      ingredients = <p>Please, start adding ingredients!</p>
    }


  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top" />
      {ingredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
}
