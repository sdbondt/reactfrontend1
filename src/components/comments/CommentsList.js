import React from 'react'
import { useSelector } from 'react-redux'
import { getCommentsState } from '../../slices/commentsSlice'
import CommentItem from './CommentItem'

const CommentsList = () => {
    const { comments } = useSelector(getCommentsState)
    if(comments.length === 0) return <p>No comments</p>
  return (
      <div>
        {comments && comments.map((comment) => <CommentItem comment={comment} key={comment._id} />)}
      </div>
  )
}

export default CommentsList