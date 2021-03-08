import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/redux-store'
import reportWebVitals from './reportWebVitals'
import AppContainer from './components/app_Component/App.container'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <AppContainer/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
