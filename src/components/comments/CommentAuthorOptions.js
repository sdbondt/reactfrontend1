import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteComment, updateComment } from "../../slices/commentsSlice"

const CommentAuthorOptions = ({ comment }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [content, setContent] = useState(comment.content)
  const dispatch = useDispatch()

  const handleDelete = () => dispatch(deleteComment(comment._id))
  const toggleUpdateForm = () => setShowUpdateForm((val) => !val)
  const handleChange = (e) => setContent(e.target.value)
  const handleUpdate = async (e) => {
    e.preventDefault()
      try {
          dispatch(updateComment({
              commentID: comment._id,
              content
        }))
      } catch { }
      setShowUpdateForm(false)
  }
  return (
    <div>
      <button type="button" onClick={handleDelete}>
        Delete Comment
      </button>
      <button type="button" onClick={toggleUpdateForm}>
        Update Comment
      </button>
      {showUpdateForm && (
        <form onSubmit={handleUpdate}>
          <textarea value={content} onChange={handleChange}></textarea>
          <button>Update</button>
        </form>
      )}
    </div>
  )
}

export default CommentAuthorOptions
