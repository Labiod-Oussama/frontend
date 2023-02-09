import { Box, Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AOS from 'aos'
import 'aos/dist/aos.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import header from '../../Assets/header.webp'
import analyse from '../../Assets/analyse.png'
import work from '../../Assets/work.png'
import check from '../../Assets/check.png'
import apple_store from '../../Assets/apple_store.svg'
import google_play from '../../Assets/google_play.svg'
import Header from '../../Global/Header'
import Footer from '../../Global/Footer';

function Home() {
  const theme = useTheme()
  const navigate = useNavigate()
  const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
  const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
  const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
  const TimeCheckbox = ['onsite', 'remote', 'hybride',]
  const [searchJob, setSearchJob] = useState('')
  const [searchPlace, setSearchPlace] = useState('')
  const [TypeOfJob,setTypeOfJob]=useState('')
  useEffect(() => {
    AOS.init({ duration: 1200 })
  }, [])
  return (
    <Box overflow='hidden'>
      <Header isloging={false} />
      <Box display='flex'>
        <Box flex={1.2} sx={{ m: isMatchedTablette ? '50px 30px' : '100px 30px' }}>
          <Typography variant={isMatchedPhone ? 'h4' : 'h2'} color='secondary' sx={{ fontWeight: 'bolder', mb: 5 }} gutterBottom>
            Trouvez l'emploi <br />
            qui vous convient :
          </Typography>
          {
            isMatchedLaptop ? <Box flex={0.8} sx={{ display: isMatchedTablette ? 'none' : 'block', textAlign: 'center', mb: 5 }}>
              <img src={header} alt='header' width='35%' height='50%' />
            </Box> : null
          }
          <Box display='flex' flexWrap={'wrap'} mb={3} >
            <TextField
              label="Entrer un intitulé de poste ou mot-clé"
              variant='outlined'
              color='secondary'
              onChange={(e) => {setSearchJob(e.target.value)}}
              sx={{ width: isMatchedPhone ? '100%' : '45%', mr: 2, mb: isMatchedPhone ? 2 : 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={{ color: 'black' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Lieu"
              variant='outlined'
              color='secondary'
              onChange={(e) => setSearchPlace(e.target.value)}
              sx={{ mr: 2, width: isMatchedPhone ? '35%' : '20%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FmdGoodOutlinedIcon sx={{ color: 'black' }} />
                  </InputAdornment>
                )
              }}
            />
            <Button variant='contained' size='medium' onClick={() => { navigate(`/Jobs?${searchJob && `keywords=${searchJob}&`}${searchPlace &&`cityLoc=${searchPlace}&`}${TypeOfJob && `typeOfJob=${TypeOfJob}`}`)}} sx={{ bgcolor: 'primary.main', borderRadius: '60px', fontWeight: 'bold' }}>
              Trouver un emmploi
            </Button>
          </Box>
          <FormGroup sx={{ display: "flex", flexWrap: 'wrap', flexDirection: 'row', mb: 7 }}>
            {
              TimeCheckbox.map((ele, index) => (
                <FormControlLabel key={index} control={<Checkbox />} label={ele} onClick={()=>setTypeOfJob(ele)} sx={{ mr: 5 }}></FormControlLabel>
              ))
            }
          </FormGroup>
          <Box >
            <Typography variant='h5' color='secondary' mb={2}>Ou laissez-nous le trouver pour vous. Fates le test :</Typography>
            <Box display='flex' flexDirection={isMatchedPhone ? 'column' : 'row'} alignItems={isMatchedPhone ? 'center' : 'flex-start'}>
              <Button color='secondary' variant='outlined' onClick={() => navigate('signup')} sx={{ width: isMatchedPhone ? '80%' : null, borderRadius: '60px', fontWeight: 'bolder', mr: isMatchedPhone ? 0 : 3, mb: isMatchedPhone ? 1.5 : 0 }} size="large" startIcon={<MailOutlineOutlinedIcon />}>
                Inscription gratuite
              </Button>
              <Button color='secondary' variant='outlined' sx={{ width: isMatchedPhone ? '80%' : null, borderRadius: '60px', fontWeight: 'bolder' }} size='large' startIcon={<AddToDriveOutlinedIcon sx={{ color: 'primary.main' }} />}>
                Je m'inscris
              </Button>
            </Box>
          </Box>

        </Box>
        {
          isMatchedLaptop ? null : <Box flex={0.8} sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={header} alt='header' width='90%' height='70%' />
          </Box>
        }
      </Box>
      <Box display='flex' p='0 50px' flexDirection={isMatchedPhone ? 'column-reverse' : 'row'} mb={8} mt={3}>
        <Box data-aos="fade-right" flex={1} textAlign='center'>
          <img src={analyse} alt="cv" width='70%' />
        </Box>
        <Box data-aos="fade-left" flex={1} p={isMatchedPhone ? '0 5px' : '0 50px'} display='flex' flexDirection='column' justifyContent='center' >
          <Typography variant={isMatchedPhone ? 'h5' : 'h4'} sx={{ fontWeight: 'bolder', mb: isMatchedPhone ? 2 : 5 }} color='secondary.main' gutterBottom>
            Sur Rendili, vous êtes bien plus que votre CV
          </Typography>
          <Typography variant='body1' color='secondary.main'>
            Whether it's a change of city, lifestyle or just wanting something new – on Rendili it’s all about who you want to be in your working life. Let the real you shine through.
          </Typography>
        </Box>
      </Box>
      <Box display='flex' flexDirection={isMatchedPhone ? 'column' : 'row'} p={isMatchedPhone ? '0 50px 0 50px' : '0 50px 0 100px'} mb={8} >
        <Box data-aos="fade-right" flex={1} display='flex' flexDirection='column' justifyContent='center'  >
          <Typography variant={isMatchedPhone ? 'h5' : 'h4'} sx={{ fontWeight: 'bolder', mb: isMatchedPhone ? 2 : 5 }} color='secondary.main' gutterBottom>
            1,5 millions d'offres d'emploi et autant d'opportunités
          </Typography>
          <Typography variant='body1' color='secondary.main'>
            Imagine a gallery of amazing jobs where you receive suggestions tailored to your preferences. Find out what you really want from your working life: how do you want to develop? Which employers do you like? What company culture do you want to be part of?          </Typography>
        </Box>
        <Box data-aos="fade-left" flex={1} textAlign='center' >
          <img src={work} alt="work" width='70%' />
        </Box>
      </Box>
      <Box display='flex' flexDirection={isMatchedPhone ? 'column-reverse' : 'row'} p='0 50px 0 50px' mb={8} >
        <Box data-aos="fade-right" flex={1} textAlign='center' >
          <img src={check} alt="check" width='70%' />
        </Box>
        <Box data-aos="fade-left" flex={1} display='flex' flexDirection='column' justifyContent='center' >
          <Typography variant={isMatchedPhone ? 'h5' : 'h4'} sx={{ fontWeight: 'bolder', mb: isMatchedPhone ? 2 : 5 }} color='secondary.main' gutterBottom>
            Reach out to the right people
          </Typography>
          <Typography variant='body1' color='secondary.main'>
            Over 23,000 recruiters on Rendili are just a message away. Get in touch with HR, industry and labour market experts, and personally contact recruiters and employees at your dream company. Join us and do your Rendili!
          </Typography>
        </Box>
      </Box>
      <Box minHeight='420px' bgcolor='primary.main' display='flex' flexDirection='column' alignItems='center' justifyContent='center' p={isMatchedPhone ? '0px  8px' : '0 100px'}>
        <Typography variant={isMatchedPhone ? 'h6' : 'h4'} sx={{ mb: 5, color: 'whitesmoke', textAlign: 'center' }}>
          Rendili - le premier réseau de networking professionnel dans l'espace germanophone.
        </Typography>
        <Button variant='contained'  onClick={() =>navigate('/chooseToBe')} color='secondary' size='large' sx={{ borderRadius: '60px', opacity: '0.9' }}>Inscrivez-vous gratuitement</Button>
      </Box>
      <Box minHeight='250px' p={isMatchedPhone ? '80px 20px' : (isMatchedTablette ? '80px 60px' : '150px')} display='flex' flexDirection='column'>
        <Typography variant={isMatchedPhone ? 'h4' : 'h2'} color='secondary.main' mb={7} textAlign='center'>
          Envie de découvrir la nouvelle application Rendili ?
        </Typography>
        <Box textAlign='center'>
          <img src={apple_store} alt="play_store" style={{ width: isMatchedPhone ? '40%' : '30%', height: '80px', marginRight: '20px', cursor: 'pointer' }} />
          <img src={google_play} alt="apple_store" style={{ width: isMatchedPhone ? '40%' : '30%', height: '80px', marginRight: '20px', cursor: 'pointer' }} />
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  )
}

export default Home