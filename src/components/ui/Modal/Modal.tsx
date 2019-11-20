import * as React from 'react';
import classes from './Modal.module.scss'

interface IModalProps {
  show: boolean,
  children: React.ReactElement,
}

const Modal: React.FunctionComponent<IModalProps> = (props) => {
  const styles = {
    Modal: {
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? 1 : 0,
    }
  }

  return (
    <div
      className={classes.Modal}
      style={styles.Modal}
    >
      {props.children}
    </div>
  );
};

export default Modal;
