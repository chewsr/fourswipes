import React, { Component } from 'react'
import {Utils} from './Utils.js'
import $ from 'jquery'
import Menu from './pages/menu.js'
import Cart from './pages/cart.js'
import Swipe from './pages/swipe.js'
import Trash from './pages/trash.js'
import Short from './pages/short.js'
import Popup from './pages/popup.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      products: {},
      proData: {},
      trashPageIn: "",
      shortPageIn: "",
      cartPageIn: "",
      popupPageIn: "",
      curPage: "home-page",
      curPop: "",
      trashList: [],
      shortList: [],
      swipeList: [],
      cartList: {},
      curSku: ""
    }
  }

  requestData() {
    $.get(this.props.source, function (result) {
      this.setState({
        proData: result,
        products: Utils.skuProducts(result)
      })

      let swipeList = []
      for (let sku in this.state.products) {
        if (this.state.products.hasOwnProperty(sku)) swipeList.push(sku)
      }
      this.setState({
        swipeList: swipeList
      })
    }.bind(this))
  }

  componentDidMount() {
    this.requestData()
  }

  pageUpdate(page,param) {
    this.setState({
      curPage: page
    })

    if (page == 'home-page') {
      this.clearPages()
    } else if (page == 'trash-page') {
      this.clearPages()
      this.setState({trashPageIn: "showed"})
    } else if (page == 'short-page') {
      this.clearPages()
      this.setState({shortPageIn: "showed"})
    } else if (page == 'cart-page') {
      this.clearPages()
      this.setState({cartPageIn: "showed"})
    }

  }

  pagePopup(page,param) {

    this.setState({
      curPop: page
    })

    if (page == 'popup-page') {
      this.setState({popupPageIn: "showed", curSku: param})
    }
  }

  closePopup(){
    this.setState({popupPageIn: ""})
  }

  clearPages(){
    this.setState({trashPageIn: ""})
    this.setState({shortPageIn: ""})
    this.setState({cartPageIn: ""})
    this.setState({popupPageIn: ""})
  }

  addToTrash(sku){
    let curList = this.state.trashList
    curList.push(sku)
    this.setState({
      trashList: curList
    })
  }

  addToShort(sku){
    let curList = this.state.shortList
    curList.push(sku)
    this.setState({
      shortList: curList
    })
  }

  removeFromTrash(sku) {
    let curList = this.state.trashList
    let index = curList.indexOf(sku)
    if (index > -1) {
      curList.splice(index,1)
    }
    this.setState({
      trashList: curList
    })
  }

  removeFromSwipe(sku) {
    let curList = this.state.swipeList
    let index = curList.indexOf(sku)
    if (index > -1) {
      curList.splice(index,1)
    }
    this.setState({
      swipeList: curList
    })
  }

  removeFromShort(sku) {
    let curList = this.state.shortList
    let index = curList.indexOf(sku)
    if (index > -1) {
      curList.splice(index,1)
    }
    this.setState({
      shortList: curList
    })
  }

  removeItem(sku) {
    let curList = this.state.cartList
    delete curList[sku]

    let swipeList = this.state.swipeList
    swipeList.push(sku)

    this.setState({
      cartList: curList,
      swipeList: swipeList
    })

  }

  updateCart(type,sku) {
    let curList = this.state.cartList
    let curQuantity = curList[sku].quantity
    if (type == 'more') curQuantity++
      else if (type == 'less' && curQuantity >1) curQuantity--


    curList[sku] = {
      sku: sku,
      quantity: curQuantity
    }

    this.setState({
      cartList: curList
    })
  }

  addToCart(sku){
    let curList = this.state.cartList
    let cartItem = {
      sku: sku,
      quantity: 1
    }
    curList[sku] = cartItem

    this.setState({
      cartList: curList
    })

    this.removeFromTrash(sku)
    this.removeFromShort(sku)
  }

  render() {

    let cartItems = this.state.cartList

    return (
      <div className="pages-wrapper">
        <Cart
          pageUpdate={this.pageUpdate.bind(this)}
          pagePopup={this.pagePopup.bind(this)}
          show={this.state.cartPageIn}
          cartItems={this.state.cartList}
          products={this.state.products}
          updateCart={this.updateCart.bind(this)}
          removeItem={this.removeItem.bind(this)}
        />
        <Trash
          pageUpdate={this.pageUpdate.bind(this)}
          show={this.state.trashPageIn}
          mylist={this.state.trashList}
          products={this.state.products}
          addToCart={this.addToCart.bind(this)}
          updateCart={this.updateCart.bind(this)}
          cartItems={this.state.cartList}
        />
        <Short
          pageUpdate={this.pageUpdate.bind(this)}
          show={this.state.shortPageIn}
          mylist={this.state.shortList}
          products={this.state.products}
          addToCart={this.addToCart.bind(this)}
          cartItems={this.state.cartList}
        />
        <Swipe
          addToTrash={this.addToTrash.bind(this)}
          addToShort={this.addToShort.bind(this)}
          addToCart={this.addToCart.bind(this)}
          pageUpdate={this.pageUpdate.bind(this)}
          pagePopup={this.pagePopup.bind(this)}
          products={this.state.products}
          trashList={this.state.trashList}
          shortList={this.state.shortList}
          swipeList={this.state.swipeList}
          removeFromSwipe={this.removeFromSwipe.bind(this)}
        />
        <Popup
          show={this.state.popupPageIn}
          curSku={this.state.curSku}
          products={this.state.products}
          closePopup={this.closePopup.bind(this)}
        />
        <Menu pageUpdate={this.pageUpdate.bind(this)} data={this.state.curPage} cartItems={cartItems}/>
      </div>
    )

  }
}

export default App
