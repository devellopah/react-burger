import React from 'react'
import HashLoader from "react-spinners/HashLoader"
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import * as Yup from 'yup'
import { Formik, Form, Field, FieldProps } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '../../../components/ui/Button'
import classes from './ContactData.module.scss'
import axios from '../../../axios-orders'
import { Ingredients, Order } from '../../../store/actions/types'
import { purchaseBurger } from '../../../store/actions'
import withError from '../../../hoc/withError'
import { AppState } from '../../../store'

interface IAppProps {
  ingredients: Ingredients,
  totalPrice: number,
  loading: boolean,
  purchaseBurger: typeof purchaseBurger,
  history: any,
  idToken: string,
  localId: string,
}

const orderDataSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').defined(),
  email: Yup.string().email('Invalid email').defined(),
  street: Yup.string().defined(),
  postal: Yup.number().defined(),
  deliveryMethod: Yup.string().oneOf(['fastest', 'cheapest']).defined()
})

type MyFormValues = Yup.InferType<typeof orderDataSchema>

const ContactData = (props: IAppProps) => {
  const { t } = useTranslation()

  const initialValues: MyFormValues = {
    name: 'Test',
    email: 'test@test.com',
    street: 'test street',
    postal: 123456,
    deliveryMethod: 'fastest',
  }

  return (
    <div className={classes.ContactData}>
      {props.loading
        ? <HashLoader css={'margin: auto'} />
        : <Formik
            initialValues={initialValues}
            validationSchema={orderDataSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false)
              const order: Order = {
                ingredients: props.ingredients,
                price: props.totalPrice,
                localId: props.localId,
                orderData: values,
              }
              props.purchaseBurger(props.idToken, order, props.history)
            }}
          >
            {({ isSubmitting }) => (
              <Form translate="yes">
                <Field name="name">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <div>
                      <label htmlFor={field.name}>Name</label>
                      <input type="text" {...field} placeholder="Your Name" id={field.name} disabled={isSubmitting} />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <div>
                      <label htmlFor={field.name}>Email</label>
                      <input type="email" {...field} placeholder="Your Email" id={field.name} disabled={isSubmitting} />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="street">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <div>
                      <label htmlFor={field.name}>Address</label>
                      <input type="text" {...field} placeholder="Your Address" id={field.name} disabled={isSubmitting} />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="postal">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <div>
                      <label htmlFor={field.name}>Postal</label>
                      <input type="text" {...field} placeholder="Your Postal" id={field.name} disabled={isSubmitting} />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                    </div>
                  )}
                </Field>
                <Field name="deliveryMethod">
                {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                  <div>
                    <label htmlFor={field.name}>Delivery method</label>
                    <select {...field} id={field.name} disabled={isSubmitting}>
                      <option value="fastest">fastest</option>
                      <option value="cheapest">cheapest</option>
                    </select>
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
                </Field>
                  <Button type="submit" disabled={isSubmitting} btnType="success">{t('actions.order')}</Button>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  ingredients: state.builder.ingredients,
  totalPrice: state.builder.totalPrice,
  loading: state.order.loading,
  idToken: state.auth.idToken,
  localId: state.auth.localId,
})

export default withRouter(
  connect(mapStateToProps, {
    purchaseBurger,
  })(withError(ContactData, axios))
)