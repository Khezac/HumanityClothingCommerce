import { api } from "./api"

export const getAllProducts = () => {
    const url = "/products"

    return api.get(url);
}

export const postProduct = (form:FormData) => {
    const url = "/products";
    
    return api.post(url, form);
}

export const deleteProductById = (id:number) => {
    const url = "/products/" + id;

    return api.delete(url);
}