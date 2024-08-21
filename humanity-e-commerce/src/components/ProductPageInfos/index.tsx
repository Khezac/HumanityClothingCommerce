import { FaMinus, FaPlus } from 'react-icons/fa'
import { ProductPageRadio } from '../Forms/ProductPageRadio'
import styles from './styles.module.css'
import { ProductType } from '../../types'
import { ChangeEvent, useState } from 'react'

type BuyPageProps = {
    product: ProductType,
}

export const ProductPageInfos = (props :BuyPageProps) => {
    const [labelChecked, setLabelChecked] = useState(''); // State utilizada para mudar a cor da label do inputRadio
    const [amount, setAmount] = useState<number>(0);

    const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
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
    )
}