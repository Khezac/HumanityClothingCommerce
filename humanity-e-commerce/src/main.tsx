import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Home } from './pages/Home'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header/>
    <Home/>
    <Footer/>
  </React.StrictMode>,
)
