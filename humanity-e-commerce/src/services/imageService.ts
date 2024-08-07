import { api } from "./api"

export const postImage = (form:FormData) => {
    const url = "/file/upload";
    
    return api.post(url, form);
}