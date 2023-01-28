import { Box, Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import header from '../../Assets/header.webp'
import Header from '../../Global/Header'

function Home() {
  const TimeCheckbox = ['Télétravail', 'Temps Partial', 'Horaires flexibles', 'Chien accepte']
  return (
    <Box>
      <Header />
      <Box display='flex'>
        <Box flex={1.2} sx={{ m: '100px 30px' }}>
          <Typography variant='h2' color='secondary' sx={{ fontWeight: 'bolder', mb: 5 }} gutterBottom>
            Trouvez l'emploi <br />
            qui vous convient :
          </Typography>
          <Box display='flex' mb={4}>
            <TextField
              label="Entrer un intitulé de poste ou mot-clé"
              variant='outlined'
              color='secondary'
              sx={{ width: '40%', mr: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Lieu"
              variant='outlined'
              color='secondary'
              sx={{ mr: 2, width: '20%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FmdGoodOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
            <Button variant='contained' sx={{ bgcolor: 'primary.main', borderRadius: '60px', fontWeight: 'bold' }}>
              Trouver un emmploi
            </Button>

          </Box>
          <FormGroup sx={{display:"flex",flexDirection:'row',mb:7}}>
            {
              TimeCheckbox.map(ele => (
                <FormControlLabel control={<Checkbox />} label={ele} sx={{mr:5}}></FormControlLabel>
              ))
            }
          </FormGroup>
          <Box>
             <Typography variant='h5' color='secondary' mb={2}>Ou laissez-nous le trouver pour vous. Fates le test :</Typography>
             <Button  color='secondary' variant='outlined' sx={{borderRadius:'60px',fontWeight:'bolder',mr:3}} size="large" startIcon={<MailOutlineOutlinedIcon/>}>
                 Inscription gratuite
             </Button>
             <Button  color='secondary' variant='outlined' sx={{borderRadius:'60px',fontWeight:'bolder'}} size='large' startIcon={<AddToDriveOutlinedIcon/>}>
                 Je m'inscris
             </Button>
          </Box>

        </Box>
        <Box flex={0.8} sx={{display:'flex',alignItems:'center'}}>
           <img src={header}  alt='header' width='90%' height='70%'/>
        </Box>

      </Box>
    </Box>
  )
}

export default Home