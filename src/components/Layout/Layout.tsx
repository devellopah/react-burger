import React, { Fragment } from 'react';
import Toolbar from '../navigation/Toolbar'
import classes from './Layout.module.scss';

export interface ILayoutProps {
  children: React.ReactNode,
}

function Layout (props: ILayoutProps) {
  return (
    <Fragment>
      <Toolbar />

      <main className={classes.content}>
        {props.children}
      </main>

    </Fragment>
  );
}

export default Layout
