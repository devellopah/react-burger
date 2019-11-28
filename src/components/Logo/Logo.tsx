import React from 'react';
import logo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.scss'

interface ILogoProps {
}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
  return (
    <div className={classes.logo}>
      <img src={logo} alt="logo" className={classes.img} />
    </div>
  );
};

export default Logo;
