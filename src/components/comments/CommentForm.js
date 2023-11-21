import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getCommentsState } from '../../slices/commentsSlice'
import { getPostsState } from '../../slices/postsSlice'

const CommentForm = () => {
    const [content, setContent] = useState('')
    const { error, loading } = useSelector(getCommentsState)
    const { post } = useSelector(getPostsState)
    const dispatch = useDispatch()
    const handleChange = (e) => setContent(e.target.value)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(createComment({ content, postID: post._id })).unwrap()
            setContent('')
        } catch {}
    }
    if (loading) return <p>loading</p>
    if (error) return <p>{error}</p>
  return (
      <div>
          <h3>Add Comment</h3>
          <form onSubmit={handleSubmit}>
              <textarea value={content} onChange={handleChange} placeholder='Add content'></textarea>
              <button type="submit">Add Comment</button>
          </form>
      </div>
  )
}

export default CommentForm