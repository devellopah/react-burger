import React from 'react';
import classes from './NavItems.module.scss';

interface INavItemsProps {
}

const NavItems: React.FunctionComponent<INavItemsProps> = (props) => {
  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <a href="/" className={[classes.link, classes.link___active].join(' ')}>Burger Builder</a>
      </li>
      <li className={classes.item}>
        <a href="/" className={classes.link}>Checkout</a>
      </li>
    </ul>
  );
};

export default NavItems;
