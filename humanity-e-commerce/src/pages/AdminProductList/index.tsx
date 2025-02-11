import styles from './styles.module.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import { ring2 } from 'ldrs'
import { ProductType } from '../../types';
import { TopSection } from './TopSection';
import { ProductListTable } from './ProductListTable';

export const AdminProductList = () => {
    const [productList, setProductList] = useState<ProductType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<ProductType[]>();
    const [selectedOrder, setSelectedOrder] = useState<string>('');

    ring2.register()

    const getProductsData = async () => {
        setIsLoading(true)
        try {
            const response = await getAllProducts();
            setProductList(response.data)
            setSearchResult(response.data)
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getProductsData();
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const filteredProducts = productList?.filter((product) =>
            product.name.includes(e.target.value) ||
            product.gender.includes(e.target.value.toUpperCase()) ||
            product.category.includes(e.target.value)
        )
        setSearchResult(filteredProducts)
    }

    const handleOrganize = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        const target = e.target as HTMLParagraphElement;
        const id = target.id as keyof ProductType;

        if (selectedOrder == id) {
            setSearchResult(prev => prev?.slice().reverse());
        } else {
            const newResults = searchResult?.slice().sort((a, b) => {
                if (a[id] < b[id]) {
                    return -1;
                }
                if (a[id] > b[id]) {
                    return 1;
                }
                return 0;
            });
            setSearchResult(newResults);
            setSelectedOrder(id);
        }
    }

    const organizePrice = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        const target = e.target as HTMLParagraphElement;
        const id = target.id as keyof ProductType;

        if (selectedOrder == id) {
            setSearchResult(prev => prev?.slice().reverse());
        } else {
            const newResults = searchResult?.slice().sort((a, b) => {
                return parseFloat(a[id] as string) - parseFloat(b[id] as string);
            });
            setSearchResult(newResults);
            setSelectedOrder(id);
        }
    }

    return (
        <main className={styles.pageContainer}>
            <TopSection
                handleSearchChange={handleSearchChange}
                handleSubmit={handleSubmit}
                productList={productList as ProductType[]}
            />
            <ProductListTable
                handleOrganize={handleOrganize}
                isLoading={isLoading}
                organizePrice={organizePrice}
                productList={productList as ProductType[]}
                searchResult={searchResult as ProductType[]}
                selectedOrder={selectedOrder}
                setProductList={setProductList}
                setSearchResult={setSearchResult}
            />   
        </main>
    )
}