import * as React from 'react';
import classes from './Control.module.scss'

export interface IControlProps {
  label: string,
}

export default function Control (props: IControlProps) {
  return (
    <div className={classes.Control}>
      <div className={classes.label}>{props.label}</div>
      <button className={classes.less}>Less</button>
      <button className={classes.more}>More</button>
    </div>
  );
}
