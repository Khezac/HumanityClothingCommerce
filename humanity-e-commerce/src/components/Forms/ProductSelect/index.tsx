import { useEffect } from 'react'
import styles from './styles.module.css'

type InputProps = {
    title: string,
    name: string,
    placeholder: string,
    setValue: (value:string) => void
}

export const ProductSelect = (props: InputProps) => {

    useEffect(() => {
        props.setValue("UNISEX")
    },[])

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={props.name}>{props.title}</label>
            <select className={styles.productInput} name={props.name} id={props.name} onChange={(e) => {props.setValue(e.target.value)}} defaultValue={"UNISEX"}>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="UNISEX">Unisex</option>
            </select>
        </div>
    )
}