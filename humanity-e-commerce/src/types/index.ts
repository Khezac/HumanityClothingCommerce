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

// export type AllImagesProductType = {
//     product_id: number,
//     name: string,
//     gender: string,
//     size: string,
//     unit_price: string,
//     category: string,
//     description: string,
//     imageURL: Image[]
// }

// export type Image = {
//     fileName: string,
//     url: string
// }

export type NewProductType = {
    product_id: number,
    name: string,
    description: string,
    size: string,
    gender: string,
    unit_price: number,
    category: string
}