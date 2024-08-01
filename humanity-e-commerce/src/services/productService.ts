import { api } from "./api"

export const getAllProducts = () => {
    const url = "/products"

    return api.get(url);
}