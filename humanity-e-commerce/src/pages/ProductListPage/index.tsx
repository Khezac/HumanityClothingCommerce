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
            <div className={styles.contentContainer}>
                <div className={styles.filterContainer}>
                    <ul className={styles.genderList}>
                        <li className={styles.listTitle}>Gênero</li>
                    </ul>

                    <div className={styles.listSeparator}/>
                    
                    <ul className={styles.sizeList}>
                        <li className={styles.listTitle}>Tamanho</li>
                    </ul>
                </div>
                <ProductList 
                    products={products as ProductType[]}
                    isLoading={isLoading}
                />
            </div>
        </main>
    )
}