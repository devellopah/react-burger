import * as React from 'react';
import classes from './Modal.module.scss'

interface IModalProps {
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
  return (
    <div className={classes.Modal}>
      {props.children}
    </div>
  );
};

export default Modal;
