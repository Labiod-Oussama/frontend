import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Tabs, Toolbar, Typography, useTheme } from '@mui/material'
import logo from '../Assets/rendili_logo.jpg'
import user from '../Assets/user.jpg'
function Header({ isloging, profile, userInfo }) {
  const theme = useTheme()
  const navigate = useNavigate()
   const [chosen, setChosen] = useState(() => {
    const savedChosen = localStorage.getItem('choose')
    return JSON.parse(savedChosen) || ''
  })
  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('UserInfo')
    navigate('/login')
  }
  return (
    <AppBar sx={{ bgcolor: "whitesmoke", height: '70px', position: 'relative', mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
        <img src={logo} alt="logo_rendili" width='60px' onClick={() => navigate('/')} />
        {
          profile && <>
            <div style={{ flex: '1' }}></div>
            <Typography variant='body1' color='primary' mr={2} fontWeight='bold'>{userInfo[0].username}</Typography>
            <img src={user} alt='profile_name' width='50px' style={{ borderRadius: '10px',cursor:'pointer' }} onClick={()=>profile ?navigate(`/profile`):navigate('/login')} />
            <Button variant='contained' color='primary' sx={{ ml: 1 }} onClick={handleLogOut}>
              Log out
            </Button>
          </>
        }
        {
          !profile && !isloging && <>
            <Button variant='outlined' onClick={() => navigate('/login')} color='secondary' sx={{ marginLeft: 'auto', color: 'black', borderRadius: '50px', fontWeight: 'bold' }}>Connexion</Button>
            <Button variant='contained' onClick={() => navigate('/chooseToBe')} sx={{ bgcolor: 'primary.main', fontWeight: 'bold', borderRadius: '50px', ml: 2 }}>Inscription</Button>
          </>
        }

      </Toolbar>
    </AppBar>


  )
}

export default Header