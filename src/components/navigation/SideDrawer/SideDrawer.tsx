import React from 'react';
import Logo from '../../Logo'
import NavItems from '../NavItems'
import classes from './SideDrawer.module.scss'

interface ISideDrawerProps {
}

const SideDrawer: React.FunctionComponent<ISideDrawerProps> = (props) => {
  return (
    <div className={classes.drawer}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav>
        <NavItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
