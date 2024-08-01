import { api } from "./api"

export const getAllProducts = () => {
    const url = "/products"

    return api.get(url);
}

export const postProduct = (productJson:JSON) => {
    const url = "/products";
    return api.post(url, productJson, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}