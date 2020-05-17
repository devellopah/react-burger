import * as React from 'react';
import axios from '../../axios-orders'
import withError from '../../hoc/WithError'
import Order from '../../components/Order'

export interface IOrdersProps {
}

export interface IOrdersState {
  orders: any[],
  loading: boolean,
}

class Orders extends React.Component<IOrdersProps, IOrdersState> {
  constructor(props: IOrdersProps) {
    super(props);

    this.state = {
      orders: [],
      loading: true,
    }
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const orders = []
        for(let key in res.data) {
          orders.push({...res.data[key], id: key})
        }
        this.setState({orders, loading: false})
      })
      .catch(err => {
        this.setState({loading: false})
      })
  }

  public render() {
    return (
      <div>
        {this.state.orders.map(order =>
          <Order
            key={order.id}
            price={+order.price}
            ingredients={order.ingredients}
            name={order.customer.name}
          />
        )}
      </div>
    );
  }
}

export default withError(Orders, axios)
