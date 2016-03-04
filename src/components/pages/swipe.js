import React, { Component } from 'react'
import {Utils} from '../Utils.js'



var trashArr = []
var favArr = []
var trashPage
var listPage
var loaded = false

class Swipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      trash: 0,
      shortlist: 0,
      trashDialogCSS: "dialog",
      shortlistDialogCSS:"dialog",
      loaded: false
    }
  }


  init(products){
      if (!loaded) {
        Utils.preload(products,()=>{
          let doms = document.querySelectorAll('#swipe-wrapper li.layer')
          for (let key in doms) {
            if (doms.hasOwnProperty(key)) {
              doms[key].setAttribute('style','display: block')
              doms[key].setAttribute('data-id',key)
            }
          }
          this.centerImages()
        })
      }

      if (products.length>0) loaded = true
  }

  centerImages(){
    let marginLeft = Utils.leftMargin()
    let doms = document.querySelectorAll('#swipe-wrapper li.layer img')
    for (let key in doms) {
      if (doms.hasOwnProperty(key)) {
        doms[key].setAttribute('style','margin-left: -' + marginLeft + 'px')
      }
    }
  }


  triggerNav() {
    let doms = document.querySelectorAll('.button')

    for (let key in doms) {
      if (doms.hasOwnProperty(key)) {
        let myDom = doms[key]
        myDom.addEventListener('click', () => {
          let myClass = myDom.getAttribute('class')
          if (myClass.indexOf('left') > -1){
            this.trashProduct()
          } else if (myClass.indexOf('right') > -1) {
            this.addProduct()
          }
        })
      }
    }

    let trashBtn = document.getElementById('trash-list-btn')
    let shortBtn = document.getElementById('short-list-btn')

    trashBtn.addEventListener('click', () => {
      this.props.pageUpdate('trash-page')
    })

    shortBtn.addEventListener('click', () => {
      this.props.pageUpdate('short-page')
    })


  }

  trashProduct() {
    let doms = document.querySelectorAll('#swipe-wrapper li.layer')
    let last = doms.length - 1
    let duration = 0.4
    doms[last].setAttribute('style','transition: all ' + duration + 's linear; left: -1000px ')
    let sku = doms[last].getAttribute('data-sku')

    trashArr.push(this.props.products[sku])
    this.setState({trash: trashArr.length})
    this.setState({trashDialogCSS: "dialog showed bump"})
    this.props.addToTrash(this.props.products[sku])

    setTimeout(()=>{
      doms[last].remove()
      this.setState({trashDialogCSS: "dialog showed"})
    },duration*1000)
  }

  addProduct() {
    let doms = document.querySelectorAll('#swipe-wrapper li.layer')
    let last = doms.length - 1
    let duration = 0.4
    doms[last].setAttribute('style','transition: all ' + duration + 's linear; left: 1000px ')
    let sku = doms[last].getAttribute('data-sku')
    favArr.push(this.props.products[sku])
    this.setState({shortlist: favArr.length})
    this.setState({shortlistDialogCSS: "dialog showed bump"})
    this.props.addToShort(this.props.products[sku])

    setTimeout(()=>{
      doms[last].remove()
      this.setState({shortlistDialogCSS: "dialog showed"})
    },duration*1000)
  }


  componentDidMount(){
    this.triggerNav()
  }

  render() {

    let products = $.map(this.props.products, (value, index) => {
      return [value];
    })

    this.init(products)

    let myStyle = {'display': 'none'}
    let swipeContent = products.map((item) => {
      let info = item.name + ' <br/> $' + item.price
      return (<li key={item.sku} className="layer" style={myStyle} data-sku={item.sku}>
              <img src={item.url} />
              <div className="gra-bg">
                <span className="info" dangerouslySetInnerHTML={{__html: info}}></span>
              </div>
            </li>)
    })


    return (
        <div id="swipe-page">
          <ul id="swipe-wrapper">
            <li className="loading"><span><img src="assets/chewsr-logo.svg" className="logo"/></span></li>
            {swipeContent}
          </ul>
          <div className="select-nav">
            <div className="trash-wrapper">
              <div className="btn" id="trash-list-btn"><img src="assets/icon-trash.svg"/></div>
              <div className={this.state.trashDialogCSS}>
                <span>{this.state.trash}</span>
              </div>
            </div>
            <div className="plus-wrapper">
              <div className="btn" id="short-list-btn"><img src="assets/icon-plus.svg"/></div>
              <div className={this.state.shortlistDialogCSS}>
                <span>{this.state.shortlist}</span>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default Swipe
