import React from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, useTheme } from '@mui/material'
import logo from '../Assets/rendili_logo.jpg'
function Header() {
    const theme = useTheme()
  return (
     
        <AppBar sx={{bgcolor:"whitesmoke",height:'70px',position:'relative',mb:2}}>
            <Toolbar >
              <img src={logo} alt="logo_rendili" width='60px' />
                <Tabs sx={{marginLeft:'auto',marginTop:'auto'}} indicatorColor='secondary'>
                     <Button  variant='outlined' color='secondary' sx={{color:'black',borderRadius:'50px',fontWeight:'bold'}}>Connexion</Button>
                    <Button variant='contained'   sx={{bgcolor:'primary.main' ,fontWeight:'bold',borderRadius:'50px',ml:2}}>Inscription</Button>
                 </Tabs>
            </Toolbar>
        </AppBar>
    
      
  )
}

export default Header