import { NewProductType } from "../pages/AdminCreateProduct";
import { api } from "./api"

export const postProduct = (form:FormData) => {
    const url = "/products";
    
    return api.post(url, form);
}

export const getAllProducts = () => {
    const url = "/products"

    return api.get(url);
}

export const getProductById = (id :string) => {
    const url = "/products/" + id

    return api.get(url);
}

export const putProduct = (productUpdated :NewProductType) => {
    const url = "/products"

    return api.put(url, productUpdated)
}

export const deleteProductById = (id:number) => {
    const url = "/products/" + id;

    return api.delete(url);
}