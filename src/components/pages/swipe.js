import React, { Component } from 'react'
import {Utils} from '../Utils.js'

const ICON_TRASH = 'assets/images/icon-trash.svg'
const ICON_FAVOURITE = 'assets/images/icon-plus.svg'
const ICON_LOGO = 'assets/images/chewsr-logo.svg'
var touchStartX,
    touchEndX


class Swipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shortlist: 0,
      trashDialogCSS: "dialog",
      shortlistDialogCSS: "dialog",
      slideCSS: "hidden"
    }
  }


  init(products){
      if (this.state.slideCSS == 'hidden') {
        Utils.preload(products,()=>{
          this.setState({
            slideCSS: ""
          })
          this.centerImages()
        })
      }
  }

  pageUpdate(evt){
    let page = evt.currentTarget.getAttribute('data-page')
    let sku = evt.currentTarget.getAttribute('data-sku')
    this.props.pageUpdate(page,sku)
  }

  pagePopup(evt){
    let page = evt.currentTarget.getAttribute('data-page')
    let sku = evt.currentTarget.getAttribute('data-sku')
    this.props.pagePopup(page,sku)
  }

  centerImages(){
    let marginLeft = Utils.leftMargin()
    let doms = document.querySelectorAll('#swipe-wrapper li.layer img')

    let content = ''

    for (let key in doms) {
      if (typeof doms[key] == 'object') {
        doms[key].setAttribute('style','margin-left: -' + marginLeft + 'px')
      }
    }
  }

  removeItem(sku){
    this.props.removeFromSwipe(sku)
  }


  triggerNav() {

    /*
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
    */

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

    this.setState({trashDialogCSS: "dialog showed bump"})
    this.props.addToTrash(sku)

    setTimeout(()=>{
      this.removeItem(sku)
      this.setState({trashDialogCSS: "dialog showed"})
    },duration*1000)
  }

  addProduct() {
    let doms = document.querySelectorAll('#swipe-wrapper li.layer')
    let last = doms.length - 1
    let duration = 0.4
    doms[last].setAttribute('style','transition: all ' + duration + 's linear; left: 1000px ')
    let sku = doms[last].getAttribute('data-sku')
    this.setState({shortlistDialogCSS: "dialog showed bump"})
    this.props.addToShort(sku)

    setTimeout(()=>{
      this.removeItem(sku)
      this.setState({shortlistDialogCSS: "dialog showed"})
    },duration*1000)
  }

  touchStart(evt) {
    touchStartX = evt.touches[0].pageX
  }

  touchMove(evt) {
    evt.preventDefault()
    //console.log(evt.touches[0].pageX, evt.touches[0].pageY)
  }

  touchEnd(evt) {
    //console.log(evt.changedTouches[0].pageX)
    touchEndX = evt.changedTouches[0].pageX
    let range = Math.abs(touchEndX - touchStartX)

    if (range > 50) {
      if ((touchEndX - touchStartX < 0)) {
        this.trashProduct()
      } else {
        this.addProduct()
      }
    }
  }

  componentDidUpdate(){

    if (this.props.swipeList.length > 0) {
      this.init(this.props.products)
    }
  }

  componentDidMount(){

    this.triggerNav()
  }

  render() {

    let trashItems = this.props.trashList.length
    let shortItems = this.props.shortList.length

    let swipeContent = this.props.swipeList.map((sku) => {
      let item = this.props.products[sku]
      let layerClass = "layer " + this.state.slideCSS
      return (<li key={item.sku} className={layerClass} data-sku={item.sku}>
              <img src={item.url} />
              <div className="gra-bg">
                <span className="info" data-sku={item.sku} onClick={this.pagePopup.bind(this)} data-page="popup-page">{item.name}<br/>${item.price}</span>
              </div>
            </li>)
    })

    return (
        <div id="swipe-page"
          onTouchStart={this.touchStart.bind(this)}
          onTouchMove={this.touchMove.bind(this)}
          onTouchEnd={this.touchEnd.bind(this)}>
          <ul id="swipe-wrapper">
            <li className="loading"><span><img src={ICON_LOGO} className="logo"/></span></li>
            {swipeContent}
          </ul>
          <div className="select-nav">
            <div className="trash-wrapper">
              <div className="btn" id="trash-list-btn"><img src={ICON_TRASH}/></div>
              <div className={this.state.trashDialogCSS}>
                <span>{trashItems}</span>
              </div>
            </div>
            <div className="plus-wrapper">
              <div className="btn" id="short-list-btn"><img src={ICON_FAVOURITE}/></div>
              <div className={this.state.shortlistDialogCSS}>
                <span>{shortItems}</span>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default Swipe
