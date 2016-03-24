import React, { Component } from 'react'

class Shortlist extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let pages = this.props.mainState.pages

    let shortlistCss = 'shortlist-container'

    if (pages.shortlist) {
      shortlistCss = 'shortlist-container show'
    }
    return (
      <div id='shortlist-page' className={shortlistCss}>
        <h3>Short list</h3>
      </div>
    )
  }
}

export default Shortlist
