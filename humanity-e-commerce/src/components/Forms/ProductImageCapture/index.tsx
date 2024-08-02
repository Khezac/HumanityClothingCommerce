import { AiOutlinePlusCircle } from 'react-icons/ai'
import styles from './styles.module.css'
import { BiCheckCircle } from 'react-icons/bi'

type ImageCaptureProps = {
    handleFile: (value:FileList) => void,
    handleSubmit: () => void
}

export const ProductImageCapture = (props:ImageCaptureProps) => {
    return (
        <div className={styles.addImagesContainer}>
            <div className={styles.btnContainer}>
                    <label htmlFor="uploadFile" className={styles.addImageBtn}><AiOutlinePlusCircle size={25} /> Adicionar Imagem</label>
                    <input id='uploadFile' type='file' onChange={(e) => props.handleFile(e.target.files as FileList)}/>
            </div>
            <div className={styles.imageDisplayContainer}>
            </div>
            <div className={styles.sendBtnContainer}>
                <button className={styles.sendProductBtn} onClick={props.handleSubmit}><BiCheckCircle size={25} /> Criar Produto</button>
            </div>
        </div>
    )
}