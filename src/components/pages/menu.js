import React, { Component } from 'react'

class Menu extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    let menuBtn = document.getElementById('menu-button')
    menuBtn.addEventListener('click', () => {
      let page = menuBtn.getAttribute('data-page')
      this.props.pageUpdate(page)
    })

  }

  render() {

    let type = this.props.data
    let menuContent = ''
    let hamburgerMenu = (<div className="menu-icon"><span></span><span></span><span></span></div>)
    let logo = (<div className="logo"><span>chewsr</span></div>)
    if (type === 'trash-page' || type == 'short-page') {
      menuContent = (<button id="menu-button" data-page="home-page">BACK</button>)
    } else {
      menuContent = (<button id="menu-button" data-page="cart-page">CART</button>)
    }

    let cart = (<div className="cart-wrapper">
      <img src="assets/icon-cart.svg" />
      <div className="dialog"><span>0</span></div>
    </div>)

    return (
      <div className="menu">{hamburgerMenu}{logo}{menuContent} {cart}</div>
    )

  }
}

export default Menu
