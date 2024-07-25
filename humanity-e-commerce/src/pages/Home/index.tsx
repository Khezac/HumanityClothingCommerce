import { FirstBanner } from "../../components/HomeFirstBanner"
import styles from "./styles.module.css"
import { TopVendas } from "../../components/TopVendas"

export const Home = () => {
    return (
        <main className={styles.homeContainer}>
            <FirstBanner/>
            <TopVendas/>
        </main>
    )
}