import * as React from 'react';
import classes from './Toolbar.module.scss'
import Logo from '../../Logo'
import NavItems from '../NavItems'

export interface IToolbarProps {
}

export default class Toolbar extends React.Component<IToolbarProps> {
  public render() {
    return (
      <header className={classes.toolbar}>
        <div>Menu</div>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav className={classes.nav}>
          <NavItems />
        </nav>
      </header>
    );
  }
}
