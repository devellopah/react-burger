import * as React from 'react';
import HashLoader from "react-spinners/HashLoader";
// import SweetAlert from 'sweetalert2-react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";

import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import classes from './ContactData.module.scss'
import axios from '../../../axios-orders'
import { Ingredients, Order, OrderData } from '../../../store/actions/types'
import { purchaseBurger } from '../../../store/actions'
import WithError from '../../../hoc/WithError'
import { AppState } from '../../../store';

export interface IAppProps {
  ingredients: Ingredients,
  totalPrice: number,
  loading: boolean,
  purchaseBurger: any,
  history: any,
}

class ContactData extends React.Component<IAppProps> {
  state = {
    orderForm: [
      {
        elementType: 'input',
        type: 'text',
        name: 'name',
        placeholder: 'Your Name',
        value: 'Tony',
      },
      {
        elementType: 'input',
        type: 'text',
        name: 'email',
        placeholder: 'Your email',
        value: 'tony@montana.com',
      },
      {
        elementType: 'input',
        type: 'text',
        name: 'street',
        placeholder: 'Street',
        value: 'Montana Street',
      },
      {
        elementType: 'input',
        type: 'text',
        name: 'postal',
        placeholder: 'Your Name',
        value: 'Postal code',
      },
      {
        elementType: 'select',
        name: 'deliveryMethod',
        label: 'Delivery Method',
        value: 'fastest',
        options: [
          {value: 'fastest', text: 'Fastest'},
          {value: 'cheapest', text: 'Cheapest'},
        ],
      },
    ],
  }

  changedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const updatedOrderForm = this.state.orderForm.concat().map(el => {
      const isTargetElement = el.name === event.target.getAttribute('name')
      if (!isTargetElement) return el;
      el.value = event.target.value
      return el
    })
    this.setState({ orderForm: updatedOrderForm })
  }

  orderHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const orderData: OrderData = this.state.orderForm.reduce((obj: any, el)  => {
      const name = el.name
      const value = el.value

      obj[name] = value
      return obj
    }, {})

    const order: Order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData,
    }

    this.props.purchaseBurger(order, this.props.history)

    return false
  }

  public render() {
    const inputs = this.state.orderForm.filter(el => el.elementType !== 'select')
    const selects = this.state.orderForm.filter(el => el.elementType === 'select')

    const form = (
      <>
      <h4>Enter your contact data</h4>
      <form>
          {inputs.map(el => <Input
            key={el.name}
            elementType={el.elementType}
            type={el.type!}
            name={el.name}
            value={el.value}
            placeholder={el.placeholder!}
            changed={this.changedHandler}
          />)}
          {selects.map(el => <Select
            key={el.name}
            elementType={el.elementType}
            name={el.name}
            label={el.label!}
            value={el.value}
            options={el.options!}
            changed={this.changedHandler}
          />)}
          <Button type="submit" btnType="success" clicked={this.orderHandler}>Order</Button>
      </form>
      </>
    )

    return (
      <div className={classes.ContactData}>
        {this.props.loading ? <HashLoader css={'margin: auto;'} /> : form}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  ingredients: state.builder.ingredients,
  totalPrice: state.builder.totalPrice,
  loading: state.order.loading,
})

export default withRouter(
  connect(mapStateToProps, {
    purchaseBurger,
  })(WithError(ContactData, axios))
)
