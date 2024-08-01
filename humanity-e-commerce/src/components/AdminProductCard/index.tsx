import styles from './styles.module.css'
import { SlOptions } from "react-icons/sl"
import { ProductType } from "../../pages/AdminProductList"
import { useEffect, useRef, useState } from 'react'

type AdminCardProps = {
    product: ProductType
}

export const AdminProductCard = ({ product }: AdminCardProps) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [willDelete, setWillDelete] = useState<boolean>(false);

    const optionsBtnRef = useRef<HTMLTableCellElement>(null);
    const optionsBoxRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                optionsBtnRef.current &&
                !optionsBtnRef.current.contains(event.target as Node) &&
                optionsBoxRef.current &&
                !optionsBoxRef.current.contains(event.target as Node)
            ) {
                setTimeout(() => {
                    setVisible(false);
                    setWillDelete(false)
                }, 100);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <tr className={styles.productInfoRow}>
            <td className={styles.productNameColumn}>
                <img className={styles.productImg} src={product.imageURL[0]} alt='Foto do produto' />
                <p>{product.name}</p>
            </td>
            <td style={{ width: 17.5 + "%" }}>
                {product.category}
            </td>
            <td style={{ width: 17.5 + "%" }}>
                {product.gender[0] + product.gender.slice(1).toLowerCase()}
            </td>
            <td style={{ width: 17.5 + "%" }}>
                R$ {parseFloat(product.unit_price).toFixed(2)}
            </td>
            <td ref={optionsBtnRef} style={{ width: 5 + "%", position: "relative" }}>
                <SlOptions
                    size={30}
                    className={styles.options}
                    onClick={() => { setVisible(prev => !prev) }}
                />
                {visible && !willDelete ?
                    <ul ref={optionsBoxRef} className={styles.optionsBox}>
                        <li
                            className={styles.clickableOption}
                            onClick={() => console.log("navega para pagina do produto")}>
                            Ver detalhes
                        </li>
                        <li
                            className={styles.clickableOption}
                            onClick={() => console.log("navega para pagina do form do produto")}>
                            Editar
                        </li>
                        <li
                            className={styles.clickableOption}
                            style={{ color: "#FF8B8B" }}
                            onClick={() => setWillDelete(prev => !prev)}>
                            Excluir
                        </li>
                    </ul>
                    : visible && willDelete ?
                        <ul ref={optionsBoxRef} className={styles.optionsBox}>
                            <li className={styles.deleteBoxTitle}
                                onClick={() => console.log("navega para pagina do produto")}>
                                Deseja mesmo excluir?
                            </li>
                            <li
                                className={styles.clickableOption}
                                onClick={() => console.log("Deleta o produto")}>
                                Sim
                            </li>
                            <li
                                className={styles.clickableOption}
                                style={{ color: "#FF8B8B" }}
                                onClick={() => {
                                    setWillDelete(false)
                                    setVisible(false)
                                }}>
                                Não
                            </li>
                        </ul>
                        :
                        <p></p>
                }
            </td>
        </tr>
    )
}