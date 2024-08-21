export type ProductType = {
    product_id: number,
    name: string,
    gender: string,
    size: string,
    unit_price: string,
    category: string,
    description: string,
    images: ImageType[]
}

export type ImageType = {
    bytes: string,
    fileName: string,
    image_id: number,
    type: string,
}

export type NewProductType = {
    product_id: number,
    name: string,
    description: string,
    size: string,
    gender: string,
    unit_price: number,
    category: string
}

export type CartType = {
    user_id: number,
    product_id: number,
    product_amount: number,
    cart_price: number,
    selected_size: string;
}