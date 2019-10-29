import * as React from 'react';
import classes from './Control.module.scss'

type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

export interface IControlProps {
  label: string,
  added: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  removed: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function Control (props: IControlProps) {
  return (
    <div className={classes.Control}>
      <div className={classes.label}>{props.label}</div>
      <button className={classes.less} onClick={props.removed}>Less</button>
      <button className={classes.more} onClick={props.added}>More</button>
    </div>
  );
}
