import * as React from 'react';
import classes from './Button.module.scss';

interface IButtonProps {
  clicked?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  btnType: string,
}

const Button: React.FunctionComponent<IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ btnType, clicked, ...props }) => {
  return (
    <button {...props} className={[classes.Button, classes[btnType]].join(' ')} onClick={clicked} />
  );
};

export default Button;
