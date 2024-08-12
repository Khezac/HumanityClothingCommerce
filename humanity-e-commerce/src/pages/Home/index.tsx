import { FirstBanner } from "../../components/HomeFirstBanner"
import styles from "./styles.module.css"
import { TopVendas } from "../../components/TopVendas"
import { RedesBanner } from "../../components/RedesBanner"
import { Essenciais } from "../../components/Essenciais"
import { Navegue } from "../../components/Navegue"

export const Home = () => {
    return (
        <main className={styles.homeContainer}>
            <FirstBanner/>
            <TopVendas/>
            <RedesBanner/>
            <Essenciais/>
            <Navegue/>
        </main>
    )
}