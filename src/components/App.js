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
        <Swipe mainState={this.props.mainState} />
        <Menu />
      </div>)
  }
}

export default App
