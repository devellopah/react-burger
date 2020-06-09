import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_INGREDIENTS, Ingredient } from './types'

export function addIngredient(ingredient: Ingredient) {
  return {
    type: ADD_INGREDIENT,
    ingredient,
  }
}

export function removeIngredient(ingredient: Ingredient) {
  return {
    type: REMOVE_INGREDIENT,
    ingredient,
  }
}

export function resetIngredients() {
  return {
    type: RESET_INGREDIENTS,
  }
}