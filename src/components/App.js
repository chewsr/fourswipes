import React, { Component } from 'react'
import {Utils} from './Utils.js'
import Menu from './Menu.js'

var images = [
{
  "sku": "a001",
  "name": "Food Title One",
  "url":"assets/photo-01.jpg",
  "price": 23.99
},
{
  "sku": "a002",
  "name": "Food Title Two",
  "url":"assets/photo-02.jpg",
  "price": 12.99
},
{
  "sku": "a003",
  "name": "Food Title Three",
  "url":"assets/photo-03.jpg",
  "price": 17.50
},
{
  "sku": "a004",
  "name": "Food Title Four",
  "url":"assets/photo-04.jpg",
  "price": 12.50
},
{
  "sku": "a005",
  "name": "Food Title Five",
  "url":"assets/photo-05.jpg",
  "price": 23.99
},
{
  "sku": "a006",
  "name": "Food Title Six",
  "url":"assets/photo-06.jpg",
  "price": 20.99
},
{
  "sku": "a007",
  "name": "Food Title Seven",
  "url":"assets/photo-07.jpg",
  "price": 13.50
},
{
  "sku": "a008",
  "name": "Food Title Eight",
  "url":"assets/photo-08.jpg",
  "price": 12.50
},
{
  "sku": "a009",
  "name": "Food Title Nine",
  "url":"assets/photo-09.jpg",
  "price": 23.99
}
]


var trashArr = []
var favArr = []
var trashPage
var listPage

class Swipe extends Component {

  constructor(props) {
    super(props)
    this.state = {"trash": 0,
    "shortlist": 0,
    "trashDialogCSS": "dialog",
    "shortlistDialogCSS":"dialog",
    "products": Utils.skuProducts(images),
  }

    this.state.products = Utils.skuProducts(images)
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
    trashPage = document.getElementById('trash-page')
    trashBtn.addEventListener('click', () => {
      trashPage.setAttribute('class','showed')
      this.props.pageUpdate('trash-page')
    })

  }

  trashProduct() {
    let doms = document.querySelectorAll('#swipe-wrapper li.layer')
    let last = doms.length - 1
    let duration = 0.4
    doms[last].setAttribute('style','transition: all ' + duration + 's linear; left: -1000px ')
    let sku = doms[last].getAttribute('data-sku')

    trashArr.push(this.state.products[sku])
    this.setState({trash: trashArr.length})
    this.setState({trashDialogCSS: "dialog showed bump"})

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
    favArr.push(this.state.products[sku])
    this.setState({shortlist: favArr.length})
    this.setState({shortlistDialogCSS: "dialog showed bump"})
    setTimeout(()=>{
      doms[last].remove()
      this.setState({shortlistDialogCSS: "dialog showed"})
    },duration*1000)
  }

  componentDidMount() {

    let marginLeft = Utils.leftMargin()
    let doms = document.querySelectorAll('#swipe-wrapper li.layer img')
    for (let key in doms) {
      if (doms.hasOwnProperty(key)) {
        doms[key].setAttribute('style','margin-left: -' + marginLeft + 'px')
      }
    }
    Utils.preload(images,()=>{
      let doms = document.querySelectorAll('#swipe-wrapper li.layer')
      for (let key in doms) {
        if (doms.hasOwnProperty(key)) {
          doms[key].setAttribute('style','display: block')
          doms[key].setAttribute('data-id',key)
        }
      }
    })
    this.triggerNav()
  }

  componentDidUpdate() {
    if (this.props.curPage == 'home-page') {
      trashPage.setAttribute('class','')
    }
  }

  render() {

    let myStyle = {'display': 'none'}
    let swipeContent = images.map((image) => {
      let info = image.name + ' <br/> $' + image.price
      return (<li className="layer" style={myStyle} data-sku={image.sku}>
              <img src={image.url} />
              <div className="gra-bg">
                <span className="info" dangerouslySetInnerHTML={{__html: info}}></span>
              </div>
            </li>)
    })


    let trashContent = trashArr.map((item) => {
      return (
        <li>
          <div className="thumb">
            <img src={item.url}/>
          </div>
          <div className="info">
            <div className="info-content">
              {item.name}
              <div className="price-tag">${item.price}</div>
            </div>
          </div>
          <div className="add-to-cart">
            <span className="small">Add To</span>
            <span className="big">Cart</span>
          </div>
        </li>
      )
    })

    let trashDialogClass, shortlistDialogClass

    let trashPage = (<div id="trash-page" className={this.state.trashPageIn}>
      <h3>Trash list</h3>
      <ul>{trashContent}</ul>
    </div>)

    let swipePage = (
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

    return (
      <div className="pages-wrapper">
        {trashPage}
        {swipePage}
      </div>
    )

  }
}

export default Swipe
