import { FirstBanner } from "../../components/HomeFirstBanner"
import styles from "./styles.module.css"
import { TopVendas } from "../../components/TopVendas"
import { RedesBanner } from "../../components/RedesBanner"
import { Essenciais } from "../../components/Essenciais"
import { Navegue } from "../../components/Navegue"
import { useEffect, useState } from "react"
import { getAllProducts } from "../../services/productService"
import { ProductType } from "../../types"

export const Home = () => {

    const [products, setProducts] = useState<ProductType[]>();

    const getProductsData = async () => {
        try{
            const {data} = await getAllProducts();
            setProducts(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProductsData()
    },[])

    return (
        <main className={styles.homeContainer} onClick={() => console.log(products)}>
            <FirstBanner/>
            {products && products.length > 3 &&
                <TopVendas
                    products={products as ProductType[]}
                />
            }
            <Navegue/>
            <RedesBanner/>
            <Essenciais/>
        </main>
    )
}