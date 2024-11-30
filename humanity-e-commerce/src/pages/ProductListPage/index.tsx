import { useEffect, useState } from 'react'
import { ProductListPageBanner } from '../../components/ProductListPageBanner'
import { getAllProducts } from '../../services/productService'
import { ProductType } from '../../types'
import styles from './styles.module.css'
import { ring2 } from 'ldrs'
import { ProductList } from '../../components/ProductList'
import { useParams } from 'react-router'

export const ProductListPage = () => {
    const [products, setProducts] = useState<ProductType[]>();
    const [selectedProducts, setSelectedProducts] = useState<ProductType[]>();
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
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false);
    }

    const validatePage = () => {
        if (gender) {
            changeProductGender(gender as string);
        }
    }

    const loadAllSizes = () => {
        let sizeArray: string[] = [];
        products?.map((element) => {
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
        } else {
            setSelectedProducts(
                products?.filter((element) => {
                    return element.gender === gender.toUpperCase()
                })
            )
        }
    }

    useEffect(() => {
        getProductsData()
    },[])

    useEffect(() => {
        validatePage()
        loadAllSizes()
    },[products])

    return (
        <main className={styles.pageContainer}>
            <ProductListPageBanner/>
            <div className={styles.contentContainer}>
                <div className={styles.filterContainer}>
                    <h2 className={styles.listTitle}>Gênero</h2>
                    <ul className={styles.genderList}>
                        <li className={styles.genderListLine}>
                            <input 
                                type='radio' 
                                className={styles.genderRadio} 
                                id='todos' 
                                name='genderRadio' 
                                onChange={(e) => changeProductGender(e.target.id)} 
                                defaultChecked={!gender ? true : false}
                            />
                            <label htmlFor='todos'>Todos</label>  
                        </li>
                        <li className={styles.genderListLine}>
                            <input type='radio' 
                                className={styles.genderRadio} 
                                id='masculino' 
                                name='genderRadio' 
                                onChange={(e) => changeProductGender(e.target.id)} 
                                defaultChecked={gender === 'masculino' ? true : false}
                            />
                            <label htmlFor='masculino'>Masculino</label>  
                        </li>
                        <li className={styles.genderListLine}>
                            <input 
                                type='radio' 
                                className={styles.genderRadio} 
                                id='feminino'
                                name='genderRadio' 
                                onChange={(e) => changeProductGender(e.target.id)}
                                defaultChecked={gender === 'feminino' ? true : false}
                            />
                            <label htmlFor='feminino'>Feminino</label>  
                        </li>
                        <li className={styles.genderListLine}>
                            <input 
                                type='radio' 
                                className={styles.genderRadio} 
                                id='unisex' 
                                name='genderRadio' 
                                onChange={(e) => changeProductGender(e.target.id)}
                            />
                            <label htmlFor='unisex'>Unisex</label>
                        </li>
                    </ul>

                    <div className={styles.listSeparator}/>
                    
                    <h2 className={styles.listTitle}>Tamanho</h2>
                    <ul className={styles.sizeList}>
                        {sizeList && sizeList.map((size, index) => {
                            return (
                                <li className={styles.sizeListLine} key={index}>
                                    <input 
                                        type='radio' 
                                        className={styles.genderRadio} 
                                        id={`${size}`} 
                                        value={size}
                                        name='genderRadio' 
                                        onChange={(e) => console.log(e.target.id)} 
                                    />
                                    <label htmlFor='todos'>{size}</label>  
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <ProductList 
                    products={selectedProducts as ProductType[]}
                    isLoading={isLoading}
                />
            </div>
        </main>
    )
}