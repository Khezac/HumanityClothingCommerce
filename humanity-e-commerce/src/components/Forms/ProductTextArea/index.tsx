import { ChangeEvent } from 'react'
import styles from './styles.module.css'

type InputProps = {
    title: string,
    name: string,
    placeholder: string,
    setValue: (value: string) => void
    isError: boolean,
    errorMsg: string,
    setErrors: (value: { [key: string]: string }) => void,
    errors: { [key: string]: string },
}

export const ProductTextArea = (props: InputProps) => {

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <textarea
                className={props.isError ? styles.productInputError : styles.productInput}
                rows={7}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                onChange={(e) => handleChange(e)}>
            </textarea>
            {props.isError &&
                <p className={styles.errorMsg}>{props.errorMsg}</p>
            }
        </div>
    )
}