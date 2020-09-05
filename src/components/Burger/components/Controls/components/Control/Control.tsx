import * as React from 'react';
import Button from '../../../../../ui/Button'
import classes from './Control.module.scss'

export interface IControlProps {
  label: string,
  quantity: number,
  added: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  removed: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const Control = (props: IControlProps) => {
  return (
    <div className={classes.Control}>
      <div className={classes.label}>{props.label}</div>
      <Button className={classes.less} clicked={props.removed} disabled={!props.quantity} >Less</Button>
      <Button className={classes.more} clicked={props.added} >More</Button>
    </div>
  );
}

export default Control