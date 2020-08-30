import React, { useState } from 'react';
import { connect } from 'react-redux'
import * as Yup from 'yup';
import { Formik, Form, Field, FieldProps } from 'formik';
import HashLoader from "react-spinners/HashLoader";
import Button from '../../components/ui/Button'
import { authenticate } from '../../store/actions'
import { AppState } from '../../store';
import { Redirect } from 'react-router-dom';

interface IAuthProps {
  authenticate: any,
  isLoading: boolean,
  error: any | null,
  isAuth: boolean,
  totalPrice: number,
}

interface IAuthState {
  isLogin: boolean,
}

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').defined(),
  password: Yup.string().min(6, 'Too Short!').defined(),
})

type MyFormValues = Yup.InferType<typeof schema>

const Auth = (props: IAuthProps) => {

  const [ isLogin, setIsLogin ] = useState(true)

  const switchAuthMode = () => {
    setIsLogin(!isLogin)
  }

  const initialValues: MyFormValues = {
    email: '',
    password: '',
  }

  return (
    <div>
      {props.isAuth && <Redirect to={props.totalPrice > 0 ? '/checkout' : '/'} />}
      {props.error && <strong>{props.error.message}</strong>}
      {props.isLoading
          ? <HashLoader
            size={100}
            color={"#703b09"}
          />
          : <div>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                props.authenticate({ ...values, isLogin })
              }}
            >
              {({ isSubmitting, values }) => (
                <Form translate="yes">
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
                  <Field name="password">
                    {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                      <div>
                        <label htmlFor={field.name}>password</label>
                        <input type="password" {...field} placeholder="Your password" id={field.name} disabled={isSubmitting} />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Button type="submit" disabled={isSubmitting} btnType="success">{isLogin ? 'Log in' : 'Create account'}</Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Form>
              )}
            </Formik>
            {isLogin
              ? <div>Need an account? <Button btnType="success" clicked={switchAuthMode}>Sign up</Button></div>
              : <div>Already have an account? <Button btnType="success" clicked={switchAuthMode}>Log in</Button></div>
            }
          </div>}
    </div>
  )
};

export default connect(
  (state: AppState) => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuth: state.auth.idToken !== null,
    totalPrice: state.builder.totalPrice,
  }), { authenticate })(Auth);
