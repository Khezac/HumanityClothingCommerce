import { useEffect, useState } from 'react'
import { ProductCard } from '../../components/ProductCard'
import { ProductListPageBanner } from '../../components/ProductListPageBanner'
import { getAllProducts } from '../../services/productService'
import { ProductType } from '../../types'
import styles from './styles.module.css'
import { ring2 } from 'ldrs'

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
            <div className={styles.cardsContainer}>
                {products && !isLoading ? 
                    products.map((element, index) => {
                        return (
                            <ProductCard item={element} key={index}/>
                        )
                    })
                    : isLoading ?
                    <div className={styles.loader}>
                        <l-ring-2
                            size="50"
                            stroke="8"
                            stroke-length="0.25"
                            bg-opacity="0.1"
                            speed="0.8"
                            color="#56876D"
                        ></l-ring-2>
                    </div>
                    :
                    <p className={styles.notFound}>Erro ao carregar produtos</p>
                }
            </div>
        </main>
    )
}