import React, { PropTypes, Component } from 'react'
import Swipe from './pages/swipe'
import Menu from './pages/menu'

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="mobile-wrapper">
        <Swipe products={this.props.products}/>
        <Menu />
      </div>)
  }
}

export default App
