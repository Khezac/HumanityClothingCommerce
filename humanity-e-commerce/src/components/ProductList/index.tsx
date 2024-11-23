import { ProductType } from '../../types'
import { ProductCard } from '../ProductCard'
import styles from './style.module.css'

type ProductListProps = {
    isLoading: boolean,
    products: ProductType[]
}

export const ProductList = ({products, isLoading}:ProductListProps) => {
    return(
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
    )
}