import React, { Component } from 'react'
import App from '../components/App'
import Menu from '../components/Menu'

class AppContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      curPage: "home-page"
    }
  }

  pageUpdate(page){
    this.setState({
      curPage: page
    })
  }

  getPage(page){
    this.setState({
      curPage: page
    })
  }

  render () {
    return (
            <div className="my-app">
              <App pageUpdate={this.pageUpdate.bind(this)} curPage={this.state.curPage}/>
              <Menu data={this.state.curPage} getPage={this.getPage.bind(this)}/>
            </div>
          )
  }
}

export default AppContainer
