import styles from './styles.module.css'
import LogoDark from '../../../assets/Logos/LogoDark.png'
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();

    const goToListPage = (page:string) => {
        navigate("/ProductListPage/" + page)
        window.location.reload();
    }

    return (
        <>
        {false &&
            <div className={styles.headerContainer}>
                <Link to="/"><img src={LogoDark}/></Link>
                <nav>
                    <ul className={styles.menuNav}>
                        <li><Link to="/">Home</Link></li>
                        <li><a onClick={() => {goToListPage('masculino')}}>Masculino</a></li>
                        <li><a onClick={() => {goToListPage('feminino')}}>Feminino</a></li>
                        <li><a onClick={() => {goToListPage('')}}>Todas as peças</a></li>
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
        }
        </>
    )
}