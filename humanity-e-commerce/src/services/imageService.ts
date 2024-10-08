import { api } from "./api"

export const postImage = (form:FormData) => {
    const url = "/image";
    
    return api.post(url, form);
}

export const deleteImageList = (list: number[]) => {
    const url ="/image"

    return api.delete(url, { data: list })
}