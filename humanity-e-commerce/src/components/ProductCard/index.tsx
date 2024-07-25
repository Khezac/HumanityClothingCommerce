import styles from './styles.module.css'

type ProductCardProps = {
    item: {
        src: string,
        name: string,
        category: string,
        price: number
    }
}

export const ProductCard = ({ item }: ProductCardProps) => {
    return (
        <div className={styles.productCard}>
            <img className={styles.productImg} src={item.src}/>
            <div className={styles.productInfo}>
                <div>
                    <p>{item.name}</p>
                    <p className={styles.productCategory}>{item.category}</p>
                </div>
                <p>R$ {item.price.toFixed(2)}</p>
            </div>
        </div>
    )
}