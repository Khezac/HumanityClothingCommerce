import { AiOutlinePlusCircle } from 'react-icons/ai'
import styles from './styles.module.css'
import { BiCheckCircle } from 'react-icons/bi'
import { ChangeEvent, useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { ring2 } from 'ldrs'
import { MdOutlineCancel } from "react-icons/md";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { AllImagesProductType, Image } from '../../../pages/AdminCreateProduct';

type ImageCaptureProps = {
    handleFile: (value: FileList) => void,
    handleSubmit: () => void,
    images: File[],
    setValue: (value: File[] | ((prev: File[]) => File[])) => void
    isLoading: boolean,
    handleCancel: () => void,
    imageError: boolean,
    isAtLimit: boolean,
    product: AllImagesProductType,
    pageType: string,
    setIsAtLimit: (value: boolean) => void,
    setDeleteFromS3: (value: Image[] | ((prev: Image[]) => Image[])) => void
}

export const ProductImageCapture = (props: ImageCaptureProps) => {
    const [imagemId, setImagemId] = useState(0);
    const [imagesURLs, setImagesURLs] = useState<string[]>([]);

    ring2.register()

    const handleDelete = () => {
        if (imagesURLs.length > 1) {
            const urlToBeDeleted = imagesURLs[imagemId];
            const imagesFromProduct = props.product.imageURL;

            // Manda a imagem que estiver sendo exibida para uma lista que será deletada do Banco
            imagesFromProduct.map((image) => {
                if (image.url == urlToBeDeleted) {
                    props.setDeleteFromS3((prev) => [...prev, image])
                }
            })

            //  Deleta a URL da imagem que estava sendo exibida da lista de URLs
            setImagesURLs((prev: string[]) => {
                return prev.filter((element: string) => {
                    return element != imagesURLs[imagemId]
                })
            })

            setImagemId(0);
        } else {
            console.log("É preciso ter ao menos uma imagem relacionada ao produto")
        }
    }

    const handleLeft = () => {
        if (imagemId > 0 && imagesURLs.length > 0) {
            setImagemId(prev => prev - 1)
        } else if (imagemId == 0 && !props.product) {
            setImagemId(props.images.length - 1)
        } else if (imagemId == 0 && imagesURLs.length > 0) {
            setImagemId(imagesURLs.length - 1)
        }
    }

    const handleRight = () => {
        if (imagemId < imagesURLs.length - 1) {
            setImagemId(prev => prev + 1)
        } else {
            setImagemId(0)
        }
    }

    const handleInsertImages = (e: ChangeEvent<HTMLInputElement>) => {
        if (imagesURLs.length < 3) {
            props.handleFile(e.target.files as FileList)
            createUrls(e.target.files as FileList)
        } else {
            props.setIsAtLimit(true)

            setTimeout(() => {
                props.setIsAtLimit(false)
            }, 2000);
        }
    }

    const createUrls = (files: FileList) => {
        const filesArray = Array.from(files);

        filesArray.forEach((file) => {
            const fileURL = URL.createObjectURL(file)
            setImagesURLs((prev) =>
                [...prev, fileURL]
            )
        })
    }

    useEffect(() => {
        if (props.product) {
            setImagesURLs([])

            props.product.imageURL.forEach(element => {
                setImagesURLs(prev => [...prev, element.url])
            })
        }
    }, [props.product])

    return (
        <div className={styles.addImagesContainer}>
            <div className={styles.imagePreviewWrapper}>
                <menu style={{marginBottom: 0.2 + "rem" }} >
                    <h1>
                        {props.product ? imagemId + 1 : imagesURLs.length != 0 ? imagemId + 1 : 0}/{imagesURLs.length}
                    </h1>
                    {props.pageType === 'edit' || props.pageType === 'creat' ?
                        <button className={styles.deleteImgBtn} onClick={handleDelete}>
                            <FaTrash size={25} color='#04724D' />
                        </button>
                        :
                        <p></p>
                    }
                </menu>
                <div className={props.imageError ? styles.imagePreviewContainerError : styles.imagePreviewContainer}>
                    <button className={styles.switchPreviewBtnLeft} id='Esquerda' onClick={handleLeft}>
                        <RiArrowDropLeftLine size={60} color='#04724D' />
                    </button>

                    <img src={imagesURLs[imagemId]} onClick={() => console.log(props.pageType)} className={styles.imagePreview} />

                    <button className={styles.switchPreviewBtnRight} id='Direita' onClick={handleRight}>
                        <RiArrowDropRightLine size={60} color='#04724D' />
                    </button>

                    {props.imageError &&
                        <p className={styles.imgErrorMsg}>Necessário ao menos uma imagem</p>
                    }
                </div>
                {props.isAtLimit ?
                    <span style={{ color: "#FF8B8B", fontWeight: 600, marginTop: 0.2 + "rem" }}>Limite atingido!</span>
                    :
                    <span style={{ color: "#04724D", fontWeight: 600, marginTop: 0.2 + "rem" }}>3 max</span>
                }
            </div>
            {props.pageType !== "details" && <div className={styles.btnContainer}>
                <label
                    htmlFor="uploadFile"
                    className={props.pageType === "details" ? styles.addImageBtnDisabled : styles.addImageBtn}
                >
                    <AiOutlinePlusCircle size={25} /> Adicionar Imagem
                </label>
                <input
                    id='uploadFile'
                    type='file'
                    onChange={(e) => { handleInsertImages(e) }}
                />
            </div>
            }
            {props.isLoading ?
                <button className={styles.sendProductBtn} disabled>
                    <l-ring-2
                        size="40"
                        stroke="5"
                        stroke-length="0.25"
                        bg-opacity="0.1"
                        speed="0.8"
                        color="#DCE4DC"
                    ></l-ring-2>
                </button>
                :
                props.pageType !== "details" && <button className={styles.sendProductBtn} onClick={props.handleSubmit}><BiCheckCircle size={25} /> Concluir</button>
            }
            <button className={styles.cancelProductBtn} onClick={props.handleCancel}><MdOutlineCancel size={25} /> {props.pageType === "details" ? "Voltar" : "Cancelar"}</button>
        </div>
    )
}