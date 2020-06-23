import * as types from '../actions/types';

const initialState: types.OrderState = {
  orders: [],
  loading: false,
}

export default (state = initialState, action: types.OrderAction): types.OrderState => {
  switch (action.type) {
    case types.PURCHASE_BURGER_STARTED:
      return {
        ...state,
        loading: true,
      }
    case types.PURCHASE_BURGER_SUCCESSED:
      const order = { ...action.order, id: action.id }
      return {
        ...state,
        orders: state.orders.concat(order),
        loading: false,
      }
    case types.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}