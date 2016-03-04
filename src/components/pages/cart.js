import React, { Component } from 'react'

class Cart extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let cartPageIn = ""

    if (this.props.show) {
      cartPageIn = "showed"
    }

    let cartContent = this.props.cartItems.map((sku) => {
      let item = this.props.products[sku]
      return (
        <li key={item.sku}>
          <div className="thumb">
            <img src={item.url}/>
          </div>
          <div className="info">
            <div className="info-content">
              {item.name}
              <div className="price-tag">${item.price}</div>
            </div>
          </div>
          <div className="less" data-sku={item.sku}>
            <span className="small">LESS</span>
            <span className="big">-</span>
          </div>
          <div className="more" data-sku={item.sku}>
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
        <div className="total">Total: $123.49</div>
      </div>
    )
  }
}

export default Cart
