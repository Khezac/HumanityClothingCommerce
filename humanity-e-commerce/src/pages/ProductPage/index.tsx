import { ChangeEvent, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { ProductPageRadio } from '../../components/Forms/ProductPageRadio';
import { useParams } from 'react-router';
import { getAllProducts, getProductById } from '../../services/productService';
import { ImageType, ProductType } from '../../types';
import { ProductPageImages } from '../../components/ProductPageImages';
import { FaPlus, FaMinus } from "react-icons/fa";
import { RecomendedProductCard } from '../../components/RecomendedProductCard';

export const ProductPage = () => {

    const [labelChecked, setLabelChecked] = useState(''); // State utilizada para mudar a cor da label do inputRadio
    const [product, setProduct] = useState<ProductType>();
    const [recomendations, setRecomendations] = useState<ProductType[]>();
    const [amount, setAmount] = useState<number>(0);
    // const [sizes, setSizes] = useState();

    const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    const { id } = useParams();

    const getProductData = async (id: string) => {
        try {
            const { data } = await getProductById(id);
            setProduct(data)
            getSizesList(data?.size)
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

    const getSizesList = (sizes: string) => {
        console.log(sizes)
        // const sizeArray = Array.from(sizes.slice());
        // setSizes(sizeArray);
        // LÓGICA DE ARMAZENAMENTO DE TAMANHOS DEVERÁ SER REFATORADA
    }

    return (
        <main className={styles.pageContainer}>
            {product &&
                <>
                    <section className={styles.firstSection}>
                        <ProductPageImages
                            images={product?.images as ImageType[]}
                        />
                        <div className={styles.productBuyInfo}>
                            <div className={styles.productMainInfo}>
                                <h1 className={styles.productName}>{product.name}</h1>
                                <p className={styles.productCategory}>{product.category}</p>
                                <p className={styles.productPrice}>R$ {parseFloat(product.unit_price).toFixed(2)}</p>
                            </div>
                            <div className={styles.productSize}>
                                <p className={styles.sizeTitle}>Tamanho(s):</p>
                                <ul className={styles.sizeBoxWrapper}>
                                    <li className={styles.inputContainer}>
                                        <ProductPageRadio
                                            id='size-3'
                                            labelChecked={labelChecked}
                                            setLabelChecked={setLabelChecked}
                                            name='size'
                                            value='G'
                                            handleChange={handleRadio}
                                        />
                                    </li>
                                    <li className={styles.inputContainer}>
                                        <ProductPageRadio
                                            id='size-2'
                                            labelChecked={labelChecked}
                                            setLabelChecked={setLabelChecked}
                                            name='size'
                                            value='P'
                                            handleChange={handleRadio}
                                        />
                                    </li>
                                    <li className={styles.inputContainer}>
                                        <ProductPageRadio
                                            id='size-1'
                                            labelChecked={labelChecked}
                                            setLabelChecked={setLabelChecked}
                                            name='size'
                                            value='M'
                                            handleChange={handleRadio}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.btnContainer}>
                                <label htmlFor='amount'>
                                    Quantidade:
                                </label>
                                <div className={styles.amountInputContainer}>
                                    <button
                                        className={styles.amountInputBtns}
                                        onClick={() => amount > 0 ? setAmount((prev) => prev - 1) : ''}
                                    >
                                        <FaMinus size={20} color='#F5F6F5' />
                                    </button>
                                    <input
                                        className={styles.amountInput}
                                        name='amount'
                                        type="number"
                                        min="0"
                                        max="100"
                                        step='1'
                                        placeholder='0'
                                        value={amount}
                                        disabled
                                    />
                                    <button
                                        className={styles.amountInputBtns}
                                        onClick={() => amount < 100 && setAmount((prev) => prev + 1)}
                                    >
                                        <FaPlus size={20} color='#F5F6F5' />
                                    </button>
                                </div>
                                <button className={styles.cartBtn}>Adicionar ao carrinho</button>
                                <button className={styles.buyBtn}>Comprar produto</button>
                            </div>
                        </div>
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
                            />
                        )
                    }
                    })}
                </div>
            </section>
        </main>
    )
}