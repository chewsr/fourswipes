import React, { Component } from 'react'
import {Utils} from '../Utils.js'

class Trash extends Component {
  constructor(props) {
    super(props)
  }

  addToCart(evt){
    let sku = evt.currentTarget.getAttribute('data-sku')
    this.props.addToCart(sku)
  }

  render () {

    let trashPageIn = ""

    if (this.props.show) {
      trashPageIn = "showed"
    }


    let trashContent = this.props.mylist.map((sku) => {

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
      <div id="trash-page" className={trashPageIn}>
        <h3>Trash list</h3>
        <ul>{trashContent}</ul>
      </div>
    )

  }
}

export default Trash
