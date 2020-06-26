import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../'

export type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'
export type Orders = any[]
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>
export interface Ingredients {
  salad: number,
  bacon: number,
  cheese: number,
  meat: number,
}

export interface OrderData {
  deliveryMethod: string,
  email: string,
  name: string,
  postal: string,
  street: string,
}

export interface Order {
  id?: string,
  ingredients: Ingredients,
  price: number,
  orderData: object,
}

export interface OrderState {
  orders:object[],
  loading: boolean,
}

export interface BuilderState {
  ingredients: Ingredients | null,
  totalPrice: number,
  error: boolean,
}

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE'
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS'
export const SET_INGREDIENTS = 'SET_INGREDIENTS'
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED'

export const PURCHASE_BURGER_SUCCESSED = 'PURCHASE_BURGER_SUCCESSED'
export const PURCHASE_BURGER_FAILED = 'PURCHASE_BURGER_FAILED'
export const PURCHASE_BURGER_STARTED = 'PURCHASE_BURGER_STARTED'

export const FETCH_ORDERS_SUCCESSED = 'FETCH_ORDERS_SUCCESSED'
export const FETCH_ORDERS_FAILED = 'FETCH_ORDERS_FAILED'
export const FETCH_ORDERS_STARTED = 'FETCH_ORDERS_STARTED'

interface addIngredient {
  type: typeof ADD_INGREDIENT,
  ingredient: Ingredient,
}

interface removeIngredient {
  type: typeof REMOVE_INGREDIENT,
  ingredient: Ingredient,
}

interface setIngredients {
  type: typeof SET_INGREDIENTS,
  ingredients: Ingredients,
}

interface fetchIngredientsFailed {
  type: typeof FETCH_INGREDIENTS_FAILED,
}

interface purchaseBurgerStarted {
  type: typeof PURCHASE_BURGER_STARTED,
}

interface purchaseBurgerFailed {
  type: typeof PURCHASE_BURGER_FAILED,
  error: object,
}

interface purchaseBurgerSuccessed {
  type: typeof PURCHASE_BURGER_SUCCESSED,
  order: Order,
  id: string,
}

interface fetchOrdersStarted {
  type: typeof FETCH_ORDERS_STARTED,
}

interface fetchOrdersFailed {
  type: typeof FETCH_ORDERS_FAILED,
  error: object,
}

interface fetchOrdersSuccessed {
  type: typeof FETCH_ORDERS_SUCCESSED,
  orders: Orders,
}

export type BuilderAction = addIngredient
  | removeIngredient
  | setIngredients
  | fetchIngredientsFailed

export type OrderAction = purchaseBurgerStarted
  | purchaseBurgerFailed
  | purchaseBurgerSuccessed
  | fetchOrdersStarted
  | fetchOrdersSuccessed
  | fetchOrdersFailed