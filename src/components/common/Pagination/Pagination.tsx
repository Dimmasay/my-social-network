import style from './Pagination.module.scss'
import {useEffect, useState} from "react";
import {ProfileType} from "../../../redux/profileReducer";


type PaginationPropsType = {
    count: number,
    followUserTC: () => any,
    inFollowingProcess: ProfileType[]
    page: number
    setPageAC: (pageNumber : number) => any
    setUsersTC: () => any
    totalCount: number
    unFollowUserTC: () => any
    users: []
}

const Pagination: React.FC<PaginationPropsType> = (props) => {


    //totalCount is value all Users
    //count is value users on page

    const [portionNumber, setPortionNumber] = useState<number>(1)

    const totalPages = Math.ceil(props.totalCount / props.count)
    const portionSize = 10

    const leftLimitNumber = (portionNumber - 1) * portionSize + 1
    const rightLimitNumber = portionNumber * portionSize


    const arrayNumbers: Array<number> = []
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
                    key={page}
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
            <div className={style.body}>
                <button className={`${style.button} ${style.buttonPortionPrev}`}
                        onClick={setPrevPortion}
                        disabled={props.page <= portionSize && true}

                >Prev {portionSize}
                </button>
                <button className={`${style.button} ${style.buttonPagePrev}`}
                        onClick={setPrevPage}
                        disabled={props.page === 1 && true}
                >Prev
                </button>
                <div className={style.pagesList}>
                    {arrayPageNumbers}
                </div>
                <button className={`${style.button} ${style.buttonPageNext}`}
                        onClick={setNextPage}
                        disabled={props.page === totalPages && true}
                >Next

                </button>
                <button className={`${style.button} ${style.buttonPortionNext}`}
                        onClick={setNextPortion}
                        disabled={rightLimitNumber + portionSize > totalPages && true}
                >Next {portionSize}
                </button>
            </div>
        </div>
    )
}

export default Pagination