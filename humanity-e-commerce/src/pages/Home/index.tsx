import { FirstBanner } from "../../components/HomeFirstBanner"
import styles from "./styles.module.css"
import { TopVendas } from "../../components/TopVendas"
import { RedesBanner } from "../../components/RedesBanner"

export const Home = () => {
    return (
        <main className={styles.homeContainer}>
            <FirstBanner/>
            <TopVendas/>
            <RedesBanner/>
        </main>
    )
}