import styles from './styles.module.css'
import LogoDark from '../../../assets/Logos/LogoDark.png'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <Link to="/"><img src={LogoDark}/></Link>
            <nav>
                <ul className={styles.menuNav}>
                    <li><Link to="/">Home</Link></li>
                    <li><a>Masculino</a></li>
                    <li><a>Feminino</a></li>
                    <li><Link to="/ProductListPage">Todas as peças</Link></li>
                </ul>
            </nav>
            <div className={styles.profileNav}>
                <div className={styles.profileNavText}>
                    <p className={styles.welcome}>Seja bem-vindo(a)</p>
                    <p className={styles.userName}>Cláudio</p> {/* MUDAR FUTURAMENTE PARA O NOME DE QUEM ESTIVER LOGADO */}
                </div>
                <CgProfile color='#56876D' size={60}/>
            </div>
        </div>
    )
}