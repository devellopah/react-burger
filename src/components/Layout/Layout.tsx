import React, { Component, Fragment } from 'react';
import Toolbar from '../navigation/Toolbar'
import SideDrawer from '../navigation/SideDrawer'
import classes from './Layout.module.scss';

export interface ILayoutProps {
  children: React.ReactNode,
}

class Layout extends Component<ILayoutProps> {
  state = {
    isDrawerShowed: true,
  }

  sideDrawerCloseHandler = () => {
    this.setState({
      isDrawerShowed: false,
    })
  }

  render() {

    return (
      <Fragment>
        <Toolbar />
        <SideDrawer
          open={this.state.isDrawerShowed}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout
