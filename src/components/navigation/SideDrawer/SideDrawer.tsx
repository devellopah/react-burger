import React from 'react';
import Logo from '../../Logo'
import NavItems from '../NavItems'
import classes from './SideDrawer.module.scss'
import Backdrop from '../../ui/Backdrop'

interface ISideDrawerProps {
  open: boolean,
  closed: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void),
}

const SideDrawer: React.FunctionComponent<ISideDrawerProps> = (props) => {
  const attachedClasses = [classes.drawer]

  props.open
   ? attachedClasses.push(classes.open)
   : attachedClasses.push(classes.close)

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
