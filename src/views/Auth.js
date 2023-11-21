import React, { useState } from 'react'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div>
      <h3>{showLogin ? <Login /> : <Signup />}</h3>
      <button onClick={() => setShowLogin((val) => val = !val)}>{ showLogin ? 'Signup instead': 'Login instead' }</button>
    </div>
  )
}

export default Auth