import styles from './styles.module.css'

type InputProps = {
    title: string,
    name: string,
    placeholder: string,
    value: string,
    setValue: (value:string) => void,
    type: string,
    required: boolean
}

export const ProductInput = (props:InputProps) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={props.name}>{props.title}</label>
            <input 
            className={styles.productInput} 
            name={props.name} 
            type={props.type} 
            placeholder={props.placeholder} 
            value={props.value} 
            onChange={(e) => {props.setValue(e.target.value)}}
            required={props.required}
            />
        </div>
    )
}