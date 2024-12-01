import { ProductType } from '../../types'
import { ProductListCard } from '../ProductListCard'
import styles from './style.module.css'

type ProductListProps = {
    isLoading: boolean,
    products: ProductType[]
}

export const ProductList = ({products, isLoading}:ProductListProps) => {
    return(
        <div className={styles.cardsContainer}>
                {   isLoading ?
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
                    : products && !isLoading ? 
                    products.map((element, index) => {
                        return (
                            <ProductListCard item={element} key={index}/>
                        )
                    })
                    : 
                    <p className={styles.notFound}>Erro ao carregar produtos</p>
                }
            </div>
    )
}