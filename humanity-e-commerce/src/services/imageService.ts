import { Image } from "../pages/AdminCreateProduct";
import { api } from "./api"

export const postImage = (form:FormData) => {
    const url = "/file/upload";
    
    return api.post(url, form);
}

export const deleteImageList = (list: Image[]) => {
    const url ="/file/delete"

    return api.delete(url, { data: list })
}