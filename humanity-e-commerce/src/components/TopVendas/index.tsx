import { ProductCard } from "../ProductCard"
import styles from "./styles.module.css"

const produtos = [
    {
        src: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSW86cwXuwAVNmagFdFgva5TrD8otV0OCQLRadNXMqjI8W2nqkek9QfbiKE3gy56YXYffBoLygj1R1L2zX_30Kdmu3gb-wKt5MzRlexe2qdfNlM54WCYmuOjg&usqp=CAE",
        name: "Camisa oversized",
        category: "Camisa unisex",
        price: 29.99
    },
    {
        src: "https://acdn.mitiendanube.com/stores/001/965/629/products/ol-72-82ecc1ae5e1765d48c17002450184589-1024-1024.jpg",
        name: "Camisa oversized",
        category: "Camisa masculina",
        price: 30.00
    }
]

export const TopVendas = () => {
    return (
        <section className={styles.topVendasContainer}>
            <p className={styles.topVendasTitle}>Top Vendas</p>
            <div className={styles.cardList}>
                <ProductCard item={produtos[0]}/>
                <ProductCard item={produtos[1]}/>
                <ProductCard item={produtos[0]}/>
                <ProductCard item={produtos[1]}/>
            </div>
        </section>
    )
}