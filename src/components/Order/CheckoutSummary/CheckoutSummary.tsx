import React from 'react';
import Burger from '../../Burger';
import Button from '../../ui/Button';
import classes from './CheckoutSummary.module.scss'
import { Ingredients } from '../../../store/actions/types'

interface ICheckoutSummaryProps {
  ingredients: Ingredients,
  clicked: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const CheckoutSummary: React.FunctionComponent<ICheckoutSummaryProps> = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>we hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="danger">Cancel</Button>
      <Button btnType="success" clicked={props.clicked}>Continue</Button>
    </div>
  );
};

export default CheckoutSummary;
