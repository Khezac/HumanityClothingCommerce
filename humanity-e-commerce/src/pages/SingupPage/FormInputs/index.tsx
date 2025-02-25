import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import styles from './styles.module.css'
import { useState } from "react";
import { Strength } from "..";

type FormInputsProps = {
    // states
    isEmailValid: boolean,
    setIsEmailValid: (a: boolean) => void,
    passwordStrenght: Strength,
    setPasswordStrength: (a: Strength) => void,
    isPasswordStrong: boolean,
    setIsPasswordStrong: (a: boolean) => void,
    arePasswordEqual: boolean,
    setArePasswordEqual: (a: boolean) => void,
    passwordValue: string,
    setPasswordValue: (a: string) => void,
    checkPasswordValue: string,
    setCheckPasswordValue: (e: string) => void,
    //functions
    checkPasswordsEquality: (a: string) => void,
    StrengthObj: {
        Weak: { backgroundColor: "darkred", width: "33%" },
        Mid: { backgroundColor: "darkcyan", width: "67%" },
        Strong: { backgroundColor: "forestgreen", width: "100%" }
    }
}

export const FormInputs = (props: FormInputsProps) => {
    const [passwordType, setPasswordType] = useState<string>("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password");

    function validateEmail(email: string) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email != '') {
            props.setIsEmailValid(emailPattern.test(email));
        }
    }

    const validatePasswordStrength = (password: string) => {
        const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        const numbers = /\d/;
        const upperCaseLetters = /[A-Z]/;
        const lowerCaseLetters = /[a-z]/;

        let strengthPoints = 0;

        if (password.length >= 8) {
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
                    props.setPasswordStrength(props.StrengthObj.Weak);
                    props.setIsPasswordStrong(false);
                    break;
                case strengthPoints < 4 && strengthPoints > 2:
                    props.setPasswordStrength(props.StrengthObj.Mid);
                    props.setIsPasswordStrong(true);
                    break;
                case strengthPoints === 4:
                    props.setPasswordStrength(props.StrengthObj.Strong);
                    props.setIsPasswordStrong(true);
                    break;
            }
        } else {
            props.setPasswordStrength(props.StrengthObj.Weak);
            props.setIsPasswordStrong(false);
            return;
        }
    }

    return (
        <>
            <input
                onChange={(e) => { validateEmail(e.currentTarget.value) }}
                className={!props.isEmailValid ? styles.emailInputError : styles.emailInput}
                placeholder="Email"
                type="email"
            />
            {!props.isEmailValid && <p className={styles.emailErrorMsg}>Endereço de email inválido</p>}
            <input
                onChange={(e) => {
                    props.setPasswordValue(e.currentTarget.value.trim());
                    validatePasswordStrength(e.currentTarget.value);
                    props.setArePasswordEqual(true);
                }}
                placeholder="Senha"
                type={passwordType}
                value={props.passwordValue}
            />
            <input
                onChange={(e) => {
                    props.setCheckPasswordValue(e.currentTarget.value);
                    props.checkPasswordsEquality(e.currentTarget.value);
                }}
                className={!props.arePasswordEqual && (props.checkPasswordValue != '' || props.passwordValue != '') ? styles.checkPasswordError : styles.checkPasswordInput}
                placeholder="Confirme sua senha"
                type={confirmPasswordType}
                value={props.checkPasswordValue}
            />
            {!props.arePasswordEqual && props.isPasswordStrong && (props.checkPasswordValue != '' || props.passwordValue != '') ? <p className={styles.passwordErrorMsg}>As senhas são diferentes</p> : <></>}
            {!props.isPasswordStrong && (props.checkPasswordValue != '' || props.passwordValue != '') ? <p className={styles.passwordErrorMsg}>Senha muito fraca</p> : <></>}
            <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => { passwordType === "password" ? setPasswordType("text") : setPasswordType("password") }}
            >
                {passwordType === "password" ?
                    <FaRegEye color="#727272" size={24} /> :
                    <FaRegEyeSlash color="#727272" size={24} />}
            </button>
            <button
                type="button"
                className={styles.showConfirmPasswordBtn}
                onClick={() => { confirmPasswordType === "password" ? setConfirmPasswordType("text") : setConfirmPasswordType("password") }}
            >
                {confirmPasswordType === "password" ?
                    <FaRegEye color="#727272" size={24} /> :
                    <FaRegEyeSlash color="#727272" size={24} />}
            </button>
        </>
    )
}