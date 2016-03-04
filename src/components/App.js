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
    }

  }

  clearPages(){
    this.setState({trashPageIn: ""})
    this.setState({shortPageIn: ""})
  }

  addToTrash(item){
    let curList = this.state.trashList
    curList.push(item)
    this.setState({
      trashList: curList
    })
  }

  addToShort(item){
    let curList = this.state.shortList
    curList.push(item)
    this.setState({
      shortList: curList
    })
  }

  addToCart(item){
    let curList = this.state.cartList
    curList.push(item)
    this.setState({
      cartList: curList
    })
  }

  render() {
    return (
      <div className="pages-wrapper">
        <Trash pageUpdate={this.pageUpdate.bind(this)} show={this.state.trashPageIn} mylist={this.state.trashList} />
        <Short pageUpdate={this.pageUpdate.bind(this)} show={this.state.shortPageIn} mylist={this.state.shortList} />
        <Swipe
          addToTrash={this.addToTrash.bind(this)}
          addToShort={this.addToShort.bind(this)}
          addToCart={this.addToCart.bind(this)}
          pageUpdate={this.pageUpdate.bind(this)}
          products={this.state.products}
        />
        <Menu pageUpdate={this.pageUpdate.bind(this)} data={this.state.curPage} />
      </div>
    )

  }
}

export default App
