import React, { Component } from 'react'
import {Utils} from '../Utils.js'

class Menu extends Component {
  constructor (props) {
    super(props)
  }

  getPage (event) {
    let page = event.currentTarget.getAttribute('data-page')

    this.props.mainState.getPage(page)
    //console.log('Hey')
  }

  render () {
    let dialogClass = 'dialog'
    let dialogNum = this.props.mainState.shortlist.length
    if (dialogNum > 0) {
      dialogClass = 'dialog enable'
    }

    console.log(this.props.mainState)

    return (
      <div id='menu'>
        <div className='home-btn' onClick={this.getPage.bind(this)} data-page='swipe'><i className='fa fa-home'></i></div>
        <div className='shopping-basket'><i className='fa fa-shopping-basket'></i></div>
        <div className='favorite-list' onClick={this.getPage.bind(this)} data-page='shortlist'>
          <i className='fa fa-heart'></i>
          <div className={dialogClass}><span>{dialogNum}</span></div>
        </div>
      </div>
    )
  }
}

export default Menu
