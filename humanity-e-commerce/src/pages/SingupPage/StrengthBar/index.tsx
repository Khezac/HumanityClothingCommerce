import { RiInformation2Fill } from 'react-icons/ri';
import { Strength } from '..'
import styles from './styles.module.css'

type StrengthBarProps = {
    passwordStrength: Strength,
    StrengthObj: {
        Weak: {backgroundColor: "darkred", width: "33%"},
        Mid: {backgroundColor: "darkcyan", width: "67%"},
        Strong: {backgroundColor: "forestgreen", width: "100%"} 
    };    
}

export const StrengthBar = ({passwordStrength, StrengthObj}:StrengthBarProps) => {
    return (
        <div className={styles.passwordStrengthContainer}>
            <div className={styles.strengthSubtitle}>
                <p>Força da senha:{
                passwordStrength === StrengthObj.Weak ? <a> Fraca</a> : 
                passwordStrength === StrengthObj.Mid ? <a> Média</a> :
                passwordStrength === StrengthObj.Strong ? <a> Forte</a> :
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
    )
}