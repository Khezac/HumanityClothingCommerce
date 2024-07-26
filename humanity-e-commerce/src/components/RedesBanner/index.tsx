import styles from './styles.module.css'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const RedesBanner = () => {
    return (
        <section className={styles.bannerContainer}>
            <p className={styles.bannerText}>Acesse nossas redes</p>
            <div className={styles.iconContainer}>
                <a href="https://github.com/Khezac/" target='blank_' className={styles.iconBtn}>
                    <FaGithub color="#F5F6F5" size={45} />
                </a>
                <a href="https://www.linkedin.com/in/khezac" target='blank_' className={styles.iconBtn}>
                    <FaLinkedin color="#F5F6F5" size={45} />
                </a>
            </div>
            <div className={styles.greenBar} />
        </section>
    )
}