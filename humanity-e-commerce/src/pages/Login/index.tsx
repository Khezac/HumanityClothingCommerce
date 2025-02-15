import styles from "./styles.module.css"
import LogoDark from '../../assets/Logos/LogoWhite.png'
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export const LoginPage = () => {
    const [passwordType, setPasswordType] = useState<string>("password");

    return (
        <main className={styles.mainContainer}>
            <img className={styles.logo} src={LogoDark}/>
            <div className={styles.inputContainer}>
                <h1>Insira seu login</h1>
                <input placeholder="Email" type="text"/>
                <input placeholder="Senha" type={passwordType}/>
                <button 
                    className={styles.showPasswordBtn}
                    onClick={() => {passwordType === "password" ? setPasswordType("text") : setPasswordType("password")}} 
                >
                    {passwordType === "password" ? 
                    <FaRegEye color="#727272" size={24}/> : 
                    <FaRegEyeSlash color="#727272" size={24}/>}
                </button>
                <button className={styles.continueBtn} type="submit">Continuar</button>
                <div className={styles.underContinueBtn}>
                    <a>Esqueci minha senha</a>
                    <p>Não tem uma conta?<a> Cadastre-se</a></p>
                </div>
            </div>
            <div className={styles.separatorContainer}>
                <div className={styles.loginSeparator}/>
                <p>ou</p>
                <div className={styles.loginSeparator}/>
            </div>
            <div>
                <button className={styles.continueGoogle}>Continuar com o google</button>
            </div>
        </main>
    )
}