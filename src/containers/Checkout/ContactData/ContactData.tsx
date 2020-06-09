import * as React from 'react';
import HashLoader from "react-spinners/HashLoader";
// import SweetAlert from 'sweetalert2-react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';

import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import classes from './ContactData.module.scss'
import axios from '../../../axios-orders'
import { BurgerState, Ingredients } from '../../../store/types'
import { resetIngredients } from '../../../store/actions'

export interface IAppProps {
  ingredients: Ingredients,
  totalPrice: number,
  history: any,
  resetIngredients: () => void,
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
    loading: false,
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
    this.setState({loading: true})
    const orderData = this.state.orderForm.reduce((obj: {[key: string]: string;}, el) => {
      const name = el.name
      const value = el.value

      obj[name] = value
      return obj
    }, {})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData,
    }

    axios
      .post('/orders.json', order)
      .then(response => {
        console.log('response', response)
        this.setState({ loading: false})
        this.props.resetIngredients()
        this.props.history.replace('/')
      })
      .catch(error => {
        alert(error)
        this.setState({ loading: false})
      })
    return false
  }

  public render() {
    const inputs = this.state.orderForm.filter(el => el.elementType !== 'select')
    const selects = this.state.orderForm.filter(el => el.elementType === 'select')

    let form = (
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

const mapStateToProps = (state: BurgerState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetIngredients: () => dispatch(resetIngredients()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactData)