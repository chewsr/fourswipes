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
        <App products={this.props.products} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProducts: (products) => {
      dispatch(actions.addProducts(products))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
