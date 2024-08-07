import styles from './styles.module.css'
import { CreateProductForm } from "../../components/Forms/CreateProductForm"
import { useEffect, useState } from 'react';
import { ProductImageCapture } from '../../components/Forms/ProductImageCapture';
import { getProductById, postProduct, putProduct } from '../../services/productService';
import { useLocation, useNavigate, useParams } from 'react-router';
import * as yup from "yup";
import { postImage } from '../../services/imageService';

export type AllImagesProductType = {
    product_id: number,
    name: string,
    gender: string,
    size: string,
    unit_price: string,
    category: string,
    description: string,
    imageURL: Image[]
}

type Image = {
    fileName: string,
    url: string
}

export type NewProductType = {
    product_id: number,
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
    const [product, setProduct] = useState<AllImagesProductType>();
    const [prodImages, setProdImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>();
    const [imageError, setImageError] = useState<boolean>(false);
    const [isAtLimit, setIsAtLimit] = useState<boolean>(false);
    const [pageType, setPageType] = useState<string>('');
    const navigate = useNavigate();

    const location = useLocation();

    const { id } = useParams()

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

    const updateProductInfo = async(updatedProduct :NewProductType) => {
        try {
            const {data} = await putProduct(updatedProduct);
            console.log(data)
            navigate('/products')
        } catch (err) {
            console.log(err)
        }
    } 

    const updateProductImages = async(form: FormData) => {
        try {
            await postImage(form);
        } catch(err) {
            console.log(err)
        }
    }

    const getProductData = async (id :string) => {
        try{
            const { data } = await getProductById(id);
            setProduct(data)
        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = () => {
        const form = new FormData();

        formSchema.validate(newProduct, { abortEarly: false })
            .then(() => {
                if (prodImages.length <= 0 && !product) {
                    setImageError(true)
                    return;
                } else {
                    form.append("productInfo", JSON.stringify(newProduct))
                    prodImages.forEach((image) => form.append("productImages", image))
                    
                    if(pageType === 'edit'){
                        if(prodImages.length > 0) {
                            const formPUT = new FormData();
                            prodImages.forEach((image) => formPUT.append("files", image))
                            formPUT.append("id", JSON.stringify(product))

                            updateProductImages(formPUT);
                        }
                        updateProductInfo(newProduct as NewProductType)
                    } else {
                        postNewProduct(form);
                    }
                }
            })
            .catch((err: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {};

                err.inner.forEach((error) => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message
                    setErrors(validationErrors);

                    if (prodImages.length <= 0 && !product) {
                        setImageError(true)
                        return;
                    }
                })
            })
    }

    useEffect(() => {
        const firstSlashIndex = location.pathname.indexOf('/')
        const secondSlashIndex = location.pathname.indexOf('/', firstSlashIndex + 1)
        const page = location.pathname.slice(firstSlashIndex + 1, secondSlashIndex)
        if(page === "edit" || page === "details") {
            getProductData(id as string);
            setPageType(page);
        }
    },[])

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
                    product={product as AllImagesProductType}
                    pageType={pageType}
                    setIsAtLimit={setIsAtLimit}
                />
                <CreateProductForm
                    product={product as AllImagesProductType}
                    setValue={setNewProduct}
                    errors={errors as { [key: string]: string }}
                    setErrors={setErrors}
                    pageType={pageType}
                />
            </div>
        </main>
    )
}