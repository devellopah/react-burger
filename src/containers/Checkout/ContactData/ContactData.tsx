import * as React from 'react';
import HashLoader from "react-spinners/HashLoader";
// import SweetAlert from 'sweetalert2-react';
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import classes from './ContactData.module.scss'
import axios from '../../../axios-orders'


type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

export interface IAppProps {
  ingredients: { [k in Ingredient]: number },
  price: string,
  history: any,
}

export default class extends React.Component<IAppProps> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Tony',
        address: {
          street: 'Montana',
          zipCode: '777777',
          country: 'USA',
        },
        email: 'tony@montana.com'
      },
      deliveryMethod: 'fastest',
    }
    console.log('order', order)
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false})
        this.props.history.replace('/')
      })
      .catch(error => {
        this.setState({ loading: false})
      })
    return false
  }

  public render() {
    let form = (
      <>
      <h4>Enter your contact data</h4>
      <form>
          <Input inputtype="input" type="text" name="name" id="name" placeholder="Your name" />
          <Input inputtype="input" type="email" name="email" id="email" placeholder="Your email" />
          <Input inputtype="input" type="text" name="street" id="street" placeholder="Street" />
          <Input inputtype="input" type="text" name="postal" id="postal" placeholder="Postal code" />
          <Button type="submit" btnType="success" clicked={this.orderHandler}>Order</Button>
      </form>
      </>
    )

    if(this.state.loading) {
      form = <HashLoader css={'margin: auto;'} />
    }

    return (
      <div className={classes.ContactData}>
        {form}
      </div>
    );
  }
}