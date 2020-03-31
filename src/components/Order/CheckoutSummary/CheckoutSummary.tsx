import React from 'react';
import Burger from '../../Burger';
import Button from '../../ui/Button';
import classes from './CheckoutSummary.module.scss'

interface ICheckoutSummaryProps {
  ingredients: any,
}

const CheckoutSummary: React.FunctionComponent<ICheckoutSummaryProps> = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>we hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="danger">Cancel</Button>
      <Button type="success">Continue</Button>
    </div>
  );
};

export default CheckoutSummary;
