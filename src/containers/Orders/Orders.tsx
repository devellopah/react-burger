import * as React from 'react';
import { connect } from 'react-redux'
import HashLoader from "react-spinners/HashLoader";
import axios from '../../axios-orders'
import WithError from '../../hoc/WithError'
import Order from '../../components/Order'
import * as types from '../../store/actions/types'
import { AppState } from '../../store'
import { fetchOrders } from '../../store/actions/'

export interface IOrdersProps {
  orders: types.Orders,
  loading: boolean,
  idToken: string,
  localId: string,
  fetchOrders: typeof fetchOrders,
}

export interface IOrdersState {
}

class Orders extends React.Component<IOrdersProps, IOrdersState> {

  componentDidMount() {
    this.props.fetchOrders(localStorage.getItem('idToken'), this.props.localId)
  }

  public render() {
    const orders = <div>
      {this.props.orders.map(order =>
        <Order
          key={order.id}
          price={+order.price}
          ingredients={order.ingredients}
          name={order.orderData.name}
        />
      )}
    </div>

    return this.props.loading
      ? <HashLoader size={100} color={"#703b09"} />
      : orders
  }
}

export default connect(
  (state: AppState) => ({
    ...state.order,
    idToken: state.auth.idToken,
    localId: state.auth.localId
  }),
  { fetchOrders }
)(WithError(Orders, axios))