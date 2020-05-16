import React from 'react';
import classes from './NavItems.module.scss';
import { NavLink } from 'react-router-dom'
interface INavItemsProps {
}

const NavItems: React.FunctionComponent<INavItemsProps> = (props) => {
  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <NavLink exact to="/" className={classes.link} activeClassName={classes.link___active}>Burger Builder</NavLink>
      </li>
      <li className={classes.item}>
        <NavLink exact to="/orders" className={classes.link} activeClassName={classes.link___active}>Orders</NavLink>
      </li>
    </ul>
  );
};

export default NavItems;
