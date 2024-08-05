import { AiOutlinePlusCircle } from 'react-icons/ai'
import styles from './styles.module.css'
import { BiCheckCircle } from 'react-icons/bi'
import { useState } from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ring2 } from 'ldrs'
import { MdOutlineCancel } from "react-icons/md";

type ImageCaptureProps = {
    handleFile: (value: FileList) => void,
    handleSubmit: () => void,
    images: File[],
    setValue: (value: File[] | ((prev: File[]) => File[])) => void
    isLoading: boolean,
    handleCancel: () => void,
    imageError: boolean,
    isAtLimit: boolean
}

export const ProductImageCapture = (props: ImageCaptureProps) => {
    const [imagemId, setImagemId] = useState(0);

    ring2.register()

    const handleDelete = () => {
        props.setValue((prev: File[]) => {
            return prev.filter((element: File) => {
                return element.size != props.images[imagemId].size || element.name != props.images[imagemId].name
            }
            )
        })

        setImagemId(0);
    }

    const handleEsquerda = () => {
        if (imagemId > 0) {
            setImagemId(prev => prev - 1)
        } else if (imagemId == 0) {
            setImagemId(props.images.length - 1)
        }
    }

    const handleDireita = () => {
        if (imagemId < props.images.length - 1) {
            setImagemId(prev => prev + 1)
        } else {
            setImagemId(0)
        }
    }

    return (
        <div className={styles.addImagesContainer}>
            <div className={styles.btnContainer}>
                <label htmlFor="uploadFile" className={styles.addImageBtn}><AiOutlinePlusCircle size={25} /> Adicionar Imagem</label>
                <input id='uploadFile' type='file' onChange={(e) => props.handleFile(e.target.files as FileList)} />
            </div>
            <div className={styles.imagePreviewWrapper}>
                <menu >
                    <h1>{props.images.length != 0 ? imagemId + 1 : 0}/{props.images.length}</h1>
                    <button className={styles.deleteImgBtn} onClick={handleDelete}><FaTrash size={25} color='#04724D' /></button>
                </menu>
                <div className={props.imageError ? styles.imagePreviewContainerError : styles.imagePreviewContainer}>
                    <button className={styles.switchPreviewBtnLeft} id='Esquerda' onClick={handleEsquerda}><FaArrowCircleLeft size={30} color='#04724D' /></button>
                    <img src={props.images.length > 0 ? URL.createObjectURL(props.images[imagemId]) : ""} className={styles.imagePreview} />
                    <button className={styles.switchPreviewBtnRight} id='Direita' onClick={handleDireita}><FaArrowCircleRight size={30} color='#04724D' /></button>
                    {props.imageError && <p className={styles.imgErrorMsg}>Necessário ao menos uma imagem</p>}
                </div>
                {props.isAtLimit ?
                    <span style={{ color: "#FF8B8B", fontWeight: 600 }}>Limite atingido!</span>
                    :
                    <span style={{ color: "#04724D", fontWeight: 600 }}>3 max</span>
                }
            </div>
            <div className={styles.sendBtnContainer}>
                {props.isLoading ?
                    <button className={styles.sendProductBtn} disabled onClick={props.handleSubmit}>
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
                    <button className={styles.sendProductBtn} onClick={props.handleSubmit}><BiCheckCircle size={25} /> Criar Produto</button>
                }
            </div>
            <div className={styles.sendBtnContainer}>
                <button className={styles.cancelProductBtn} onClick={props.handleCancel}><MdOutlineCancel size={25} /> Cancelar</button>
            </div>
        </div>
    )
}