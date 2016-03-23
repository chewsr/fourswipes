import {combineReducers} from 'redux'

let products = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCTS':
      return action.products
    default: {
      return state
    }
  }
}

let cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        {
          sku: action.sku,
          quantity: 1
        },
        ...state
      ]
    default: {
      return state
    }
  }
}

let shortlist = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_SHORTLIST':
      return [
        ...state,
        action.sku
      ]
    case 'REMOVE_FROM_SHORTLIST':
      let pos = state.indexOf(action.sku)
      console.log('hey',pos)
      return [
        ...state.slice(0,pos),
        ...state.slice(pos+1)
      ]
    default: {
      return state
    }
  }
}

export default combineReducers({products, cart, shortlist})
