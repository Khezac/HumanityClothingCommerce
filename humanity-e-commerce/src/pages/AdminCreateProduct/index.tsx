import styles from './styles.module.css'
import { CreateProductForm } from "../../components/Forms/CreateProductForm"
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { useState } from 'react';

export const AdminCreateProduct = () => {
    const [newProduct, setNewProduct] = useState<object>();

    const handleSubmit = () => {
        console.log(newProduct)
    }

    return (
        <main className={styles.pageContainer}>
            <h1>Novo Produto</h1>
            <div className={styles.infosContainer}>
                <CreateProductForm setValue={setNewProduct}/>
                <div className={styles.addImagesContainer}>
                    <div className={styles.btnContainer}>
                        <button className={styles.addImageBtn}><AiOutlinePlusCircle size={25}/> Adicionar Imagem</button>
                    </div>
                    <div className={styles.imageDisplayContainer}>

                    </div>
                    <div className={styles.sendBtnContainer}>
                        <button className={styles.sendProductBtn} onClick={handleSubmit}><BiCheckCircle size={25}/> Criar Produto</button>
                    </div>
                </div>
            </div>
        </main>
    )
}