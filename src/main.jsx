import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomeCSS from '../src/styles/home.module.css'
import singleEmployeeViewCSS from '../src/styles/SingleEmployeeView.module.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
