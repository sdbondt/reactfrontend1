import React, { useEffect, useReducer, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAuthState, signup } from "../../slices/authSlice"
import { useHistory } from "react-router-dom"

const reducer = (state, action) => ({
  ...state,
  ...action,
})

const Signup = () => {
  const [credentials, dispatchCredentials] = useReducer(reducer, {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  })

  const dispatch = useDispatch()
  const ref = useRef()
  const history = useHistory()
  const { error, loading } = useSelector(getAuthState)

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleChange = (e) => dispatchCredentials({ [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(signup(credentials))
    if(signup.fulfilled) history.push("/")
  }

  if (loading) return <p>loading...</p>

  return (
    <div>
      <h3>Signup</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="enter you email"
          value={credentials.email}
          onChange={handleChange}
          ref={ref}
        />
        <input
          type="text"
          name="name"
          placeholder="enter your name"
          value={credentials.name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="enter your password"
          value={credentials.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm your password"
          value={credentials.confirmPassword}
          onChange={handleChange}
        />
        <button disabled={loading} type="submit">
          Signup
        </button>
      </form>
    </div>
  )
}

export default Signup
