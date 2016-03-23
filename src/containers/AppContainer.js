import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from '../state/actions'
import products from '../assets/data/products.json!json'
import App from '../components/App'

class AppContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.addProducts(products)
  }

  render () {
    return (
      <div id="container">
        <App mainState={this.props}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    products: state.products,
    cart: state.cart,
    shortlist: state.shortlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProducts: (products) => {
      dispatch(actions.addProducts(products))
    },
    addToCart: (sku) => {
      dispatch(actions.addToCart(sku))
    },
    addToShortlist: (sku) => {
      dispatch(actions.addToShortlist(sku))
    },
    removeFromShortlist: (sku) => {
      dispatch(actions.removeFromShortlist(sku))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
