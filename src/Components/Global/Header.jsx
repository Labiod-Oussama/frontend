import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBar, Box, Button, Tabs, Toolbar, useTheme } from '@mui/material'
import logo from '../Assets/rendili_logo.jpg'
function Header({isloging}) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [chosen,setChosen]=useState(()=>{
    const savedChosen=localStorage.getItem('choose')
    return JSON.parse(savedChosen) || ''
  })
  return (

    <AppBar sx={{ bgcolor: "whitesmoke", height: '70px', position: 'relative', mb: 2 }}>
      <Toolbar sx={{display:'flex',justifyContent:'space-between'}} >
        <img src={logo} alt="logo_rendili" width='60px' onClick={() => navigate('/')} />
        {!isloging && <Button variant='outlined' onClick={() => navigate('/login')} color='secondary' sx={{ marginLeft: 'auto', color: 'black', borderRadius: '50px', fontWeight: 'bold' }}>Connexion</Button>}
       {/* <Button variant='contained' onClick={() =>chosen=='chosenCompany'?navigate('/signupCom'):(chosen=='chosenEmployer'?navigate('/Signup'):navigate('/chooseToBe'))} sx={{ bgcolor: 'primary.main', fontWeight: 'bold', borderRadius: '50px', ml: 2 }}>Inscription</Button> */}
       <Button variant='contained' onClick={() =>navigate('/chooseToBe')} sx={{ bgcolor: 'primary.main', fontWeight: 'bold', borderRadius: '50px', ml: 2 }}>Inscription</Button>
      </Toolbar>
    </AppBar>


  )
}

export default Header