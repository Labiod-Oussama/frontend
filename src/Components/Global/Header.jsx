import React from 'react'
import {useNavigate} from 'react-router-dom'

import { AppBar, Button,Tabs, Toolbar, useTheme } from '@mui/material'
import logo from '../Assets/rendili_logo.jpg'
function Header() {
    const theme = useTheme()
    const navigate=useNavigate()
  return (
     
        <AppBar sx={{bgcolor:"whitesmoke",height:'70px',position:'relative',mb:2}}>
            <Toolbar >
              <img src={logo} alt="logo_rendili" width='60px'  onClick={()=>navigate('/')}/>
                <Tabs sx={{marginLeft:'auto',marginTop:'auto'}} indicatorColor='secondary'>
                     <Button  variant='outlined'  onClick={()=>navigate('/login')} color='secondary' sx={{color:'black',borderRadius:'50px',fontWeight:'bold'}}>Connexion</Button>
                    <Button variant='contained' onClick={()=>navigate('/signup')}  sx={{bgcolor:'primary.main' ,fontWeight:'bold',borderRadius:'50px',ml:2}}>Inscription</Button>
                 </Tabs>
            </Toolbar>
        </AppBar>
    
      
  )
}

export default Header