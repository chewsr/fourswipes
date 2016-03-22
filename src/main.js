import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './state/reducers'

import AppContainer from './containers/AppContainer'

let store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
  , document.getElementById('root'))

export let __hotReload = true
