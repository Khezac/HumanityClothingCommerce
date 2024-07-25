import styles from './styles.module.css'
import LogoDark from '../../../assets/Logos/LogoDark.png'
import { CgProfile } from "react-icons/cg";

export const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <nav>
                <ul className={styles.menuNav}>
                    <li>
                        <a>
                            <img src={LogoDark}/>
                        </a>
                    </li>
                    <li><a>Home</a></li>
                    <li><a>Masculino</a></li>
                    <li><a>Feminino</a></li>
                    <li><a>Todas as peças</a></li>
                </ul>
            </nav>
            <div className={styles.profileNav}>
                <div className={styles.profileNavText}>
                    <p>Seja bem-vindo(a)</p>
                    <p className={styles.userName}>Cláudio</p> {/* MUDAR FUTURAMENTE PARA O NOME DE QUEM ESTIVER LOGADO */}
                </div>
                <CgProfile color='#56876D' size={60}/>
            </div>
        </div>
    )
}