import { ProductListPageBanner } from '../../components/ProductListPageBanner'
import styles from './styles.module.css'

export const ProductListPage = () => {
    return (
        <main className={styles.pageContainer}>
            <ProductListPageBanner/>
        </main>
    )
}