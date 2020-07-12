import React, { Component } from 'react';
import { connect } from 'react-redux'
import Toolbar from '../../components/navigation/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer'
import classes from './Layout.module.scss';
import { AppState } from '../../store';

export interface ILayoutProps {
  children: React.ReactNode,
  isAuth: boolean,
}

class Layout extends Component<ILayoutProps> {
  state = {
    isDrawerShowed: false,
  }

  sideDrawerCloseHandler = () => {
    this.setState({
      isDrawerShowed: false,
    })
  }

  sideDrawerShowHandler = () => {
    this.setState({
      isDrawerShowed: true,
    })
  }

  render() {

    return (
      <>
        <Toolbar
          sideDrawerShowed={this.sideDrawerShowHandler}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          open={this.state.isDrawerShowed}
          isAuth={this.props.isAuth}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export default connect(
  (state: AppState) => ({ isAuth: state.auth.idToken !== null })
)(Layout)
