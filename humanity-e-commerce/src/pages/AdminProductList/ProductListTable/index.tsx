import { LiaArrowsAltVSolid } from 'react-icons/lia'
import styles from './styles.module.css'
import { ProductType } from '../../../types'
import { AdminProductCard } from '../../../components/AdminProductCard'
import { Dispatch, SetStateAction } from 'react'

type ProductListTableProps = {
    selectedOrder: string,
    handleOrganize: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void,
    searchResult: ProductType[],
    organizePrice: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void,
    isLoading: boolean,
    setProductList: Dispatch<SetStateAction<ProductType[] | undefined>>,
    setSearchResult: Dispatch<SetStateAction<ProductType[] | undefined>>,
    productList: ProductType[]
}

export const ProductListTable = (props: ProductListTableProps) => {
    return (
        <table className={styles.productTable}>
            <thead>
                <tr className={styles.tableHead}>
                    <th className={props.selectedOrder == 'name' ? styles.productNameColumnHeadSelected : styles.productNameColumnHead}>
                        <p id='name' onClick={(e) => { props.handleOrganize(e) }}>
                            Produto<LiaArrowsAltVSolid />
                        </p>
                    </th>
                    <th className={props.selectedOrder == 'category' ? styles.orderTableHeadSelected : styles.orderTableHead}>
                        <p id='category' onClick={(e) => { props.handleOrganize(e) }}>
                            Categoria<LiaArrowsAltVSolid />
                        </p>
                    </th>
                    <th className={props.selectedOrder == 'gender' ? styles.orderTableHeadSelected : styles.orderTableHead}>
                        <p id='gender' onClick={(e) => { props.handleOrganize(e) }}>
                            Gênero<LiaArrowsAltVSolid />
                        </p>
                    </th>
                    <th className={props.selectedOrder == 'unit_price' ? styles.orderTableHeadSelected : styles.orderTableHead}>
                        <p id='unit_price' onClick={(e) => { props.organizePrice(e) }}>
                            Preço<LiaArrowsAltVSolid />
                        </p>
                    </th>
                    <th style={{ width: 5 + "%" }}></th>
                </tr>
            </thead>
            <tbody>
                {props.searchResult && props.searchResult.length > 0 && !props.isLoading ? props.searchResult.map((product: ProductType) => {
                    return (
                        <AdminProductCard
                            key={product.product_id}
                            product={product}
                            setSearchResult={props.setSearchResult}
                            setProductList={props.setProductList}
                            productList={props.productList as ProductType[]}
                        />
                    )
                })
                    : !props.searchResult && props.isLoading ?
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
    )
}