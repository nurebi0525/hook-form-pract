import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

export const Main = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/sign-in")
  }
  return (
    <div>
        <h1>Welcome to Main Page!</h1>
<Button onClick={logout}>Logout</Button>
    </div>
  )
}
