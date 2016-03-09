import React, { Component } from 'react'
import {Utils} from '../Utils.js'

class Popup extends Component {
  constructor(props) {
    super(props)

    this.statics = {
      showed: false
    }
  }

  componentDidUpdate(){
    if (this.props.show == 'showed' && !this.showed) {
      let page = document.getElementById('popup-page')
      let className = page.getAttribute('class') + ' fade-in'

      let sku = this.props.curSku
      let item = this.props.products[sku]

      this.showed = true
      setTimeout(() => {
        page.setAttribute('class',className)
      },200)

    } else {
      let page = document.getElementById('popup-page')
      page.setAttribute('class','showed fade-out')
      setTimeout(() => {
        page.setAttribute('class','')
      },200)
      this.showed = false
    }
  }

  componentDidMount(){

  }

  closePopup() {
    this.props.closePopup()
  }

  render () {

    let popupPageIn = ""

    if (this.props.show) {
      popupPageIn = "showed"
    }

    let sku = this.props.curSku
    let item = this.props.products[sku]
    let itemContent = ''

    if (typeof item == 'object') {
      itemContent = (
        <div className="info-content">
          <div className="thumb-wrapper">
            <img src={item.url}/>
          </div>
          <div className="description">
            <div className="close-btn" onClick={this.closePopup.bind(this)}>close [x]</div>
            <h3>{item.name}</h3>
            {item.description}<br/><br/>
            <span className="price-tag">Price: ${item.price}</span>
          </div>
        </div>
      )
    }

    return (
      <div id="popup-page" className={popupPageIn}>
        {itemContent}
      </div>
    )

  }
}

export default Popup
