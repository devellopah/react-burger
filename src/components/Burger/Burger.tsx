import * as React from 'react'
import classes from './Burger.module.scss'
import Ingredient from './components/Ingredient'
import { Ingredient as IngredientType, Ingredients } from '../../store/actions/types'


export interface IBurgerProps {
  ingredients: Ingredients,
}

const Burger = (props: IBurgerProps) => {
  let ingredients: (JSX.Element[] | JSX.Element) = Object.keys(props.ingredients)
    .map(key => [
      ...Array(props.ingredients[key as IngredientType])].map((_, i) =>
        <Ingredient key={key + i} type={key} />)
    )
    .reduce((arr, el) => arr.concat(el), [])

  if (ingredients.length === 0) ingredients = <p>Please, start adding ingredients!</p>

  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top" />
      {ingredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
}

export default Burger