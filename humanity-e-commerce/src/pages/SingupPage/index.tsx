import styles from "./styles.module.css"
import LogoDark from '../../assets/Logos/LogoWhite.png'
import { MouseEvent, useState } from "react"
import { StrengthBar } from "./StrengthBar";
import { FormInputs } from "./FormInputs";
import { useNavigate } from "react-router";

export const StrengthObj = {
    Weak: {backgroundColor: "darkred", width: "33%"},
    Mid: {backgroundColor: "darkcyan", width: "67%"},
    Strong: {backgroundColor: "forestgreen", width: "100%"} 
} as const;

export type Strength = typeof StrengthObj[keyof typeof StrengthObj];

export const SignupPage = () => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [checkPasswordValue, setCheckPasswordValue] = useState<string>("");
    const [isPasswordStrong, setIsPasswordStrong] = useState<boolean>(false);
    const [arePasswordEqual, setArePasswordEqual] = useState<boolean>(true);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [passwordStrength, setPasswordStrength] = useState<Strength>();

    const navigate = useNavigate();

    const checkPasswordsEquality = (checkPassword: string) => {
        if(passwordValue !== "") {
            setArePasswordEqual(passwordValue === checkPassword);
            return passwordValue === checkPassword;
        } else {
            setArePasswordEqual(false);
        }
    }

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();

        if (!checkPasswordsEquality(checkPasswordValue as string)) {
            setArePasswordEqual(false);
            return;
        } 

        if (!isPasswordStrong) {           
            console.log("senha fraca")
            return;
        } 

        if (!isEmailValid) {
            return;
        }

        console.log("manda pro back");
    }

    return (
        <main className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <img className={styles.logo} src={LogoDark}/>
                <form className={styles.inputContainer}>
                    <h1>Cadastre-se</h1>
                    <FormInputs
                        // prop.states
                        isEmailValid={isEmailValid}
                        setIsEmailValid={setIsEmailValid}
                        passwordStrenght={passwordStrength as Strength}
                        setPasswordStrength={setPasswordStrength}
                        isPasswordStrong={isPasswordStrong}
                        setIsPasswordStrong={setIsPasswordStrong}
                        arePasswordEqual={arePasswordEqual}
                        setArePasswordEqual={setArePasswordEqual}
                        passwordValue={passwordValue}
                        setPasswordValue={setPasswordValue}
                        checkPasswordValue={checkPasswordValue}
                        setCheckPasswordValue={setCheckPasswordValue}
                        // prop.functions
                        checkPasswordsEquality={checkPasswordsEquality}
                        StrengthObj={StrengthObj}
                    />
                    <StrengthBar
                        StrengthObj={StrengthObj}
                        passwordStrength={passwordStrength as Strength}
                    />
                    <button 
                        className={styles.continueBtn} 
                        type="submit"
                        onClick={(e) => {handleSubmit(e)}}
                    >
                        Cadastrar
                    </button>
                    <div className={styles.underContinueBtn}>
                        <p>Já possui uma conta?<a onClick={() => {navigate('/login')}}> Entrar</a></p>
                    </div>
                </form>
                <div className={styles.separatorContainer}>
                    <div className={styles.loginSeparator}/>
                    <p>ou</p>
                    <div className={styles.loginSeparator}/>
                </div>
                <div className={styles.continueGoogleWrapper}>
                    <button className={styles.continueGoogle}>Continuar com o google</button>
                </div>
            </div>
        </main>
    )
}