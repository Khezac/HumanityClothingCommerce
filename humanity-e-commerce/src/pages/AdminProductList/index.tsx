import styles from './styles.module.css'
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { LiaArrowsAltVSolid } from "react-icons/lia";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import { AdminProductCard } from '../../components/AdminProductCard';
import { useNavigate } from 'react-router';
import { ring2 } from 'ldrs'


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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<ProductType[]>();
    const [selectedOrder, setSelectedOrder] = useState<string>('');
    const navigate = useNavigate();

    ring2.register()

    const getProductsData = async () => {
        setIsLoading(true)
        try {
            const { data } = await getAllProducts();
            setProductList(data)
            setSearchResult(data)
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getProductsData();
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const filteredProducts = productList?.filter((product) =>
            product.name.includes(e.target.value) ||
            product.gender.includes(e.target.value.toUpperCase()) ||
            product.category.includes(e.target.value)
        )
        setSearchResult(filteredProducts)
    }

    const handleOrganize = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {

        const target = e.target as HTMLParagraphElement;
        const id = target.id as keyof ProductType;

        if (selectedOrder == id) {
            setSearchResult(prev => prev?.slice().reverse());
        } else {
            const newResults = searchResult?.slice().sort((a, b) => {
                if (a[id] < b[id]) {
                    return -1;
                }
                if (a[id] > b[id]) {
                    return 1;
                }
                return 0;
            });
            setSearchResult(newResults);
            setSelectedOrder(id);
        }
    }

    return (
        <main className={styles.pageContainer}>
            <section className={styles.topSection}>
                <div className={styles.sectionTitle}>
                    <h1>Produtos</h1>
                    <p>
                        {productList?.length && productList?.length > 0
                            ?
                            <span>{productList?.length} Itens cadastrados</span>
                            :
                            "0 Itens cadastrados"}
                    </p>
                </div>
                <div className={styles.searchBarContainer}>
                    <form className={styles.searchBar} onSubmit={handleSubmit}>
                        <input
                            className={styles.searchBarInput}
                            type="text"
                            placeholder="Nome do produto"
                            onChange={(e) => handleSearchChange(e)}
                        />
                        <FaSearch className={styles.searchIcon} size={25} color='#56876D' />
                    </form>

                    <button className={styles.addProductBtn} onClick={() => { navigate("/create") }}><CiCirclePlus size={30} color='#DCE4DC' />Adicionar Produto</button>
                </div>
            </section>
            <table className={styles.productTable}>
                <thead>
                    <tr className={styles.tableHead}>
                        <th className={selectedOrder == 'name' ? styles.productNameColumnHeadSelected : styles.productNameColumnHead}>
                            <p id='name' onClick={(e) => { handleOrganize(e) }}>
                                Produto<LiaArrowsAltVSolid />
                            </p>
                        </th>
                        <th className={selectedOrder == 'category' ? styles.orderTableHeadSelected : styles.orderTableHead}>
                            <p id='category' onClick={(e) => { handleOrganize(e) }}>
                                Categoria<LiaArrowsAltVSolid />
                            </p>
                        </th>
                        <th className={selectedOrder == 'gender' ? styles.orderTableHeadSelected : styles.orderTableHead}>
                            <p id='gender' onClick={(e) => { handleOrganize(e) }}>
                                Gênero<LiaArrowsAltVSolid />
                            </p>
                        </th>
                        <th className={selectedOrder == 'unit_price' ? styles.orderTableHeadSelected : styles.orderTableHead}>
                            <p id='unit_price' onClick={(e) => { handleOrganize(e) }}>
                                Preço<LiaArrowsAltVSolid />
                            </p>
                        </th>
                        <th style={{ width: 5 + "%" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult && searchResult.length > 0 && !isLoading ? searchResult.map((product: ProductType) => {
                        return (
                            <AdminProductCard
                                key={product.product_id}
                                product={product}
                                setProductList={setSearchResult}
                            />
                        )
                    })
                        : !searchResult && isLoading ?
                            <tr className={styles.conditionalTable}>
                                <td className={styles.conditionalTable}>
                                    <div className={styles.loadingContainer}>
                                        <l-ring-2
                                            size="40"
                                            stroke="5"
                                            stroke-length="0.25"
                                            bg-opacity="0.1"
                                            speed="0.8"
                                            color="#56876D"
                                        ></l-ring-2>
                                    </div>
                                </td>
                            </tr>
                            :
                            <tr className={styles.conditionalTable}>
                                <td className={styles.conditionalTable}>
                                    <p style={{ textAlign: 'center', fontSize: 32 + "px", marginTop: 3 + "rem" }}>Não há produtos registrados! </p>
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </main>
    )
}