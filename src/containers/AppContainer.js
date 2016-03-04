import React, { Component } from 'react'
import App from '../components/App'

class AppContainer extends Component {

  constructor(props){
    super(props)
  }


  render () {
    return (
            <div className="my-app">
              <App source="assets/data/products.json"/>
            </div>
          )
  }
}

export default AppContainer
