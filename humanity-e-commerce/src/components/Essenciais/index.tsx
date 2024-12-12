import { useNavigate } from "react-router"
import styles from "./styles.module.css"

export const Essenciais = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.essenciaisContainer}>
            <h1>Essenciais</h1>
            <div className={styles.cardsContainer}>
                <div 
                    className={styles.cardMasculino}
                    onClick={() => {navigate('/ProductListPage/masculino')}}
                >
                    <p>Roupas Masculinas</p>
                </div>
                <div 
                    className={styles.cardFeminino}
                    onClick={() => {navigate('/ProductListPage/feminino')}}
                >
                    <p>Roupas Femininas</p>
                </div>
            </div>
        </section>
    )
}