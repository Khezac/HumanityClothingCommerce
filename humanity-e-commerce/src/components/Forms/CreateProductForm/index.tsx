import { useEffect, useState } from 'react'
import { ProductInput } from '../ProductInput'
import { ProductSelect } from '../ProductSelect'
import { ProductTextArea } from '../ProductTextArea'
import styles from './styles.module.css'
import { NewProductType } from '../../../pages/AdminCreateProduct'

export type ProductProps = {
    setValue: (value: NewProductType) => void,
    errors: { [key: string]: string },
    setErrors: (value: { [key: string]: string }) => void
}

export const CreateProductForm = (props: ProductProps) => {
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [size, setSize] = useState<string>("");
    const [unit_price, setPrice] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleInfo = () => {
        const newProduct: NewProductType = {
            name: name as string,
            description: description as string,
            size: size as string,
            gender: gender as string,
            unit_price: parseFloat(unit_price as string),
            category: category as string
        }
        props.setValue(newProduct)
    }

    useEffect(() => {
        handleInfo();
    }, [name, category, size, unit_price, gender, description, props.errors])

    return (
        <form className={styles.formContainer}>
            <h1>Novo Produto</h1>
            <ProductInput
                name='name'
                title='Nome do produto'
                placeholder='Nome do produto'
                value={name as string}
                setValue={setName}
                type='text'
                errorMsg='Precisa ser preenchido.'
                isError={props.errors?.name ? true : false}
                setErrors={props.setErrors}
                errors={props.errors}
            />
            <ProductInput
                name='category'
                title='Categoria'
                placeholder='Categoria do produto'
                value={category as string}
                setValue={setCategory}
                type='text'
                errorMsg='Precisa ser preenchido.'
                isError={props.errors?.category ? true : false}
                setErrors={props.setErrors}
                errors={props.errors}
            />
            <div className={styles.smallerInputs} onClick={handleInfo}>
                <ProductInput
                    name='size'
                    title='Tamanho'
                    placeholder='Tamanho do produto'
                    value={size as string}
                    setValue={setSize}
                    type='text'
                    errorMsg='Precisa ser preenchido.'
                    isError={props.errors?.size ? true : false}
                    setErrors={props.setErrors}
                    errors={props.errors}
                />
                <ProductInput
                    name='unit_price'
                    title='Preço'
                    placeholder='Insira o valor do produto'
                    value={unit_price as string}
                    setValue={setPrice}
                    type='number'
                    errorMsg='Preencha com um valor.'
                    isError={props.errors?.unit_price ? true : false}
                    setErrors={props.setErrors}
                    errors={props.errors}
                />
                <ProductSelect
                    name='gender'
                    title='Gênero'
                    placeholder='Gênero do produto'
                    setValue={setGender}
                    errorMsg='Precisa ser preenchido.'
                    isError={props.errors?.gender ? true : false}
                    setErrors={props.setErrors}
                    errors={props.errors}
                />
            </div>
            <ProductTextArea
                name='description'
                title='Descrição'
                placeholder='Descrição do produto'
                setValue={setDescription}
                errorMsg='Precisa ser preenchido.'
                isError={props.errors?.description ? true : false}
                setErrors={props.setErrors}
                errors={props.errors}
            />
        </form>
    )
}