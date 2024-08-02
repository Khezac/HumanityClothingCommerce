import styles from './styles.module.css'
import { CreateProductForm } from "../../components/Forms/CreateProductForm"
import { useState } from 'react';
import { ProductImageCapture } from '../../components/Forms/ProductImageCapture';
import { postProduct } from '../../services/productService';

export const AdminCreateProduct = () => {
    const [newProduct, setNewProduct] = useState<object>();
    const [prodImages, setProdImages] = useState<File[]>([]);

    const postNewProduct = async (form:FormData) => {
        try{
            const { data } = await postProduct(form);
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = () => {
        const form = new FormData();
        form.append("productInfo", JSON.stringify(newProduct))
        prodImages.forEach((image) => form.append("productImages", image))

        postNewProduct(form);
    }
    
    const handleFile = (files: FileList) => {
        const filesArray = Array.from(files)
        if(prodImages.length < 3) {
            setProdImages((prev) => [...prev, ...filesArray])
        } else {
            console.log("Limite de 3 imagens atingido!!!")
        }
    }

    return (
        <main className={styles.pageContainer}>
            <h1>Novo Produto</h1>
            <div className={styles.infosContainer}>
                <CreateProductForm setValue={setNewProduct}/>
                <ProductImageCapture handleFile={handleFile} handleSubmit={handleSubmit}/>
            </div>
        </main>
    )
}