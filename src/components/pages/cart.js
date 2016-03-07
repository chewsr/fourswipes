import React, { Component } from 'react'
import {Utils} from '../Utils.js'

class Cart extends Component {
  constructor(props){
    super(props)
  }

  addMore(evt){
    let sku = evt.currentTarget.getAttribute('data-sku')
    this.props.updateCart("more",sku)
  }

  addLess(evt) {
    let sku = evt.currentTarget.getAttribute('data-sku')
    this.props.updateCart("less",sku)
  }

  render(){
    let cartPageIn = ""

    if (this.props.show) {
      cartPageIn = "showed"
    }

    let skuList = []
    for (let sku in this.props.cartItems) {
      skuList.push(sku)
    }

    let totalCart = Utils.totalCart(this.props.cartItems, this.props.products)

    let cartContent = skuList.map((sku) => {
      let item = this.props.products[sku]
      let itemInCart = this.props.cartItems[sku]
      let itemTotalPrice = Utils.numberFormat(itemInCart.quantity * item.price,2,'.',',')
      return (
        <li key={item.sku}>
          <div className="thumb-wrapper">
            <div className="thumb">
              <img src={item.url}/>
            </div>
            <div className="remove-btn">[Remove]</div>
          </div>
          <div className="info">
            <div className="info-content">
              {item.name}
              <div className="price-tag"><small>x{itemInCart.quantity}</small><br/>${itemTotalPrice}</div>
            </div>
          </div>

          <div className="add-less" data-sku={item.sku} onClick={this.addLess.bind(this)}>
            <span className="small">LESS</span>
            <span className="big">-</span>
          </div>
          <div className="add-more" data-sku={item.sku} onClick={this.addMore.bind(this)}>
            <span className="small">MORE</span>
            <span className="big">+</span>
          </div>
        </li>
      )
    })

    return (
      <div id="cart-page" className={cartPageIn}>
        <h3>Your Cart</h3>
        <ul>
        {cartContent}
        </ul>
        <div className="total">Total: ${Utils.numberFormat(totalCart,2,'.',',')}</div>
      </div>
    )
  }
}

export default Cart
