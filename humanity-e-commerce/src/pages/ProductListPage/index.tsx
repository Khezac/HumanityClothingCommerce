import { useEffect, useState } from 'react'
import { ProductListPageBanner } from '../../components/ProductListPageBanner'
import { getAllProducts } from '../../services/productService'
import { ProductType } from '../../types'
import styles from './styles.module.css'
import { ring2 } from 'ldrs'
import { ProductList } from '../../components/ProductList'
import { useParams } from 'react-router'
import { ProductListFilter } from '../../components/ProductListFilter'
import { FaSearch } from 'react-icons/fa'

export const ProductListPage = () => {
    const [products, setProducts] = useState<ProductType[]>();
    const [filteredByGender, setFilteredByGenders] = useState<ProductType[]>();
    const [filteredBySize, setFilteredBySize] = useState<ProductType[]>();
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
            setFilteredByGenders(data);
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
        filteredByGender?.map((element) => {
            sizeArray.push(...element.size.match(/\b\d+\b|\b[A-Za-z]+\b/g) as RegExpMatchArray);
        })

        // Limpa as duplicatas
        sizeArray = sizeArray.filter((sizeValue, index) => {
            return (sizeArray.indexOf(sizeValue) === index)
        })

        setSizeList(sizeArray);
        setFilteredBySize(undefined);
    }

    const changeProductGender = (gender: string) => {
        if (gender === 'todos' || !gender) {
            setFilteredByGenders(products);
            setFilteredProducts(products);
        } else {
            setFilteredByGenders(
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
        setFilteredBySize(
            filteredByGender?.filter((element) => {
                return element.size.toUpperCase().includes(size.toUpperCase());
            })
        )
        setFilteredProducts(
            filteredByGender?.filter((element) => {
                return element.size.toUpperCase().includes(size.toUpperCase());
            })
        )
    }

    const handleSearchBar = (search: string) => {
        if(filteredBySize) {
            setFilteredProducts(filteredBySize?.filter((product) => {
                return product.name.includes(search);
            }));
        } else {
            setFilteredProducts(filteredByGender?.filter((product) => {
                return product.name.includes(search);
            }));
        }
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
    },[filteredByGender])

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
                <div className={styles.productsContainer}>
                    <div className={styles.searchBarContainer}>
                        <input 
                            className={styles.searchInput}
                            id='searchInput'
                            placeholder='Procure um produto pelo nome...'
                            autoComplete='off'
                            onChange={(e) => handleSearchBar(e.target.value)}
                        />
                        <label
                            htmlFor='searchInput'
                            className={styles.searchIcon}
                        >
                            <FaSearch size={25} color='#56876D' />
                        </label>
                    </div>
                    <ProductList 
                        products={filteredProducts as ProductType[]}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </main>
    )
}