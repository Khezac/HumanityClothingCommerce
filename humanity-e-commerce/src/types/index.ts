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