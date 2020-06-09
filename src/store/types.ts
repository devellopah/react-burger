export type Ingredient = 'salad' | 'bacon' | 'cheese' | 'meat'

export interface Ingredients {
  salad: number,
  bacon: number,
  cheese: number,
  meat: number,
}

export interface BurgerState {
  ingredients: Ingredients,
  totalPrice: number,
}

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE'
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS'

interface addIngredient {
  type: typeof ADD_INGREDIENT,
  ingredient: Ingredient,
}

interface removeIngredient {
  type: typeof REMOVE_INGREDIENT,
  ingredient: Ingredient,
}

interface resetIngredients {
  type: typeof RESET_INGREDIENTS,
}

export type BurgerAction = addIngredient | removeIngredient | resetIngredients