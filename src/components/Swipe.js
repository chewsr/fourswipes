import React, { Component } from 'react'


var images = [
{"url":"assets/photo-01.jpg"},
{"url":"assets/photo-02.jpg"},
{"url":"assets/photo-03.jpg"},
{"url":"assets/photo-04.jpg"},
{"url":"assets/photo-05.jpg"},
{"url":"assets/photo-06.jpg"},
{"url":"assets/photo-07.jpg"},
{"url":"assets/photo-08.jpg"},
{"url":"assets/photo-09.jpg"}
]

class Swipe extends Component {

  constructor(props) {
    super(props)
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
    setTimeout(()=>{
      doms[last].remove()
    },duration*1000)
  }

  navAdd() {
    let doms = document.querySelectorAll('#swipe-wrapper li.layer')
    let last = doms.length - 1
    let duration = 0.4
    doms[last].setAttribute('style','transition: all ' + duration + 's linear; left: 1000px ')
    setTimeout(()=>{
      doms[last].remove()
    },duration*1000)
  }

  componentDidMount() {
    let marginLeft = this.leftMargin()
    let doms = document.querySelectorAll('#swipe-wrapper img')
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
      return (<li className="layer" style={myStyle}>
              <img src={image.url} />
            </li>)
    })

    return (
    <ul id='swipe-wrapper'>
      <li className="loading"><span>Loading</span></li>
      {content}
    </ul>
    )

  }
}

export default Swipe
