import React, { Fragment } from 'react';

export interface ILayoutProps {
  children: React.ReactNode,
}

function Layout (props: ILayoutProps) {
  return (
    <Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>

      <main>
        {props.children}
      </main>

    </Fragment>
  );
}

export default Layout
