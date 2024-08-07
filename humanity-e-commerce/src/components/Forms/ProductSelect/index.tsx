import { ChangeEvent } from 'react'
import styles from './styles.module.css'

type InputProps = {
    title: string,
    name: string,
    placeholder: string,
    value: string,
    setValue: (value: string) => void,
    type: string,
    isError: boolean,
    errorMsg: string,
    setErrors: (value: { [key: string]: string }) => void,
    errors: { [key: string]: string },
    disabled: boolean
}

export const ProductSelect = (props: InputProps) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setValue(e.target.value);
        removeAttribute(e.target.name);
    }

    const removeAttribute = (inputName: string) => {
        const newErrors: { [key: string]: string } = {};
        
        for (const key in props.errors) {
            if (key !== inputName) {
                newErrors[key] = props.errors[key];
            }
        }
        
        props.setErrors(newErrors);
    };

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={props.name}>{props.title}</label>
            <select
                className={props.isError ? styles.productInputError : styles.productInput}
                name={props.name}
                id={props.name}
                onChange={(e) => handleChange(e)}
                value={props.value}
                disabled={props.disabled}
            >
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="UNISEX">Unisex</option>
            </select>
            {props.isError && <p className={styles.errorMsg}>{props.errorMsg}</p>}
        </div>
    )
}