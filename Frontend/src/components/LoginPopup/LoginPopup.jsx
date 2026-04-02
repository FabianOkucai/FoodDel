import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {
  const [currState, setCurrState] = useState("Login")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = currState === "Login" ? '/api/auth/login' : '/api/auth/register'
    
    try {
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (data.success) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setShowLogin(false)
        window.location.reload()
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input 
              type='text' 
              name="name"
              placeholder='Your Name' 
              required 
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <input 
            type='email' 
            name="email"
            placeholder='Your Email' 
            required 
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type='password' 
            name="password"
            placeholder='Your Password' 
            required 
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type='checkbox' required/>
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {
          currState==="Login"
          ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
          :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup