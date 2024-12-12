import { useNavigate } from 'react-router';
import { ProductType } from '../../types'
import styles from './styles.module.css'

type RecomendedProductProps = {
        item: ProductType;
}

export const ProductCard = ({ item }: RecomendedProductProps) => {

    const navigate = useNavigate();

    return (
        <div className={styles.productCard} onClick={() => {
            navigate('/productPage/' + item.product_id)
            window.location.reload()
        }
        }>
            <div className={styles.productImgContainer}>
                <img className={styles.productImg} src={`data:${item.images[0].type};base64,${item.images[0].bytes}`}/>
            </div>
            <div className={styles.productInfo}>
                <div>
                    <p>{item.name}</p>
                    <p className={styles.productCategory}>{item.category}</p>
                </div>
                <p className={styles.price}>R$ {parseFloat(item.unit_price).toFixed(2)}</p>
            </div>
        </div>
    )
}