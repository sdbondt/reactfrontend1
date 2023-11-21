import React, { useEffect, useReducer, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAuthState, login } from "../../slices/authSlice"
import { useHistory } from "react-router-dom"

const reducer = (state, action) => ({
  ...state,
  ...action,
})

const Login = () => {
  const [credentials, dispatchCredentials] = useReducer(reducer, {
    email: "",
    password: "",
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
    e.preventDefault();
    await dispatch(login(credentials))
    if(login.fulfilled) history.push('/posts')
  }

  if (loading) return <p>loading...</p>

  return (
    <div>
      <h3>Login</h3>
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
          type="password"
          name="password"
          placeholder="enter your password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
