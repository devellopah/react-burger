import * as React from 'react';
import classes from './Input.module.scss'

interface IInputProps {
  inputtype: string,
  type: string,
  name: string,
  id: string,
  label?: string,
  placeholder ?: string,
}

const Input: React.FunctionComponent<IInputProps> = (props) => {

  let inputElement;

  switch(props.inputtype) {
    case('input') :
      inputElement = <input className={classes.element} {...props} />
      break;
    case ('textarea'):
      inputElement = <textarea className={classes.element} {...props} />
      break;
    default:
      inputElement = <input className={classes.element} {...props} />
  }

  return (
    <p className={classes.field}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
    </p>
  );
};

export default Input;
