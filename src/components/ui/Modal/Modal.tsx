import React, { Fragment } from 'react';
import Backdrop from '../Backdrop'
import classes from './Modal.module.scss'

interface IModalProps {
  show: boolean,
  modalClosed: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
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
    <Fragment>
      <Backdrop clicked={props.modalClosed} show={props.show} />
      <div
        className={classes.Modal}
        style={styles.Modal}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default Modal;
