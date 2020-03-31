import * as React from 'react';
import classes from './Button.module.scss';

interface IButtonProps {
  clicked?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  type: string,
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  return (
    <button
      onClick={props.clicked}
      className={[classes.Button, classes[props.type]].join(' ')}>
      {props.children}
    </button>
  );
};

export default Button;
