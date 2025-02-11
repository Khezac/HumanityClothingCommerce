import { useEffect, useState } from "react"
import { ProductType } from "../../types"
import styles from "./styles.module.css"
import { ProductCard } from "../ProductCard"


type TopVendasProps = {
    products: ProductType[]
}

export const TopVendas = (props: TopVendasProps) => {
    const [products, setProducts] = useState<ProductType[]>();

    useEffect(() => {
        if(props.products){
            setProducts([]);
    
            const fourProducts = props.products.filter((element,index) => {
                if(index < 4) {
                    return element;
                }
            })
    
            setProducts(fourProducts);
        }
    },[])

    return (
        <section className={styles.topVendasContainer}>
            <p className={styles.topVendasTitle}>Top Vendas</p>
            <div className={styles.cardList}>
                {products && 
                    products.map((element) => {
                        return (
                            <ProductCard item={element} key={element.product_id}/>
                        )
                    })
                }
            </div>
        </section>
    )
}