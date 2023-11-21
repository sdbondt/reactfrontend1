import React from 'react'
import useUserID from '../../hooks/useUserID'
import CommentAuthorOptions from './CommentAuthorOptions'

const CommentItem = ({ comment }) => {
    const userID = useUserID()
  return (
      <div>
          <p>{comment.content}</p>
          <p>by {comment.user.name}</p>
          {userID === comment.user._id && <CommentAuthorOptions comment={comment} />}
      </div>
  )
}

export default CommentItem