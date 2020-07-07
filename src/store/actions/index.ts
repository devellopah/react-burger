import axios from 'axios'
import * as types from './types'

export const setIngredients = (ingredients: types.Ingredients) => ({ type: types.SET_INGREDIENTS, ingredients })
export const addIngredient = (ingredient: types.Ingredient) => ({ type: types.ADD_INGREDIENT, ingredient })
export const removeIngredient = (ingredient: types.Ingredient) => ({ type: types.REMOVE_INGREDIENT, ingredient })
export const fetchIngredientsFailed = () => ({ type: types.FETCH_INGREDIENTS_FAILED })

export const purchaseBurgerStarted = () => ({ type: types.PURCHASE_BURGER_STARTED })
export const purchaseBurgerSuccessed = (order:types.Order, id:string) => ({ type: types.PURCHASE_BURGER_SUCCESSED, order, id })
export const purchaseBurgerFailed = (error:object) => ({ type: types.PURCHASE_BURGER_FAILED, error })

export const fetchOrdersStarted = () => ({ type: types.FETCH_ORDERS_STARTED })
export const fetchOrdersSuccessed = (orders: types.Orders) => ({ type: types.FETCH_ORDERS_SUCCESSED, orders })
export const fetchOrdersFailed = (error: object) => ({ type: types.FETCH_ORDERS_FAILED, error })

export const authStarted = () => ({ type: types.AUTH_STARTED })
export const authSuccessed = (localId :string, idToken :string) => ({ type: types.AUTH_SUCCESSED, localId, idToken })
export const authFailed = (error: object) => ({ type: types.AUTH_FAILED, error })

export const logout = () => ({ type: types.AUTH_LOGOUT })

export const authenticate = ({ email, password, isLogin }: {email: string, password: string, isLogin: boolean}): types.AppThunk => async dispatch => {
  try {
    dispatch(authStarted())
    const API_KEY = 'AIzaSyD77mZ0A4HPCD8-heTNpvq3nWEnOvq_qNo'
    const payload = { email, password, returnSecureToken: true}
    const { data, data: { localId, idToken, expiresIn } } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=${API_KEY}`, payload)
    dispatch(authSuccessed(localId, idToken))
    setTimeout(() => {
      console.log('data', data)
      dispatch(logout())
    }, expiresIn);
  } catch (error) {
    dispatch(authFailed(error.response.data.error))
  }
}

export const initIngredients = (): types.AppThunk => async dispatch => {
  try {
    const response = await axios.get('https://react-burger-d4ed6.firebaseio.com/ingredients.json')
    const ingredients:types.Ingredients = response.data
    dispatch(setIngredients(ingredients))
  } catch (error) {
    dispatch(fetchIngredientsFailed())
  }
}

export const purchaseBurger = (order:types.Order, history: any): types.AppThunk => async dispatch => {
  try {
    dispatch(purchaseBurgerStarted())
    const response = await axios.post('https://react-burger-d4ed6.firebaseio.com/orders.json', order)
    dispatch(purchaseBurgerSuccessed(order, response.data.name))
    history.push('/')
  } catch (error) {
    dispatch(purchaseBurgerFailed(error))
  }
}

export const fetchOrders = (): types.AppThunk => async dispatch => {
  try {
    dispatch(fetchOrdersStarted())
    const response = await axios.get('https://react-burger-d4ed6.firebaseio.com/orders.json')
    const orders = []
    for (let key in response.data) {
      orders.push({ ...response.data[key], id: key })
    }
    dispatch(fetchOrdersSuccessed(orders))
  } catch (error) {
    dispatch(fetchOrdersFailed(error))
  }
}
