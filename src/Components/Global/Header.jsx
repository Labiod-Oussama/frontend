import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Avatar, Box, Button, Toolbar, Typography, useTheme } from '@mui/material'
import logo from '../Assets/rendili_logo.svg'
import user from '../Assets/user.jpg'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
function Header({ isloging, profile, UserInfos, updateContext }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [chosen, setChosen] = useState(() => {
    const savedChosen = localStorage.getItem('choose')
    return JSON.parse(savedChosen) || ''
  })
  const handleLogOut = () => {
    updateContext({});
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('UserInfo')
    // localStorage.removeItem('SearchKeywords')
    navigate('/login')
  }
  return (
    <AppBar sx={{ bgcolor: "whitesmoke", height: '70px', position: 'relative', mb: 2, zIndex: 1 }}>
      <Toolbar sx={{ height:'100%',display: 'flex', justifyContent: 'space-between' ,alignItems:'center'}} >
        <img src={logo} alt="logo_rendili" width='40px' onClick={() => navigate('/')} />
        {
          profile && <>
            <div style={{ flex: '1' }}></div>
            <Typography variant='body1' color='primary' mr={2} fontWeight='bold'>{UserInfos.username}</Typography>
            <Avatar src={user} alt='profile_name' variant="rounded" sx={{ width: '45px', height: '45px', cursor: 'pointer' }} onClick={() => profile ? navigate(`/profile`) : navigate('/login')} />
            <Button variant='contained' color='primary' endIcon={<LogoutIcon/>} sx={{ ml: 1 }} onClick={handleLogOut}>
              Log out
            </Button>
          </>
        }
        {
          !profile && !isloging && <>
            <Button variant='outlined' onClick={() => navigate('/login')} color='secondary' startIcon={<LoginIcon/>} sx={{ marginLeft: 'auto', color: 'black', borderRadius: '50px', fontWeight: 'bold' }}>Log in</Button>
            <Button variant='contained' onClick={() => navigate('/chooseToBe')} startIcon={<PersonAddAltIcon/>} sx={{ bgcolor: 'primary.main', fontWeight: 'bold', borderRadius: '50px', ml: 2 }}>Sign up</Button>
          </>
        }

        {
          isloging && <Button variant='contained' onClick={() => navigate('/chooseToBe')} sx={{ bgcolor: 'primary.main', fontWeight: 'bold', borderRadius: '50px', ml: 2 }}>Inscription</Button>
        }

      </Toolbar>
    </AppBar>


  )
}

export default Header