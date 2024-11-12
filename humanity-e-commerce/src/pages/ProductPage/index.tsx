import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getAllProducts, getProductById } from '../../services/productService';
import { CartType, ImageType, ProductType } from '../../types';
import { ProductPageImages } from '../../components/ProductPageImages';
import { RecomendedProductCard } from '../../components/RecomendedProductCard';
import { ProductPageInfos } from '../../components/ProductPageInfos';
import { ring2 } from 'ldrs';

export const ProductPage = () => {
    const [product, setProduct] = useState<ProductType>();
    const [recomendations, setRecomendations] = useState<ProductType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { id } = useParams();

    ring2.register()

    const getProductData = async (id: string) => {
        setIsLoading(true)
        try {
            const { data } = await getProductById(id);
            setProduct(data)
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    const getRecomendedProducts = async () => {
        setIsLoading(true)
        try {
            const { data } = await getAllProducts();
            setRecomendations(data)
        } catch (err) {
            console.log(err)
        }
    }

    const newCartProduct = (newCart: CartType) => {
        console.log(newCart)
        // AQUI SERÁ FEITO UM POST DO PRODUTO NO CARRINHO COM TODO O TRY E CATCH
    }

    useEffect(() => {
        getProductData(id as string);
        getRecomendedProducts();
    }, [])

    return (
        <main className={styles.pageContainer}>
            {isLoading ?
                <div className={styles.loadingContainer}>
                    <l-ring-2
                        size="80"
                        stroke="12"
                        stroke-length="0.25"
                        bg-opacity="0.1"
                        speed="0.8"
                        color="#56876D"
                    ></l-ring-2>
                </div>
                :
                product && !isLoading //PAREI AQUI
                    ?
                    <>
                        <section className={styles.firstSection}>
                            <ProductPageImages
                                images={product?.images as ImageType[]}
                            />
                            <ProductPageInfos
                                product={product}
                                newCartProduct={newCartProduct}
                            />
                        </section>
                        <div style={{ marginBottom: 1 + "rem" }}>
                            <h1 className={styles.descriptionTitle}>
                                Descrição do produto:
                            </h1>
                            <p>{product.description}</p>
                        </div>
                    </>
                    :
                    <p className={styles.loadingContainer}>Falha ao encontrar produto!</p>
            }
            {!isLoading &&
                <section className={styles.recomendedProducts}>
                    <h1>Produtos Recomendados</h1>
                    <div className={styles.carrousel}>
                        {recomendations && recomendations.map((element, index) => {
                            if (index <= 10) {
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
            }
        </main>
    )
}