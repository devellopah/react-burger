import * as React from 'react';
import classes from './Toolbar.module.scss'

export interface IToolbarProps {
}

export default class Toolbar extends React.Component<IToolbarProps> {
  public render() {
    return (
      <header className={classes.toolbar}>
        <div>Menu</div>
        <div>Logo</div>
        <nav className={classes.nav}>
          <ul>
            ...
          </ul>
        </nav>
      </header>
    );
  }
}
