import React, { useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost, getPostsState } from "../../slices/postsSlice"

const reducer = (state, action) => ({
  ...state,
  ...action,
})

const PostForm = () => {
  const initialState = {
    title: "",
    content: "",
  }
  const [postData, dispatchPostData] = useReducer(reducer, initialState)
  const dispatch = useDispatch()
  const { error } = useSelector(getPostsState)

  const handleChange = (e) => dispatchPostData({ [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createPost(postData)).unwrap()
      dispatchPostData(initialState)
    } catch {}
  }
  return (
    <div>
      <p>{error && error}</p>
      <h3>Add Post</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            placeholder="Add title"
          />
        </div>
        <div>
          <textarea
            name="content"
            value={postData.content}
            onChange={handleChange}
            placeholder="Add content"
          ></textarea>
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  )
}

export default PostForm
