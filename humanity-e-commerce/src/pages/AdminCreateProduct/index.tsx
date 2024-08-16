import styles from './styles.module.css'
import { CreateProductForm } from "../../components/Forms/CreateProductForm"
import { useEffect, useState } from 'react';
import { ProductImageCapture } from '../../components/Forms/ProductImageCapture';
import { getProductById, postProduct, putProduct } from '../../services/productService';
import { useLocation, useNavigate, useParams } from 'react-router';
import * as yup from "yup";
import { deleteImageList, postImage } from '../../services/imageService';
import { ProductType } from '../../types';

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

export type Image = {
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
    const [product, setProduct] = useState<ProductType>();
    const [prodImages, setProdImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>();
    const [imageError, setImageError] = useState<boolean>(false);
    const [isAtLimit, setIsAtLimit] = useState<boolean>(false);
    const [pageType, setPageType] = useState<string>('');
    const [deleteFromDB, setDeleteFromDB] = useState<number[]>([]);
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
        setIsLoading(true)
        try {
            await putProduct(updatedProduct);
            navigate("/products")
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    } 

    const updateProductImages = async(form: FormData) => {
        setIsLoading(true)
        try {
            await postImage(form);
        } catch(err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    const getProductData = async (id :string) => {
        setIsLoading(true)
        try{
            const { data } = await getProductById(id);
            setProduct(data)
        } catch(err) {
            console.log(err);
        }
        setIsLoading(false)
    }

    const deleteProductImages = async (list: number[]) => {
        setIsLoading(true)
        try{
            await deleteImageList(list);
        } catch(err) {
            console.log(err);
        }
        setIsLoading(false)
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
                            prodImages.forEach((image) => formPUT.append("productImages", image))
                            formPUT.append("productInfo", JSON.stringify(newProduct))

                            if(deleteFromDB.length > 0) {
                                deleteProductImages(deleteFromDB);
                            }

                            updateProductImages(formPUT);
                        } else if(deleteFromDB.length > 0) {
                            deleteProductImages(deleteFromDB);
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

    const identifyPage = () => {
        const firstSlashIndex = location.pathname.indexOf('/')
        const secondSlashIndex = location.pathname.indexOf('/', firstSlashIndex + 1)
        const page = location.pathname.slice(firstSlashIndex + 1, secondSlashIndex)
        if(page === "edit" || page === "details") {
            getProductData(id as string);
        }
        setPageType(page);
    }

    useEffect(() => {
        identifyPage()
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
                    product={product as ProductType}
                    pageType={pageType}
                    setIsAtLimit={setIsAtLimit}
                    setDeleteFromDB={setDeleteFromDB}
                    setImageError={setImageError}
                />
                <CreateProductForm
                    product={product as ProductType}
                    setValue={setNewProduct}
                    errors={errors as { [key: string]: string }}
                    setErrors={setErrors}
                    pageType={pageType}
                />
            </div>
        </main>
    )
}