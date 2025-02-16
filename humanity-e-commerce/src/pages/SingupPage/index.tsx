import styles from "./styles.module.css"
import LogoDark from '../../assets/Logos/LogoWhite.png'
import { MouseEvent, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { RiInformation2Fill } from "react-icons/ri";

const Strength = {
    Weak: {backgroundColor: "darkred", width: "33" + "%"},
    Mid: {backgroundColor: "darkcyan", width: "67" + "%"},
    Strong: {backgroundColor: "forestgreen", width: "100" + "%"} 
} as const;

type Strength = typeof Strength[keyof typeof Strength];

export const SignupPage = () => {
    const [passwordType, setPasswordType] = useState<string>("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [checkPasswordValue, setCheckPasswordValue] = useState<string>("");
    const [isPasswordStrong, setIsPasswordStrong] = useState<boolean>(false);
    const [isPasswordEqual, setIsPasswordEqual] = useState<boolean>(true);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [passwordStrength, setPasswordStrengh] = useState<Strength>();

    const validatePasswordsEquality = (checkPassword: string) => {
        if(passwordValue !== "") {
            setIsPasswordEqual(passwordValue === checkPassword);
            return passwordValue === checkPassword;
        } else {
            setIsPasswordEqual(false);
        }
    }

    const validatePasswordStrength = (password: string) => {
        const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        const numbers = /\d/;
        const upperCaseLetters = /[A-Z]/;
        const lowerCaseLetters = /[a-z]/;

        let strengthPoints = 0;

        if(password.length >= 8) {
            const conditions = [
                numbers.test(password),
                lowerCaseLetters.test(password),
                specialCharacters.test(password),
                upperCaseLetters.test(password)
            ]

            conditions.forEach((item) => {
                if (item) {
                    strengthPoints++; 
                }
            })

            switch (true) {
                case strengthPoints < 2:
                    setPasswordStrengh(Strength.Weak);
                    setIsPasswordStrong(false);
                    break;
                case strengthPoints <4 && strengthPoints >2:
                    setPasswordStrengh(Strength.Mid);
                    setIsPasswordStrong(true);
                    break;
                case strengthPoints === 4:
                    setPasswordStrengh(Strength.Strong);
                    setIsPasswordStrong(true);
                    break;
            } 
        } else {
            setPasswordStrengh(Strength.Weak);
            setIsPasswordStrong(false);
            return;   
        }
    }

    function validateEmail(email: string) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email != ''){
            setIsEmailValid(emailPattern.test(email));
        }
    }

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();

        if (!validatePasswordsEquality(checkPasswordValue as string)) {
            setIsPasswordEqual(false);
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
                    <input 
                        onChange={(e) => {validateEmail(e.currentTarget.value)}}
                        className={!isEmailValid ? styles.emailInputError : styles.emailInput} 
                        placeholder="Email" 
                        type="email"
                    />
                    {!isEmailValid && <p className={styles.emailErrorMsg}>Endereço de email inválido</p>}
                    <input 
                        onChange={(e) => {
                            setPasswordValue(e.currentTarget.value);
                            validatePasswordStrength(e.currentTarget.value);
                            setIsPasswordEqual(true);
                        }} 
                        placeholder="Senha"
                        type={passwordType}
                    />
                    <input 
                        onChange={(e) => {
                            setCheckPasswordValue(e.currentTarget.value);
                            validatePasswordsEquality(e.currentTarget.value);
                        }} 
                        className={!isPasswordEqual && (checkPasswordValue != '' || passwordValue != '')  ? styles.checkPasswordError : styles.checkPasswordInput} 
                        placeholder="Confirme sua senha" 
                        type={confirmPasswordType}
                    />
                    {!isPasswordEqual && (checkPasswordValue != '' || passwordValue != '') ? <p className={styles.passwordErrorMsg}>As senhas são diferentes</p> : <></>}
                    {!isPasswordStrong && (checkPasswordValue != '' || passwordValue != '') ? <p className={styles.passwordErrorMsg}>Senha muito fraca</p> : <></>}
                    <button 
                        type="button"
                        className={styles.showPasswordBtn}
                        onClick={() => {passwordType === "password" ? setPasswordType("text") : setPasswordType("password")}} 
                    >
                        {passwordType === "password" ? 
                        <FaRegEye color="#727272" size={24}/> : 
                        <FaRegEyeSlash color="#727272" size={24}/>}
                    </button>
                    <button 
                        type="button"
                        className={styles.showConfirmPasswordBtn}
                        onClick={() => {confirmPasswordType === "password" ? setConfirmPasswordType("text") : setConfirmPasswordType("password")}} 
                    >
                        {confirmPasswordType === "password" ? 
                        <FaRegEye color="#727272" size={24}/> : 
                        <FaRegEyeSlash color="#727272" size={24}/>}
                    </button>
                    <div className={styles.passwordStrengthContainer}>
                        <div className={styles.strengthSubtitle}>
                            <p>Força da senha:{
                            passwordStrength === Strength.Weak ? <a> Fraca</a> : 
                            passwordStrength === Strength.Mid ? <a> Média</a> :
                            passwordStrength === Strength.Strong ? <a> Forte</a> :
                            <a> --</a>}</p>
                            <div
                                className={styles.hintIcon}
                            >
                                <RiInformation2Fill color="deepskyblue" size={24}  style={{cursor: "pointer"}}/>
                            </div>
                                <div className={styles.passwordHint}>
                                    <p>Uma boa senha deve:</p>
                                    <ul>
                                        <li>Ser maior do que 8 caracteres</li>
                                        <li>Ter caracteres maiúsculos e minúsculos</li>
                                        <li>Ter números</li>
                                        <li>Ter caracteres especiais como: !@#$¨&</li>
                                    </ul>
                                </div>
                        </div>
                        <div className={styles.strengthBar}>
                            <div style={passwordStrength} className={styles.innerStrenghtBar}/>
                        </div>
                    </div>
                    <button 
                        className={styles.continueBtn} 
                        type="submit"
                        onClick={(e) => {handleSubmit(e)}}
                    >
                        Cadastrar
                    </button>
                    <div className={styles.underContinueBtn}>
                        <p>Já possui uma conta?<a> Entrar</a></p>
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