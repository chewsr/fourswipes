const types = {
  ADD_PRODUCTS: 'ADD_PRODUCTS'
}

const actions = {
  addProducts: (products) => {
    return {
      type: 'ADD_PRODUCTS',
      products
    }
  }
}

export {actions}
