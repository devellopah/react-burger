import axios from '../../axios-orders'
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
    const response = await axios.post('/orders.json', order)
    dispatch(purchaseBurgerSuccessed(order, response.data.name))
    history.push('/')
  } catch (error) {
    dispatch(purchaseBurgerFailed(error))
  }
}

export const fetchOrders = (): types.AppThunk => async dispatch => {
  try {
    dispatch(fetchOrdersStarted())
    const response = await axios.get('/orders.json')
    const orders = []
    for (let key in response.data) {
      orders.push({ ...response.data[key], id: key })
    }
    dispatch(fetchOrdersSuccessed(orders))
  } catch (error) {
    dispatch(fetchOrdersFailed(error))
  }
}
