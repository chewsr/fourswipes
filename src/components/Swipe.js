import React, { Component } from 'react'


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

class Swipe extends Component {

  constructor(props) {
    super(props)
    this.state = {"trash": 0,
    "shortlist": 0,
    "trashDialogCSS": "dialog",
    "shortlistDialogCSS":"dialog"}
  }

  leftMargin() {
    let dom = document.getElementById('swipe-wrapper')
    let width = dom.offsetWidth
    let height = dom.offsetHeight
    let marginLeft = (height*0.75 - width)/2
    return marginLeft
  }

  triggerNav() {
    let doms = document.querySelectorAll('.button')
    for (let key in doms) {
      if (doms.hasOwnProperty(key)) {
        let myDom = doms[key]
        myDom.addEventListener('click', () => {
          let myClass = myDom.getAttribute('class')
          if (myClass.indexOf('left') > -1){
            this.navTrash()
          } else if (myClass.indexOf('right') > -1) {
            this.navAdd()
          }
        })
      }
    }
  }

  navTrash() {
    let doms = document.querySelectorAll('#swipe-wrapper li.layer')
    let last = doms.length - 1
    let duration = 0.4
    doms[last].setAttribute('style','transition: all ' + duration + 's linear; left: -1000px ')
    let sku = doms[last].getAttribute('data-sku')

    trashArr.push(sku)
    this.setState({trash: trashArr.length})
    this.setState({trashDialogCSS: "dialog showed bump"})

    setTimeout(()=>{
      doms[last].remove()
      this.setState({trashDialogCSS: "dialog showed"})
    },duration*1000)
  }

  navAdd() {
    let doms = document.querySelectorAll('#swipe-wrapper li.layer')
    let last = doms.length - 1
    let duration = 0.4
    doms[last].setAttribute('style','transition: all ' + duration + 's linear; left: 1000px ')
    let sku = doms[last].getAttribute('data-sku')
    favArr.push(sku)
    this.setState({shortlist: favArr.length})
    this.setState({shortlistDialogCSS: "dialog showed bump"})
    setTimeout(()=>{
      doms[last].remove()
      this.setState({shortlistDialogCSS: "dialog showed"})
    },duration*1000)
  }

  componentDidMount() {
    let marginLeft = this.leftMargin()
    let doms = document.querySelectorAll('#swipe-wrapper li.layer img')
    for (let key in doms) {
      if (doms.hasOwnProperty(key)) {
        doms[key].setAttribute('style','margin-left: -' + marginLeft + 'px')
      }
    }
    this.preload(()=>{
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

  preload(callback) {
    let imgArr = []
    let id = 0
    let total = images.length
    let loaded = 0
    images.map((img)=>{
      imgArr[id] = document.createElement( "img" );
			imgArr[id].src = img.url;
      imgArr[id].addEventListener('load', () => {
        loaded++
        if (loaded == total) {
          callback()
        }
      })
      id++
    })

  }

  render() {
    let myStyle = {'display': 'none'}
    var content = images.map((image) => {

      let info = image.name + ' <br/> $' + image.price

      return (<li className="layer" style={myStyle} data-sku={image.sku}>
              <img src={image.url} />
              <div className="gra-bg">
                <span className="info" dangerouslySetInnerHTML={{__html: info}}></span>
              </div>
            </li>)
    })

    let trashDialogClass, shortlistDialogClass

    return (
    <ul id='swipe-wrapper'>
      <li className="loading"><span><img src="assets/chewsr-logo.svg" className="logo"/></span></li>
      {content}
      <div className="select-nav">
        <div className="trash-wrapper">
          <div className="btn"><img src="assets/icon-trash.svg"/></div>
          <div className={this.state.trashDialogCSS}>
            <span>{this.state.trash}</span>
          </div>
        </div>
        <div className="plus-wrapper">
          <div className="btn"><img src="assets/icon-plus.svg"/></div>
          <div className={this.state.shortlistDialogCSS}>
            <span>{this.state.shortlist}</span>
          </div>
        </div>
      </div>
    </ul>
    )

  }
}

export default Swipe
