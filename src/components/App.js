import React, { Component } from 'react'
import {Utils} from './Utils.js'
import $ from 'jquery'
import Menu from './pages/menu.js'
import Cart from './pages/cart.js'
import Swipe from './pages/swipe.js'
import Trash from './pages/trash.js'
import Short from './pages/short.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      products: {},
      proData: {},
      trashPageIn: "",
      shortPageIn: "",
      cartPageIn: "",
      curPage: "home-page",
      trashList: [],
      shortList: [],
      cartList: []
    }
  }

  requestData() {
    $.get(this.props.source, function (result) {
      this.setState({
        proData: result,
        products: Utils.skuProducts(result)
      })
    }.bind(this))
  }

  componentDidMount() {
    this.requestData()
  }

  pageUpdate(page) {
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

  clearPages(){
    this.setState({trashPageIn: ""})
    this.setState({shortPageIn: ""})
    this.setState({cartPageIn: ""})
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

  addToCart(sku){
    let curList = this.state.cartList
    curList.push(sku)
    this.setState({
      cartList: curList
    })

    this.removeFromTrash(sku)
    this.removeFromShort(sku)
  }

  render() {

    let cartItems = this.state.cartList.length
    return (
      <div className="pages-wrapper">
        <Cart
          pageUpdate={this.pageUpdate.bind(this)}
          show={this.state.cartPageIn}
          cartItems={this.state.cartList}
          products={this.state.products}
        />
        <Trash
          pageUpdate={this.pageUpdate.bind(this)}
          show={this.state.trashPageIn}
          mylist={this.state.trashList}
          products={this.state.products}
          addToCart={this.addToCart.bind(this)}
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
          products={this.state.products}
          trashList={this.state.trashList}
          shortList={this.state.shortList}
        />
        <Menu pageUpdate={this.pageUpdate.bind(this)} data={this.state.curPage} cartItems={cartItems}/>
      </div>
    )

  }
}

export default App
