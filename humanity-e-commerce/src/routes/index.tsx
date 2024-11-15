import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { AdminCreateProduct } from "../pages/AdminCreateProduct"
import { AdminProductList } from "../pages/AdminProductList"
import { ProductPage } from "../pages/ProductPage"

export const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<AdminCreateProduct/>}/>
            <Route path="/edit/:id" element={<AdminCreateProduct/>}/>
            <Route path="/details/:id" element={<AdminCreateProduct/>}/>
            <Route path="/products" element={<AdminProductList/>}/>
            <Route path="/productPage/:id" element={<ProductPage/>}/>
        </Routes>
    )
}