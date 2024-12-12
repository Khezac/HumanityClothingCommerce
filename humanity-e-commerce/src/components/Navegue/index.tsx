import styles from './styles.module.css'
import { IoShirtOutline } from "react-icons/io5";
import { BiCartAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router';

export const Navegue = () => {
    const navigate = useNavigate();    
    
    return (
        <section className={styles.navegueContainer}>
            <h1>Navegue</h1>
            <div className={styles.cardsContainer}>
                <div className={styles.navegueCard}
                    onClick={() => {navigate('/ProductListPage/')}}
                >
                    <div className={styles.cardIcon}>
                        <IoShirtOutline size={45} color='#DCE4DC' />
                    </div>
                    <div className={styles.cardTxtContainer}>
                        <p className={styles.cardTitle}>Todas as peças</p>
                        <p className={styles.cardSubtitle}>ver mais</p>
                    </div>
                </div>
                <div className={styles.navegueCard}>
                    <div className={styles.cardIcon}>
                        <BiCartAlt size={45} color='#DCE4DC' />
                    </div>
                    <div className={styles.cardTxtContainer}>
                        <p className={styles.cardTitle}>Acessar Carrinho</p>
                        <p className={styles.cardSubtitle}>ir para o carrinho</p>
                    </div>
                </div>
                <div className={styles.navegueCard}>
                    <div className={styles.cardIcon}>
                        <CgProfile size={45} color='#DCE4DC' />
                    </div>
                    <div className={styles.cardTxtContainer}>
                        <p className={styles.cardTitle}>Acessar Perfil</p>
                        <p className={styles.cardSubtitle}>ir para o perfil</p>
                    </div>
                </div>
            </div>
        </section>
    )
}