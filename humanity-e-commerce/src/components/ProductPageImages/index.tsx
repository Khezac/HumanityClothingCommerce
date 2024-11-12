import { useEffect, useState } from 'react';
import { ImageType } from '../../types';
import styles from './styles.module.css'

type PageImagesProps = {
    images: ImageType[];
}

export const ProductPageImages = (props: PageImagesProps) => {
    const [mainImage, setMainImage] = useState<ImageType>();
    const [imageShowing, setImageShowing] = useState('');

    const switchImage = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, i: number) => {
        const id = i
        setMainImage(props.images[id])
        setImageShowing(e.currentTarget.id);
    }

    useEffect(() => {
        if(props.images) {
            setMainImage(props.images[0])
        }
    },[props.images])

    return (
        <div className={styles.imagesContainer}>
            <menu className={styles.imgOptions}>
                {props.images && props.images.map((item, index) => {
                    return (
                        <img
                            className={imageShowing == item.image_id.toString() ? styles.switchImgChecked : styles.switchImg}
                            src={`data:${item.type};base64,${item.bytes}`}
                            alt="Alternar imagem"
                            id={item.image_id.toString()}
                            key={item.image_id}
                            onClick={(e) => switchImage(e,index)}
                        />
                    )
                })
                }
            </menu>
            <img
                className={styles.mainImg}
                src={mainImage
                    ?
                    `data:${mainImage?.type};base64,${mainImage?.bytes}`
                    :
                    ''
                }
                alt="Alternar imagem"
            />
        </div>
    )
}