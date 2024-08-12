import styles from './styles.module.css'
import { SlOptions } from "react-icons/sl"
import { ProductType } from "../../pages/AdminProductList"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { deleteProductById } from '../../services/productService'
import { useNavigate } from 'react-router'

type AdminCardProps = {
    product: ProductType,
    setProductList: Dispatch<SetStateAction<ProductType[] | undefined>>,
    setSearchResult: Dispatch<SetStateAction<ProductType[] | undefined>>,
    productList: ProductType[],
}

export const AdminProductCard = ({ product, setProductList, setSearchResult }: AdminCardProps) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [willDelete, setWillDelete] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const optionsBtnRef = useRef<HTMLTableCellElement>(null);
    const optionsBoxRef = useRef<HTMLUListElement>(null);

    const navigate = useNavigate();

    const deleteProduct = async (id: number) => {
        try {
            const { data } = await deleteProductById(id);
            setProductList((prev) => prev?.filter((element) => element.product_id != id))
            setSearchResult((prev) => prev?.filter((element) => element.product_id != id))
            return data;
        } catch (err) {
            console.log(err)
            return;
        }
    }

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

    const handleDelete = async () => {
        setIsDeleting(true)
        setVisible(false);
        setWillDelete(false);
        let response = null;

        response = await deleteProduct(product.product_id)

        if (response != null) {
            setIsDeleting(false)
        }
    }

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
                {isDeleting ?
                    <l-ring-2
                        size="40"
                        stroke="5"
                        stroke-length="0.25"
                        bg-opacity="0.1"
                        speed="0.8"
                        color="#56876D"
                    ></l-ring-2>
                    :
                    <SlOptions
                        size={30}
                        className={styles.options}
                        onClick={() => { setVisible(prev => !prev) }}
                    />}
                {visible && !willDelete ?
                    <ul ref={optionsBoxRef} className={styles.optionsBox}>
                        <li
                            className={styles.clickableOption}
                            onClick={() => navigate('/details/' + product.product_id)}>
                            Ver detalhes
                        </li>
                        <li
                            className={styles.clickableOption}
                            onClick={() => navigate('/edit/' + product.product_id)}>
                            Editar
                        </li>
                        <li
                            className={styles.clickableOption}
                            style={{ color: "#FF8B8B" }}
                            onClick={() => setWillDelete(prev => !prev)}>
                            Excluir
                        </li>
                    </ul>
                    : visible && willDelete &&
                        <ul ref={optionsBoxRef} className={styles.optionsBox}>
                            <li className={styles.deleteBoxTitle}
                                onClick={() => console.log("navega para pagina do produto")}>
                                Deseja mesmo excluir?
                            </li>
                            <li
                                className={styles.clickableOption}
                                onClick={handleDelete}>
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
                }
            </td>
        </tr>
    )
}