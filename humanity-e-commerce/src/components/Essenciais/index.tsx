import styles from "./styles.module.css"

export const Essenciais = () => {
    return (
        <section className={styles.essenciaisContainer}>
            <h1>Essenciais</h1>
            <div className={styles.cardsContainer}>
                <div className={styles.cardMasculino}>
                    <p>Roupas Masculinas</p>
                </div>
                <div className={styles.cardFeminino}>
                    <p>Roupas Femininas</p>
                </div>
            </div>
        </section>
    )
}