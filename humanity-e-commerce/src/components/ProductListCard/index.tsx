import { useNavigate } from 'react-router';
import { ProductType } from '../../types'
import styles from './styles.module.css'

type ProductCardProps = {
        item: ProductType;
}

export const ProductListCard = ({ item }: ProductCardProps) => {

    const navigate = useNavigate();

    return (
        <div className={styles.productCard} onClick={() => {
            navigate('/productPage/' + item.product_id)
            window.location.reload()
        }
        }>
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