import React, { PropTypes, Component } from 'react'
import Swipe from './pages/swipe'
import Menu from './pages/menu'
import Shortlist from './pages/shortlist'

class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='mobile-wrapper'>
        <Shortlist mainState={this.props.mainState} />
        <Swipe mainState={this.props.mainState} />
        <Menu mainState={this.props.mainState} />
      </div>)
  }
}

export default App
