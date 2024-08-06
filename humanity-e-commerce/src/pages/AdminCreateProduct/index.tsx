import styles from './styles.module.css'
import { CreateProductForm } from "../../components/Forms/CreateProductForm"
import { useState } from 'react';
import { ProductImageCapture } from '../../components/Forms/ProductImageCapture';
import { postProduct } from '../../services/productService';
import { useNavigate } from 'react-router';
import * as yup from "yup";

export type NewProductType = {
    name: string,
    description: string,
    size: string,
    gender: string,
    unit_price: number,
    category: string
}

const formSchema = yup.object({
    name: yup.string().defined().required(),
    description: yup.string().defined().required(),
    size: yup.string().defined().required(),
    gender: yup.string().defined().required(),
    unit_price: yup.number().positive().required(),
    category: yup.string().defined().required()
})

export const AdminCreateProduct = () => {
    const [newProduct, setNewProduct] = useState<NewProductType>();
    const [prodImages, setProdImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>();
    const [imageError, setImageError] = useState<boolean>(false);
    const [isAtLimit, setIsAtLimit] = useState<boolean>(false);
    const navigate = useNavigate();

    const postNewProduct = async (form: FormData) => {
        setIsLoading(true)
        try {
            await postProduct(form);
            setIsLoading(false)
            navigate('/products')
        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    const handleSubmit = async () => {
        const form = new FormData();

        formSchema.validate(newProduct, { abortEarly: false })
            .then(() => {
                if (prodImages.length <= 0) {
                    setImageError(true)
                    return;
                } else {
                    form.append("productInfo", JSON.stringify(newProduct))
                    prodImages.forEach((image) => form.append("productImages", image))

                    postNewProduct(form);
                }
            })
            .catch((err: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {};

                err.inner.forEach((error) => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message
                    setErrors(validationErrors);

                    if (prodImages.length <= 0) {
                        setImageError(true)
                        return;
                    }
                })
            })
    }

    const handleFile = (files: FileList) => {
        const filesArray = Array.from(files)
        if (prodImages.length < 3) {
            setProdImages((prev) => [...prev, ...filesArray])
            setImageError(false);
            setIsAtLimit(false);
        } else {
            setIsAtLimit(true)

            setTimeout(() => {
                setIsAtLimit(false)
            }, 2000);
        }
    }

    const handleCancel = () => {
        navigate("/products")
    }

    return (
        <main className={styles.pageContainer}>
            <div className={styles.infosContainer}>
                <ProductImageCapture
                    handleFile={handleFile}
                    handleSubmit={handleSubmit}
                    images={prodImages}
                    setValue={setProdImages}
                    isLoading={isLoading}
                    handleCancel={handleCancel}
                    imageError={imageError}
                    isAtLimit={isAtLimit}
                />
                <CreateProductForm
                    setValue={setNewProduct}
                    errors={errors as { [key: string]: string }}
                    setErrors={setErrors}
                />
            </div>
        </main>
    )
}