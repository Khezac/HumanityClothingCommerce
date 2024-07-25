import { Header } from "../../components/layout/Header"
import { FirstBanner } from "../../components/HomeFirstBanner"
import styles from "./styles.module.css"

export const Home = () => {
    return (
        <main className={styles.homeContainer}>
            <Header />
            <FirstBanner/>
        </main>
    )
}