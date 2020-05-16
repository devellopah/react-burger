import * as React from 'react';
import classes from './Order.module.scss';

interface IOrderProps {
}

const Order: React.FunctionComponent<IOrderProps> = (props) => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: salad(1), meat(1)</p>
      <p>Price: <strong>5$</strong></p>
    </div>
  );
};

export default Order;
