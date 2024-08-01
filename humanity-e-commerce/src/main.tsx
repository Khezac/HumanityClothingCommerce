import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Home } from './pages/Home'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { AdminProductList } from './pages/AdminProductList'
import { AdminCreateProduct } from './pages/AdminCreateProduct'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header/>
    {/* <Home/> */}
    {/* <AdminProductList/> */}
    <AdminCreateProduct/>
    <Footer/>
  </React.StrictMode>,
)
