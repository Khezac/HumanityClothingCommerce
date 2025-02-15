import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styles from './styles.module.css'
import LogoBranca from '../../../assets/Logos/LogoWhite.png'

export const Footer = () => {
    return (
        <>
        {false &&
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerLinks}>
                        <a href='/'>
                            <img src={LogoBranca} />
                        </a>
                        <div className={styles.social}>
                            <a href="https://github.com/Khezac/" target='blank_' className={styles.iconBtn}>
                                <FaGithub color="#F5F6F5" size={35} />
                            </a>
                            <a href="https://www.linkedin.com/in/khezac" target='blank_' className={styles.iconBtn}>
                                <FaLinkedin color="#F5F6F5" size={35} />
                            </a>
                        </div>
                    </div>
                    <div className={styles.footerTexts}>
                        <p>2024 Khezac Khalleb, Todos os Direitos Reservados</p>
                        <p>Projeto OpenSource, acesse o <a className={styles.repoLink} href='https://github.com/Khezac/HumanityClothingCommerce'>código raiz aqui</a></p>
                    </div>
                </div>
            </footer>
        }
        </>
    )
}