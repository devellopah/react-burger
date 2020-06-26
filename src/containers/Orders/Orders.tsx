import * as React from 'react';
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import withError from '../../hoc/WithError'
import Order from '../../components/Order'
import * as types from '../../store/actions/types'
import { AppState } from '../../store'
import { fetchOrders } from '../../store/actions/'

export interface IOrdersProps {
  orders: types.Orders,
  loading: boolean,
  fetchOrders: typeof fetchOrders,
}

export interface IOrdersState {
}

class Orders extends React.Component<IOrdersProps, IOrdersState> {

  componentDidMount() {
    this.props.fetchOrders()
  }

  public render() {
    return (
      <div>
        {this.props.orders.map(order =>
          <Order
            key={order.id}
            price={+order.price}
            ingredients={order.ingredients}
            name={order.orderData.name}
          />
        )}
      </div>
    );
  }
}

export default connect((state: AppState) => ({ ...state.order }), { fetchOrders })(withError(Orders, axios))
