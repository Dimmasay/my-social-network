import style from './Pagination.module.css'
import {useEffect, useState} from "react";


const Pagination = (props) => {


    //totalCount is value all Users
    //count is value users on page

    const [portionNumber, setPortionNumber] = useState(1)

    const totalPages = Math.ceil(props.totalCount / props.count)
    const portionSize = 10

    const leftLimitNumber = (portionNumber - 1) * portionSize + 1
    const rightLimitNumber = portionNumber * portionSize


    const arrayNumbers = []
    for (let p = 1; p <= totalPages; ++p) {
        arrayNumbers.push(p)
    }

    useEffect(() => {
        props.setPageAC(leftLimitNumber)
    }, [portionNumber])




    const arrayPageNumbers = arrayNumbers
        .filter((page) => {
            if (page >= leftLimitNumber && page <= rightLimitNumber) {
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

    const setNextPage = () => {
        if (props.page === rightLimitNumber) {
            setPortionNumber(portionNumber + 1)
            props.setPageAC(props.page + 1)
        } else if (props.page + 1 < arrayNumbers.length + 1) {
            props.setPageAC(props.page + 1)
        }


    }
    const setPrevPage = () => {
        if (props.page - 1 > 0 && props.page === leftLimitNumber) {
            setPortionNumber(portionNumber - 1)
            props.setPageAC(props.page - 1)
        } else if (props.page - 1 > 0) {
            props.setPageAC(props.page - 1)
        }
    }
    const setNextPortion = () => {
        if (rightLimitNumber + 1 <= totalPages) {
            setPortionNumber(portionNumber + 1)
            props.setPageAC(leftLimitNumber)
        }
    }
    const setPrevPortion = () => {
        if (leftLimitNumber - 1 > 0) {
            setPortionNumber(portionNumber - 1)
            props.setPageAC(leftLimitNumber)
        }
    }


    return (
        <div className={style.pagination}>
            <div className={style.container}>
                <button className={style.button}
                        onClick={setPrevPortion}
                        disabled={props.page <= portionSize && true}
                >Prev {portionSize}
                </button>
                <button className={style.button}
                        onClick={setPrevPage}
                        disabled={props.page === 1 && true}
                >Prev
                </button>
                <div className={style.pagesList}>
                    {arrayPageNumbers}
                </div>
                <button className={style.button}
                        onClick={setNextPage}
                        disabled={props.page === totalPages && true}
                >Next

                </button>
                <button className={style.button}
                        onClick={setNextPortion}
                        disabled={ rightLimitNumber + portionSize > totalPages && true}
                >Next {portionSize}
                </button>
            </div>
        </div>
    )
}

export default Pagination