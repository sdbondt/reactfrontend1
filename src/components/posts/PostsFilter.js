import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPostsState, setSearchParams } from "../../slices/postsSlice"

const PostsFilter = () => {
  const { searchParams, totalCount } = useSelector(getPostsState)
  const { direction, limit, sortBy, q, page } = searchParams
  const dispatch = useDispatch()
  const maxPage = useMemo(() => Math.ceil(totalCount / limit), [totalCount, limit]) 

    const changeParams = (e) => dispatch(setSearchParams({ [e.target.name]: e.target.value }))
    const goToFirstPage = () => dispatch(setSearchParams({ page: 1 }))
    const goToLastPage = () => dispatch(setSearchParams({ page: maxPage }))
    const goToNextPage = () => dispatch(setSearchParams({ page: page + 1 }))
    const goToPreviousPage = () => dispatch(setSearchParams({ page: page - 1 }))
    
    useEffect(() => {
        if (page > maxPage || page < 1) dispatch(setSearchParams({ page: 1}))
    }, [page, maxPage, dispatch])
  
  return (
    <div>
      <p>
        {limit} posts of {totalCount}
      </p>
      <div>
        <input type="text" name="q" value={q} onChange={changeParams} />
        <select name="direction" value={direction} onChange={changeParams}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <select name="limit" value={limit} onChange={changeParams}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <select name="sortBy" value={sortBy} onChange={changeParams}>
          <option value="title">title</option>
          <option value="date">date</option>
        </select>
      </div>
      <div>
        <button type="button" disabled={page === 1} onClick={goToFirstPage}>
          1
        </button>
        <button type="button" disabled={page === 1} onClick={goToPreviousPage} >
          -
        </button>
        <span>page: {page}</span>
        <button type="button" disabled={page === maxPage} onClick={goToNextPage} >
          +
        </button>
        <button type="button" disabled={page === maxPage} onClick={goToLastPage} >
          {maxPage}
        </button>
      </div>
    </div>
  )
}

export default PostsFilter
