import styles from './styles.module.css'

type FilterProps = {
    changeProductGender: (gender:string) => void,
    changeProductSize: (size: string) => void,
    sizeList: string[],
    gender: string
}

export const ProductListFilter = ({changeProductGender, changeProductSize, sizeList, gender}:FilterProps) => {
    return (
        <div className={styles.filterContainer}>
                    <h2 className={styles.listTitle}>Gêneros</h2>
                    <ul className={styles.genderList}>
                        <li className={styles.genderListLine}>
                            <input 
                                type='radio' 
                                className={styles.genderRadio} 
                                id='todos' 
                                name='genderRadio' 
                                onChange={(e) => changeProductGender(e.target.id)} 
                                defaultChecked={!gender ? true : false}
                            />
                            <label htmlFor='todos'>Todos</label>  
                        </li>
                        <li className={styles.genderListLine}>
                            <input type='radio' 
                                className={styles.genderRadio} 
                                id='masculino' 
                                name='genderRadio' 
                                onChange={(e) => changeProductGender(e.target.id)} 
                                defaultChecked={gender === 'masculino' ? true : false}
                            />
                            <label htmlFor='masculino'>Masculino</label>  
                        </li>
                        <li className={styles.genderListLine}>
                            <input 
                                type='radio' 
                                className={styles.genderRadio} 
                                id='feminino'
                                name='genderRadio' 
                                onChange={(e) => changeProductGender(e.target.id)}
                                defaultChecked={gender === 'feminino' ? true : false}
                            />
                            <label htmlFor='feminino'>Feminino</label>  
                        </li>
                        <li className={styles.genderListLine}>
                            <input 
                                type='radio' 
                                className={styles.genderRadio} 
                                id='unisex' 
                                name='genderRadio' 
                                onChange={(e) => changeProductGender(e.target.id)}
                            />
                            <label htmlFor='unisex'>Unisex</label>
                        </li>
                    </ul>

                    <div className={styles.listSeparator}/>
                    
                    <h2 className={styles.listTitle}>Tamanhos</h2>
                    <ul className={styles.sizeList}>
                        {sizeList && sizeList.map((size, index) => {
                            return (
                                <li className={styles.sizeListLine} key={index}>
                                    <input 
                                        type='radio' 
                                        className={styles.genderRadio} 
                                        id={`${size}`} 
                                        value={size}
                                        name='sizeRadio' 
                                        onChange={(e) => changeProductSize(e.target.id)} 
                                    />
                                    <label htmlFor='todos'>{size}</label>  
                                </li>
                            )
                        })}
                    </ul>
                </div>
    )
}