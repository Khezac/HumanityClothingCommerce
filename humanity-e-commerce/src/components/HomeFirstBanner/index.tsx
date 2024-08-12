import styles from './styles.module.css'

export const FirstBanner = () => {
    return(
        <div className={styles.bannerContainer}>
            <div className={styles.greenBar}/>
            <p className={styles.bannerText}>Abrace sua humanidade</p>
        </div>
    )
}