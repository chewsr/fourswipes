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
      let found = 0
      state.map(item => {
        if (item.sku === action.sku) found++
      })

      let newstate = [
        {
          sku: action.sku,
          quantity: 1
        },
        ...state]
      return (found === 0) ? newstate : state
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
      return [
        ...state.slice(0, pos),
        ...state.slice(pos + 1)
      ]
    default: {
      return state
    }
  }
}

const pagelist = {
  swipe: true,
  shortlist: false,
  cart: false,
  info: false
}

let pages = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PAGE':
      let newPagelist = {
        swipe: false,
        shortlist: false,
        cart: false,
        info: false
      }
      newPagelist[action.page] = true
      return Object.assign({}, state, newPagelist)
    default: {
      return pagelist
    }
  }
}

export default combineReducers({products, cart, shortlist, pages})
