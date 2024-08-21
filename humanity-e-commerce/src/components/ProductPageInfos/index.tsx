import { FaMinus, FaPlus } from 'react-icons/fa'
import { ProductPageRadio } from '../Forms/ProductPageRadio'
import styles from './styles.module.css'
import { CartType, ProductType } from '../../types'
import { ChangeEvent, useEffect, useState } from 'react'

type BuyPageProps = {
    product: ProductType,
    newCartProduct: (value:CartType) => void
}

export const ProductPageInfos = (props: BuyPageProps) => {
    const [labelChecked, setLabelChecked] = useState(''); // State utilizada para mudar a cor da label do inputRadio
    const [amount, setAmount] = useState<number>(0);
    const [sizes, setSizes] = useState<RegExpMatchArray>();
    const [selectedSize, setSelectedSize] = useState<string>();

    useEffect(() => {
        getSizeArray()
    }, [props.product])

    const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedSize(e.target.value)
    }

    const getSizeArray = () => {
        const sizeArray = props.product.size.match(/\b\d+\b|\b[A-Za-z]+\b/g)
        setSizes(sizeArray as RegExpMatchArray)
    }

    const insertIntoCart = () => {
        // ESSA FUNÇÂO È RESPONSÁVEL POR FAZER AS VALIDAÇÕES DE SELEÇÃO DE TAMANHO E QUANTIDADE E PERSISTIR NO CARRINHO

        // PRECISA DO SISTEMA DE LOGIN PARA CONSEGUIR GERAR ESSE CART

        const newCart: CartType = {
            cart_price: parseFloat(props.product?.unit_price) * amount,
            product_amount: amount,
            product_id: props.product.product_id,
            user_id: 1, // DEVERA SER O ID DE QUEM ESTÀ LOGADO NO MOMENTO
            selected_size: selectedSize as string
        }

        props.newCartProduct(newCart);
    }

    return (
        <div className={styles.productBuyInfo}>
            <div className={styles.productMainInfo}>
                <h1 className={styles.productName}>{props.product.name}</h1>
                <p className={styles.productCategory}>{props.product.category}</p>
                <p className={styles.productPrice}>R$ {parseFloat(props.product.unit_price).toFixed(2)}</p>
            </div>
            <div className={styles.productSize}>
                <p className={styles.sizeTitle}>Tamanho(s):</p>
                <ul className={styles.sizeBoxWrapper}>
                    {sizes && sizes.map((size, index) => {
                        return (
                            <li className={styles.inputContainer} key={size}>
                                <ProductPageRadio
                                    id={`size-${index}`}
                                    labelChecked={labelChecked}
                                    setLabelChecked={setLabelChecked}
                                    name='size'
                                    value={size}
                                    handleChange={handleRadio}
                                />
                            </li>
                        )
                    })}
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
                <button className={styles.cartBtn} onClick={insertIntoCart}>Adicionar ao carrinho</button>
                <button className={styles.buyBtn}>Comprar produto</button>
            </div>
        </div>
    )
}