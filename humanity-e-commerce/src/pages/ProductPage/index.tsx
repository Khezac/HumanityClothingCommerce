import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getAllProducts, getProductById } from '../../services/productService';
import { ImageType, ProductType } from '../../types';
import { ProductPageImages } from '../../components/ProductPageImages';
import { RecomendedProductCard } from '../../components/RecomendedProductCard';
import { ProductPageInfos } from '../../components/ProductPageInfos';

export const ProductPage = () => {
    const [product, setProduct] = useState<ProductType>();
    const [recomendations, setRecomendations] = useState<ProductType[]>();
    // const [sizes, setSizes] = useState();

    const { id } = useParams();

    const getProductData = async (id: string) => {
        try {
            const { data } = await getProductById(id);
            setProduct(data)
        } catch (err) {
            console.log(err)
        }
    }

    const getRecomendedProducts = async () => {
        try {
            const { data } = await getAllProducts();
            setRecomendations(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProductData(id as string);
        getRecomendedProducts();
    }, [])

    return (
        <main className={styles.pageContainer}>
            {product &&
                <>
                    <section className={styles.firstSection}>
                        <ProductPageImages
                            images={product?.images as ImageType[]}
                        />
                        <ProductPageInfos
                            product={product}
                        />
                    </section>
                    <div style={{ marginBottom: 1 + "rem" }}>
                        <h1 className={styles.descriptionTitle}>
                            Descrição do produto:
                        </h1>
                        <p>{product.description}</p>
                    </div>
                </>
            }
            <section className={styles.recomendedProducts}>
                <h1>Produtos Recomendados</h1>
                <div className={styles.carrousel}>
                    {recomendations && recomendations.map((element, index) => {
                        if(index <= 10){
                        return (
                            <RecomendedProductCard
                                item={element}
                                key={element.product_id}
                            />
                        )
                    }
                    })}
                </div>
            </section>
        </main>
    )
}