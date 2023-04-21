/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import RoutesElement from './Routes'
import FootArea from './containers/FootArea'
import './styles/index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <RoutesElement />
      <FootArea />
    </BrowserRouter>
  )
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
