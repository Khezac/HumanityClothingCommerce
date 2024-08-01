import styles from './styles.module.css'
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { LiaArrowsAltVSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import { AdminProductCard } from '../../components/AdminProductCard';

export type ProductType = {
    product_id: number,
    name: string,
    gender: string,
    unit_price: string,
    category: string,
    imageURL: string
}

export const AdminProductList = () => {
    const [productList, setProductList] = useState<ProductType[]>();

    const getProductsData = async () => {
        try {
            const { data } = await getAllProducts();
            setProductList(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])

    const handleOrganize = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        console.log("organiza: " + e.currentTarget.id)
    }

    return (
        <main className={styles.pageContainer}>
            <section className={styles.topSection}>
                <div className={styles.sectionTitle}>
                    <h1>Produtos</h1>
                    <p>{productList?.length} Itens cadastrados</p>
                </div>
                <div className={styles.searchBarContainer}>
                    <div className={styles.searchBar}>
                        <input className={styles.searchBarInput} type="text" placeholder="Nome do produto" />
                        <FaSearch className={styles.searchIcon} size={25} color='#56876D' />
                    </div>
                    <button className={styles.addProductBtn}><CiCirclePlus size={30} color='#DCE4DC' />Adicionar Produto</button>
                </div>
            </section>
            <table className={styles.productTable}>
                <thead>
                    <tr className={styles.tableHead}>
                        <th className={styles.productNameColumnHead}><p id='Produto' onClick={(e) => { handleOrganize(e) }}>Produto<LiaArrowsAltVSolid /></p></th>
                        <th style={{ width: 17.5 + "%" }}><p id='Categoria' onClick={(e) => { handleOrganize(e) }}>Categoria<LiaArrowsAltVSolid /></p></th>
                        <th style={{ width: 17.5 + "%" }}><p id='Genero' onClick={(e) => { handleOrganize(e) }}>Gênero<LiaArrowsAltVSolid /></p></th>
                        <th style={{ width: 17.5 + "%" }}><p id='Preco' onClick={(e) => { handleOrganize(e) }}>Preço<LiaArrowsAltVSolid /></p></th>
                        <th style={{ width: 5 + "%" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {productList && productList.map((product: ProductType) => {
                        return (
                            <AdminProductCard key={product.product_id} product={product} />
                        )
                    })
                    }
                </tbody>
            </table>
        </main>
    )
}