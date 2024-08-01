import { useEffect, useState } from 'react'
import { ProductInput } from '../ProductInput'
import { ProductSelect } from '../ProductSelect'
import { ProductTextArea } from '../ProductTextArea'
import styles from './styles.module.css'

export type Product = {
    product_id: number,
    name: string,
    description: string,
    size: string,
    gender: string,
    unit_price: number,
    category: string
}

export type ProductProps = {
    setValue: (value:object) => void;
}

export const CreateProductForm = (props:ProductProps) => {
    const [name, setName] = useState<string>();
    const [categoria, setCategoria] = useState<string>();
    const [tamanho, setTamanho] = useState<string>();
    const [preco, setPreco] = useState<string>();
    const [genero, setGenero] = useState<string>();
    const [descricao, setDescricao] = useState<string>();

    const handleInfo = () => {
        const newProduct = {
            name: name,
            description: descricao,
            size: tamanho,
            gender: genero,
            unit_price: preco,
            category: categoria
        }
        props.setValue(newProduct)
    }

    useEffect(() => {
        handleInfo();
    },[name, categoria, tamanho, preco, genero, descricao])

    return (
        <form className={styles.formContainer}>
            <ProductInput name='productName' title='Nome do produto' placeholder='Nome do produto' value={name as string} setValue={setName} type='text' required={true}/>
            <ProductInput name='categoria' title='Categoria' placeholder='Categoria do produto' value={categoria as string} setValue={setCategoria} type='text' required={true}/>
            <div className={styles.smallerInputs} onClick={handleInfo}>
                <ProductInput name='tamanho' title='Tamanho' placeholder='Tamanho do produto' value={tamanho as string} setValue={setTamanho} type='text' required={true}/>
                <ProductInput name='preco' title='Preco' placeholder='Insira o valor do produto' value={preco as string} setValue={setPreco} type='number' required={true}/>
                <ProductSelect name='genero' title='Genero' placeholder='Genero do produto' setValue={setGenero}/>
            </div>
            <ProductTextArea name='descricao' title='Descrição' placeholder='Descrição do produto' setValue={setDescricao}/>
        </form>
    )
}