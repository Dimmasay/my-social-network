import preloader from '../../../files/images/preloader.gif'
import style from './Preloader.module.scss'
const Preloader = (props) => {
    return (
        <div className={style.preloader}>
            <img src={preloader}/>
        </div>
    )
}

export default Preloader