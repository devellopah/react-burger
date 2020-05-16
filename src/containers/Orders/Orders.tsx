import * as React from 'react';
import Order from '../../components/Order'

export interface IOrdersProps {
}

export interface IOrdersState {
}

export default class Orders extends React.Component<IOrdersProps, IOrdersState> {
  constructor(props: IOrdersProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}
