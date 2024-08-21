import { ChangeEvent } from 'react';
import styles from './styles.module.css'

type RadioProps = {
    labelChecked: string,
    setLabelChecked: (value: string) => void;
    id: string,
    name: string,
    value: string
    handleChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export const ProductPageRadio = (props: RadioProps) => {

    return (
        <>
            <label
                className={props.labelChecked === props.id ? styles.inputLabelChecked : styles.inputLabel}
                htmlFor={props.id}
            >
                {props.value}
            </label>
            <input
                type='radio'
                id={props.id}
                name={props.name}
                value={props.value}
                onClick={(e) => props.setLabelChecked(e.currentTarget.id)}
                onChange={(e) => props.handleChange(e)}
            />
        </>
    )
}