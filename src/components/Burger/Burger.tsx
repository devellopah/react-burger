import * as React from 'react'
import classes from './Burger.module.scss'
import Ingredient from './components/Ingredient'

export interface IBurgerProps {
}

export default function Burger (props: IBurgerProps) {
  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top" />
      <Ingredient type="cheese" />
      <Ingredient type="meat" />
      <Ingredient type="bread-bottom" />
    </div>
  );
}
