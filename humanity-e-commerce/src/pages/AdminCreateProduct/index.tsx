import styles from './styles.module.css'
import { CreateProductForm } from "../../components/Forms/CreateProductForm"
import { useState } from 'react';
import { ProductImageCapture } from '../../components/Forms/ProductImageCapture';
import { postProduct } from '../../services/productService';
import { useNavigate } from 'react-router';

export const AdminCreateProduct = () => {
    const [newProduct, setNewProduct] = useState<object>();
    const [prodImages, setProdImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const postNewProduct = async (form: FormData) => {
        setIsLoading(true)
        try {
            const response = await postProduct(form);
            setIsLoading(false)
            return response.status;
        } catch (err) {
            setIsLoading(false)
            return err
        }
    }

    const handleSubmit = async () => {
        const form = new FormData();
        form.append("productInfo", JSON.stringify(newProduct))
        prodImages.forEach((image) => form.append("productImages", image))

        const status = await postNewProduct(form);

        if (status == 201) {
            navigate("/products")
        } else {
            console.log("Não foi possível cadastrar o produto!") // CRIAR UM FEEDBACK VISUAL DESSE ERRO
        }
    }

    const handleFile = (files: FileList) => {
        const filesArray = Array.from(files)
        if (prodImages.length < 3) {
            setProdImages((prev) => [...prev, ...filesArray])
        } else {
            console.log("Limite de 3 imagens atingido!!!")
        }
    }

    const handleCancel = () => {
        navigate("/products")
    }

    return (
        <main className={styles.pageContainer}>
            <h1>Novo Produto</h1>
            <div className={styles.infosContainer}>
                <CreateProductForm setValue={setNewProduct} />
                <ProductImageCapture
                    handleFile={handleFile}
                    handleSubmit={handleSubmit}
                    images={prodImages}
                    setValue={setProdImages}
                    isLoading={isLoading}
                    handleCancel={handleCancel}
                />
            </div>
        </main>
    )
}