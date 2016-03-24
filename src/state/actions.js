const initialState = {
  addedSku: [],
  quantityBySku: {}
}

const actions = {
  addProducts: (products) => {
    return {
      type: 'ADD_PRODUCTS',
      products
    }
  },
  addToCart: (sku) => {
    return {
      type: 'ADD_TO_CART',
      sku
    }
  },
  addToShortlist: (sku) => {
    return {
      type: 'ADD_TO_SHORTLIST',
      sku
    }
  },
  removeFromShortlist: (sku) => {
    return {
      type: 'REMOVE_FROM_SHORTLIST',
      sku
    }
  },
  getPage: (page) => {
    return {
      type: 'GET_PAGE',
      page
    }
  }
}

export {actions}
