import { ProductType } from '../../types'
import styles from './styles.module.css'

type ProductCardProps = {
        item: ProductType;
}

export const ProductCard = ({ item }: ProductCardProps) => {
    return (
        <div className={styles.productCard}>
            <img className={styles.productImg} src={`data:${item.images[0].type};base64,${item.images[0].bytes}`}/>
            <div className={styles.productInfo}>
                <div>
                    <p>{item.name}</p>
                    <p className={styles.productCategory}>{item.category}</p>
                </div>
                <p>R$ {parseFloat(item.unit_price).toFixed(2)}</p>
            </div>
        </div>
    )
}