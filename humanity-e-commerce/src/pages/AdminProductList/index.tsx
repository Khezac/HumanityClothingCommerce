import styles from './styles.module.css'
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

export const AdminProductList = () => {
    return (
        <main className={styles.pageContainer}>
            <section className={styles.topSection}>
                <div className={styles.sectionTitle}>
                    <h1>Produtos</h1>
                    <p>33 Itens cadastrados</p> {/* Mudar para quantidade de itens cadastrados na api */}
                </div>
                <div className={styles.searchBarContainer}>
                    <div className={styles.searchBar}>
                        <input className={styles.searchBarInput} type="text" placeholder="Nome do produto"/>
                        <FaSearch className={styles.searchIcon} size={25} color='#56876D'/>
                    </div>
                    <button className={styles.addProductBtn}><CiCirclePlus size={30} color='#DCE4DC'/>Adicionar Produto</button>
                </div>
            </section>
            <section>
                <table>
                    <tr>
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>Gênero</th>
                        <th>Preço</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <img alt='Foto do produto'/>
                            <p>Nome do produto</p>
                        </td>
                        <td>
                            Calça
                        </td>
                        <td>
                            Masculino
                        </td>
                        <td>
                            R$ 30,00
                        </td>
                        <td>
                            ...
                        </td>
                    </tr>
                </table>
            </section>
        </main>
    )
}