import { useEffect, useState } from 'react'
import { ProductListPageBanner } from '../../components/ProductListPageBanner'
import { getAllProducts } from '../../services/productService'
import { ProductType } from '../../types'
import styles from './styles.module.css'
import { ring2 } from 'ldrs'
import { ProductList } from '../../components/ProductList'

export const ProductListPage = () => {
    const [products, setProducts] = useState<ProductType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    ring2.register();

    const getProductsData = async () => {
        setIsLoading(true);
        try{
            const {data} = await getAllProducts();
            setProducts(data)
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getProductsData()
    },[])

    return (
        <main className={styles.pageContainer}>
            <ProductListPageBanner/>
            <ProductList 
                products={products as ProductType[]}
                isLoading={isLoading}
            />
        </main>
    )
}