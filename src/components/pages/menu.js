import React, { Component } from 'react'
import {Utils} from '../Utils.js'

class Menu extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }


  render() {

    return (
      <div id="menu">
        <div className="home-btn"><i className="fa fa-home"></i></div>
        <div className="shopping-basket"><i className="fa fa-shopping-basket"></i></div>
        <div className="favorite-list"><i className="fa fa-heart"></i></div>
      </div>
    )

  }
}

export default Menu
