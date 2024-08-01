import styles from './styles.module.css'

type InputProps = {
    title: string,
    name: string,
    placeholder: string,
    setValue: (value:string) => void
}

export const ProductTextArea = (props:InputProps) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={props.name}>{props.title}</label>
            <textarea className={styles.productInput} name={props.name} id={props.name} placeholder={props.placeholder} onChange={(e) => {props.setValue(e.target.value)}}>
            </textarea>
        </div>
    )
}