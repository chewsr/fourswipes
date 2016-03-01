import React, { Component } from 'react'
import {Utils} from './Utils.js'

class Menu extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    let menuBtn = document.getElementById('menu-button')
    menuBtn.addEventListener('click', () => {

      let page = menuBtn.getAttribute('data-page')

      this.props.getPage(page)
    })

  }

  render() {

    let type = this.props.data
    let menuContent = ''
    let hamburgerMenu = (<div className="menu-icon"><span></span><span></span><span></span></div>)
    let logo = (<div className="logo"><span>chewsr</span></div>)
    if (type === 'trash-page') {
      menuContent = (<button id="menu-button" data-page="home-page">BACK</button>)
    } else {
      menuContent = (<button id="menu-button" data-page="cart-page">CART</button>)
    }

    return (
      <div className="menu">{hamburgerMenu}{logo}{menuContent}</div>
    )

  }
}

export default Menu
