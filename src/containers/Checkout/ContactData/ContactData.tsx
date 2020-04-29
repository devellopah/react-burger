import * as React from 'react';
import Button from '../../../components/ui/Button'
import classes from './ContactData.module.scss'
export interface IAppProps {

}

export default class extends React.Component<IAppProps> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  }
  public render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input type="text" name="name" id="name" placeholder="Your name" />
          <input type="email" name="email" id="email" placeholder="Your email" />
          <input type="text" name="street" id="street" placeholder="Street" />
          <input type="text" name="postal" id="postal" placeholder="Postal code" />
          <Button type="success">Order</Button>
        </form>
      </div>
    );
  }
}
