import { FaSearch } from 'react-icons/fa'
import { ProductType } from '../../../types'
import styles from './styles.module.css'
import { useNavigate } from 'react-router'
import { ChangeEvent, FormEvent } from 'react'
import { CiCirclePlus } from 'react-icons/ci'

type TopSectionProps = {
    productList: ProductType[],
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const TopSection = ({productList, handleSubmit, handleSearchChange}: TopSectionProps) => {

    const navigate = useNavigate();

    return (
        <section className={styles.topSection}>
            <div className={styles.sectionTitle}>
                <h1>Produtos</h1>
                <p>
                    {productList
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
    )
}