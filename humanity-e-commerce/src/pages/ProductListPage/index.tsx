import { useEffect, useState } from 'react'
import { ProductListPageBanner } from '../../components/ProductListPageBanner'
import { getAllProducts } from '../../services/productService'
import { ProductType } from '../../types'
import styles from './styles.module.css'
import { ring2 } from 'ldrs'
import { ProductList } from '../../components/ProductList'
import { useParams } from 'react-router'
import { ProductListFilter } from '../../components/ProductListFilter'

export const ProductListPage = () => {
    const [products, setProducts] = useState<ProductType[]>();
    const [selectedProducts, setSelectedProducts] = useState<ProductType[]>();
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sizeList, setSizeList] = useState<string[]>();

    const { gender } = useParams();

    ring2.register();

    const getProductsData = async () => {
        setIsLoading(true);
        try{
            const {data} = await getAllProducts();
            setProducts(data)
            setSelectedProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false);
    }

    const validatePageType = () => {
        if (gender) {
            changeProductGender(gender as string);
        }
    }

    const loadAllSizes = () => {
        let sizeArray: string[] = [];
        selectedProducts?.map((element) => {
            sizeArray.push(...element.size.match(/\b\d+\b|\b[A-Za-z]+\b/g) as RegExpMatchArray);
        })

        // Limpa as duplicatas
        sizeArray = sizeArray.filter((sizeValue, index) => {
            return (sizeArray.indexOf(sizeValue) === index)
        })

        setSizeList(sizeArray);
    }

    const changeProductGender = (gender: string) => {
        if (gender === 'todos' || !gender) {
            setSelectedProducts(products);
            setFilteredProducts(products);
        } else {
            setSelectedProducts(
                products?.filter((element) => {
                    return element.gender === gender.toUpperCase()
                })
            )
            setFilteredProducts(
                products?.filter((element) => {
                    return element.gender === gender.toUpperCase()
                })
            )
        }
    }

    const changeProductSize = (size: string) => {
        setFilteredProducts(
            selectedProducts?.filter((element) => {
                return element.size.toUpperCase().includes(size.toUpperCase());
            })
        )
    }

    useEffect(() => {
        getProductsData();
    },[])

    useEffect(() => {
        validatePageType();
        loadAllSizes();
    },[products])

    useEffect(() => {
        loadAllSizes();
    },[selectedProducts])

    return (
        <main className={styles.pageContainer}>
            <ProductListPageBanner/>
            <div className={styles.contentContainer}>
                <ProductListFilter
                    changeProductGender={changeProductGender}
                    changeProductSize={changeProductSize}
                    sizeList={sizeList as string[]}
                    gender={gender as string}       
                />
                <ProductList 
                    products={filteredProducts as ProductType[]}
                    isLoading={isLoading}
                />
            </div>
        </main>
    )
}