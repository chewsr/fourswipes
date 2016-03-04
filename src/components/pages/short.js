import React, { Component } from 'react'

class Short extends Component {
  constructor(props) {
    super(props)

  }

  addToCart(evt){
    let sku = evt.currentTarget.getAttribute('data-sku')
    this.props.addToCart(sku)
  }

  render () {

    let shortPageIn = ""

    if (this.props.show) {
      shortPageIn = "showed"
    }

    let shortContent = this.props.mylist.map((sku) => {
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
          <div className="add-to-cart" onClick={this.addToCart.bind(this)} data-sku={item.sku}>
            <span className="small">Add To</span>
            <span className="big">Cart</span>
          </div>
        </li>
      )
    })

    return (
      <div id="short-page" className={shortPageIn}>
        <h3>Short list</h3>
        <ul>{shortContent}</ul>
      </div>
    )
  }
}

export default Short
