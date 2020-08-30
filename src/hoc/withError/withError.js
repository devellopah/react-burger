import React,{ useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal'

const withError = (WrappedComponent, axios) => {
  const WithError = (props) => {
    const [error, setError] = useState(null)
    const reqInterceptors = axios.interceptors.request.use(req => {
      setError(null)
      return req
    })
    const resInterceptors = axios.interceptors.response.use(res => res, err => {
      setError(err)
    })

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptors);
        axios.interceptors.response.eject(resInterceptors);
      }
    }, [reqInterceptors, resInterceptors])


    const errorConfirmedHandler = () => setError(null)

    return (
      <>
        <Modal
          show={error}
          clicked={errorConfirmedHandler}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
  return WithError
}

export default withError;
