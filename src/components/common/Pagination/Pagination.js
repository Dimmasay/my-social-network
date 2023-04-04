import style from './Pagination.module.css'
import {useEffect, useState} from "react";


const Pagination = (props) => {

    //totalCount is value all Users
    //count is value users on page

    let portionSize = 10

    let totalPages = Math.ceil(props.totalCount / props.count)
    let arrayNumbers = []

    let [portionNumber, setPortionNumber] = useState(1)
    useEffect(()=>{
        props.setPageAC(leftLimitNumber)
    },[portionNumber])

    let leftLimitNumber = (portionNumber - 1) * portionSize + 1
    let rightLimitNumber = portionNumber * portionSize

    for (let p = 1; p <= totalPages; ++p) {
        arrayNumbers.push(p)
    }

    let arrayPageNumbers = arrayNumbers
        .filter((page) => {
            if(page >= leftLimitNumber && page <= rightLimitNumber){
                return page
            }
        })
        .map((page => {
        return (<div
                className={props.page === page
                    ? `${style.pageNumber} ${style.pageNumberSelected}`
                    : style.pageNumber}
                onClick={(e) => {
                    props.setPageAC(page)
                }}>{page}</div>
        )
    }))

    let setNextPage = () => {props.setPageAC(props.page + 1)}
    let setPrevPage = () => {props.setPageAC(props.page - 1)}
    let setNextPortion = () => {
        setPortionNumber(portionNumber + 1)
        props.setPageAC(leftLimitNumber)
    }
    let setPrevPortion = () => {
        setPortionNumber(portionNumber - 1)
        props.setPageAC(leftLimitNumber)
    }

    return (
        <div className={style.pagination}>
            <div className={style.container}>
                <button className={style.button}
                        onClick={setPrevPortion}
                >Prev 10
                </button>
                <button className={style.button}
                        onClick={setPrevPage}>Prev
                </button>
                <div className={style.pagesList}>
                    {arrayPageNumbers}
                </div>
                <button className={style.button}
                        onClick={setNextPage}>Next
                </button>
                <button className={style.button}
                        onClick={setNextPortion}
                >Next 10
                </button>
            </div>
        </div>
    )
}

export default Pagination