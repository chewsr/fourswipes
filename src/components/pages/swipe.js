import React, { Component } from 'react'
import { Utils } from '../Utils'

class Swipe extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sliderWidth: 0,
      itemWidth: 0,
      totalSlides: 0,
      imageLeft: 0,
      curSlide: 0,
      curX: 0,
      animation: '0s'
    }

    this.statics = {
      loadSlider: false,
      touchStartX: 0,
      touchMoveX: 0,
      touchEndX: 0,
      timeStart: 0
    }
  }

  touchStart(evt) {
    this.statics.touchStartX = evt.touches[0].pageX
    this.setState({
      animation: '0s'
    })

    this.statics.timeStart = Math.floor(Date.now())
  }

  touchMove(evt) {
    evt.preventDefault()
    this.statics.touchMoveX = evt.touches[0].pageX
    this.fingerMove()
  }

  touchEnd(evt) {
    //console.log(evt.changedTouches[0].pageX)
    this.statics.touchEndX = evt.changedTouches[0].pageX
    let duration = Math.floor(Date.now()) - this.statics.timeStart
    console.log(duration)
    let range = Math.abs(this.statics.touchEndX - this.statics.touchStartX)
    this.setState({
      animation: '0.2s'
    })

    if (range > 120 || (duration < 150 && range > 20)) {
      if ((this.statics.touchEndX - this.statics.touchStartX < 0)) {
        this.moveLeft()
        console.log('left')
      } else {
        this.moveRight()
        console.log('right')
      }
    }

    if (range > 0 && (this.state.curSlide == 0 || this.state.curSlide == this.state.totalSlides - 1)) {
      this.setState({
        curX: 0,
        animation: '0.2s'
      })
    } else if (range > 0) {
      this.setState({
        curX: 0,
        animation: '0.2s'
      })
    }

  }

  moveLeft() {
      if (this.state.curSlide < this.state.totalSlides - 1) {
        let curSlide = this.state.curSlide
        console.log(curSlide)
        this.setState({
          curSlide: curSlide+1,
          curX: 0
        })
      }
  }

  moveRight() {
    if (this.state.curSlide > 0) {
      let curSlide = this.state.curSlide
      console.log(curSlide)
      this.setState({
        curSlide: curSlide-1,
        curX: 0
      })
    }
  }

  fingerMove() {
    let range = this.statics.touchMoveX - this.statics.touchStartX
    this.setState({
      curX: range
    })
  }

  componentDidUpdate(){
    if (this.props.products.length > 0 && !this.statics.loadSlider) {
      let itemWidth = Utils.pageWidth()
      let totalSlides = this.props.products.length
      let imageLeft = Utils.leftMargin()
      this.setState({
        sliderWidth: itemWidth * totalSlides,
        itemWidth: itemWidth,
        totalSlides: totalSlides,
        imageLeft: imageLeft
      })
      this.statics.loadSlider = true
    }
  }

  componentDidMount(){
  }

  render() {

    let products = []
    let width = 0
    let prevSlide = this.state.curSlide - 1
    let nextSlide = this.state.curSlide + 1

    let imageStyle = {
      left: -this.state.imageLeft
    }

    if (typeof this.props.products != 'undefined') {

      var slide = 0
      products = this.props.products.map(item => {

        let left = 0
        let titleClass = 'title'
        if (slide == this.state.curSlide) {
          left = 0 + this.state.curX
          titleClass = 'title up'
        } else if (slide < this.state.curSlide - 1) {
          left = -this.state.itemWidth
        } else if (slide > this.state.curSlide + 1) {
          left = this.state.itemWidth
        } else if (slide == this.state.curSlide - 1) {
          left = -this.state.itemWidth + this.state.curX
        } else if (slide == this.state.curSlide + 1) {
          left = this.state.itemWidth + this.state.curX
        }

        let itemStyle = {
          width: this.state.itemWidth,
          transform: 'translateX(' + left + 'px)',
          transition: 'transform ' + this.state.animation + ' linear'
        }

        let slideId = 'slide-' + slide
        slide++


        return (
          <li key={item.sku} style={itemStyle} id={slideId}>
            <img src={item.url} style={imageStyle}/>
            <div className={titleClass}><h3>{item.name} <i className="fa fa-arrow-up"></i></h3>
              <h4>$ {item.price}</h4>
              <div className="add-to-cart-btn"><i className="fa fa-cart-plus"></i></div>
              <div className="add-to-favorite-btn"><i className="fa fa-heart-o"></i></div>

            </div>
          </li>
        )

      })
    }

    let sliderStyle = {
      width: this.state.sliderWidth
    }

    return (
      <div id="swipe-page">
        <ul
          style={sliderStyle}
          onTouchStart={this.touchStart.bind(this)}
          onTouchMove={this.touchMove.bind(this)}
          onTouchEnd={this.touchEnd.bind(this)}
        >
          {products}
        </ul>
      </div>
    )
  }
}

export default Swipe
