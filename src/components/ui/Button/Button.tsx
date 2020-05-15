import * as React from 'react';
import classes from './Button.module.scss';

interface IButtonProps {
  clicked?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  type?: any,
  btnType: string,
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(' ')}>
      {props.children}
    </button>
  );
};

export default Button;
