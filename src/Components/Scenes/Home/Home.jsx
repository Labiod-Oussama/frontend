import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grow, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import header from '../../Assets/header.png'
import analyse from '../../Assets/analyse.png'
import work from '../../Assets/work.png'
import check from '../../Assets/check.png'
import rendili from '../../Assets/rendili.png'
import Header from '../../Global/Header'
import Footer from '../../Global/Footer'
import Offer from '../Offer/Offer'
import { InfoGlobal } from '../../../App'
import MuiAlert from '@mui/material/Alert';

function Home({ handleOffer, updateContext }) {
  const { token, UserInfos } = useContext(InfoGlobal)
  const theme = useTheme()
  const navigate = useNavigate()
  const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
  const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
  const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
  const TimeCheckbox = ['onsite', 'remote', 'hybride']
  const [searchJob, setSearchJob] = useState('')
  const [searchPlace, setSearchPlace] = useState('')
  const [TypeOfJob, setTypeOfJob] = useState('')
  const [searchChoose, setSearchChoose] = useState('')
  const [makeOffer, setMakeOffer] = useState(false)
  const [makeCorrectSubmit, setMakeCorrectSubmit] = useState(false)
  const [makeErrorSubmit, setMakeErrorSubmit] = useState(false)
  const companyCondition = UserInfos?.companyCondition ?? false
  //animation 
  useEffect(() => {
    AOS.init({ duration: 1200 })
  }, [])
  // Search keywords
  const [SearchKeys, setSearchKeys] = useState(() => {
    const words = localStorage.getItem('SearchKeywords');
    return JSON.parse(words) || []
  })


  const offering = (e) => {
    setMakeOffer(e)
    handleOffer(e)
    // setMakeCorrectSubmit(false)
  }
  // const correctSubmit = (e) => {
  //   setMakeCorrectSubmit(e)
  // }
  // const errorSubmit = (e) => {
  //   setMakeErrorSubmit(e)
  // }
  // useEffect(() => {
  //   if (makeCorrectSubmit) {
  //     setTimeout(() => {
  //       setMakeCorrectSubmit(false)
  //     }, 2500);
  //   }
  //   if (makeErrorSubmit) {
  //     setTimeout(() => {
  //       setMakeErrorSubmit(false)
  //     }, 2500);
  //   }
  // }, [makeCorrectSubmit, makeErrorSubmit])

  // submit offer
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openCorrect, setOpenCorrect] = useState(false);
  const [openError, setOpenError] = useState(false);
  const handleClick = (e) => {
    switch (e) {
      case true:
        setOpenCorrect(true)
        break;
      case false:
        setOpenError(true)
        break;
    }

  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenCorrect(false);
    setOpenError(false)
  };
  const [SnackbarShow, setSnackbarShow] = useState({
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal } = SnackbarShow;
  function GrowTransition(props) {
    return <Grow {...props} />;
  }
  return (
    <Box position='relative' overflow='hidden'>
      <Header isloging={false} profile={token ? true : false} UserInfos={UserInfos} updateContext={updateContext} />
      <Box display='flex'>
        <Box flex={1.1} sx={{ m: isMatchedTablette ? '50px 30px' : '40px 50px' }}>
          <img src={rendili} width={isMatchedPhone ? '55%' : '45%'} alt='rendili' style={{ marginBottom: '30px' }} />
          {
            isMatchedLaptop ? <Box flex={0.9} sx={{ display: isMatchedTablette ? 'none' : 'block', textAlign: 'center', mb: 5 }}>
              <img src={header} alt='header' width='35%' height='50%' />
            </Box> : null
          }

          <Box display='flex' flexWrap={'wrap'} mb={2} >
            <TextField
              label="Insert some key words"
              variant='outlined'
              color='secondary'
              onChange={(e) => { setSearchJob(e.target.value) }}
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
              label="Place"
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
            <Button variant='contained' size='medium' onClick={() => { navigate(`/Jobs?${searchJob && `keywords=${searchJob.trim()}&`}${searchPlace && `cityLoc=${searchPlace}&`}${TypeOfJob && `typeOfJob=${TypeOfJob}`}`); searchJob.trim() !== '' && localStorage.setItem('SearchKeywords', JSON.stringify(Array.from(new Set([...SearchKeys, searchJob.trim()])))) }} sx={{ bgcolor: 'primary.A200', '&:hover': { bgcolor: 'primary.A100' }, color: 'primary.main', borderRadius: '60px', letterSpacing: '1.5px', fontWeight: 'bold' }}>
              Search
            </Button>
          </Box>
          <FormGroup sx={{ display: "flex", flexWrap: 'wrap', flexDirection: 'row', mb: 10 }}>
            {
              TimeCheckbox.map((ele, index) => (
                <FormControlLabel key={index} control={<Checkbox />} label={ele} onClick={() => setTypeOfJob(ele)} sx={{ mr: 5 }}></FormControlLabel>
              ))
            }
          </FormGroup>
          {
            companyCondition &&
            <Button variant='contained' size='large' startIcon={<AddCircleOutlinedIcon />} sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.main' }, width: isMatchedPhone ? '170px' : '190px', height: isMatchedPhone ? '40px' : '50px', mb: isMatchedPhone ? 3 : 5, borderRadius: '60px', fontWeight: 'bolder', letterSpacing: isMatchedPhone ? '1px' : '3px' }}
              onClick={() => { setMakeOffer(true); handleOffer(true) }}
            >
              Add offer
            </Button>
          }


          {/* <Box>
                  <FormControl sx={{ minWidth: 200, mr: searchChoose ? 2 : 0 }}>
                    <InputLabel id="demo-simple-select-label">Search About</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Search About"
                      value={searchChoose}
                      onChange={(e) => setSearchChoose(e.target.value)}
                    >
                      <MenuItem value='Companies'>Companies</MenuItem>
                      <MenuItem value='Person'>Person</MenuItem>
                      <MenuItem value='Others'>Others</MenuItem>
                    </Select>
                  </FormControl>
                  {
                    searchChoose && <TextField
                      label='Search'
                      variant='outlined'
                      color='primary'
                      sx={{ width: isMatchedPhone ? '100%' : '45%', mt: isMatchedPhone ? 1.5 : 0 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlinedIcon sx={{ color: 'black', cursor: 'pointer' }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  }
                </Box> */}

          {
            !token && <Box >
              <Typography variant='h5' color='secondary' mb={2}>
                Ready to hop in ? Join us right now :)
              </Typography>
              <Box display='flex' flexDirection={isMatchedPhone ? 'column' : 'row'} alignItems={isMatchedPhone ? 'center' : 'flex-start'}>
                <Button color='secondary' variant='outlined' onClick={() => navigate('signup')} sx={{ width: isMatchedPhone ? '80%' : null, borderRadius: '60px', fontWeight: 'bolder', mr: isMatchedPhone ? 0 : 3, mb: isMatchedPhone ? 1.5 : 0 }} size="large" startIcon={<MailOutlineOutlinedIcon />}>
                  Register for free !

                </Button>
                <Button color='secondary' variant='outlined' sx={{ width: isMatchedPhone ? '80%' : null, borderRadius: '60px', fontWeight: 'bolder' }} size='large' startIcon={<AddToDriveOutlinedIcon sx={{ color: 'primary.main' }} />}>
                  Sign Up
                </Button>
              </Box>
            </Box>
          }


        </Box>
        {
          isMatchedLaptop ? null : <Box flex={0.8} sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={header} alt='header' width='90%' height='80%' />
          </Box>
        }
      </Box>
      <Box display='flex' p='0 50px' flexDirection={isMatchedPhone ? 'column-reverse' : 'row'} mb={8} mt={3}>
        <Box data-aos="fade-right" flex={1} textAlign='center'>
          <img src={analyse} alt="cv" width='70%' />
        </Box>
        <Box data-aos="fade-left" flex={1} p={isMatchedPhone ? '0 5px' : '0 50px'} display='flex' flexDirection='column' justifyContent='center' >
          <Typography variant={isMatchedPhone ? 'h5' : 'h4'} sx={{ fontWeight: 'bolder', mb: isMatchedPhone ? 2 : 5 }} color='secondary.main' gutterBottom>
            More than just a platform
          </Typography>
          <Typography variant='body1' color='secondary.main'>
            Whether you are a graduated looking for a dream carrer, or you still a student looking to be familiarized with the entreprise world, Rendili got your back.
          </Typography>
        </Box>
      </Box>
      <Box display='flex' flexDirection={isMatchedPhone ? 'column' : 'row'} p={isMatchedPhone ? '0 50px 0 50px' : '0 50px 0 100px'} mb={8} >
        <Box data-aos="fade-right" flex={1} display='flex' flexDirection='column' justifyContent='center'  >
          <Typography variant={isMatchedPhone ? 'h5' : 'h4'} sx={{ fontWeight: 'bolder', mb: isMatchedPhone ? 2 : 5 }} color='secondary.main' gutterBottom>
            How about startups ?
          </Typography>
          <Typography variant='body1' color='secondary.main'>
            If you are a startup looking for the missing piece of your team's puzzle, or needing to cooperate with other entreprises to materialize that blueprint, Rendili is here for you !         </Typography>
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
            Professional offers redefined
          </Typography>
          <Typography variant='body1' color='secondary.main'>
            A one-for-all standard canvas that will unite us all under the same business flag !
          </Typography>
        </Box>
      </Box>
      <Box minHeight='350px' bgcolor='primary.main' display='flex' flexDirection='column' alignItems='center' justifyContent='center' p={isMatchedPhone ? '0px  8px' : '0 100px'}>
        <Typography variant={isMatchedPhone ? 'h6' : 'h4'} sx={{ mb: 5, color: 'whitesmoke', textAlign: 'center' }}>
          Rendili - Your Dream Carrer Gateway
        </Typography>
        <Button variant='contained' onClick={() => navigate('/chooseToBe')} size='large' sx={{ bgcolor: 'primary.A100', '&:hover': { bgcolor: 'primary.A100' }, color: 'primary.main', borderRadius: '60px', fontWeight: 'bold', opacity: '0.9' }}>
          Join us for free !
        </Button>
      </Box>
      {
        makeOffer && <Offer offering={offering} handleClick={handleClick} />
      }

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openCorrect || openError}
        transitionDuration={1000}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={GrowTransition}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={openCorrect ? 'success' : 'error'} sx={{ width: '100%' }}>
          {openCorrect && 'OFFER ADDED SUCCESSFULY !'}
          {openError && 'OFFER NOT ADDED !'}
        </Alert>
      </Snackbar>

      {/* <Box sx={{ position: 'absolute', padding: '0 5px', height: '50px', p: 1, bgcolor: 'rgb(244, 244, 244)', border: 'solid 1.7px rgb(5, 182, 32)', borderRadius: '8px', left: '50%', transform: 'translate(-50%)', top: makeCorrectSubmit ? '40px' : '-100px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 1.5s ease' }}>
        <Typography variant='body1' color='rgb(5, 182, 32)' fontWeight='bolder'>OFFER ADDED SUCCESSFULY</Typography>
      </Box>
      <Box sx={{ position: 'absolute', padding: '0 7px', height: '50px', p: 1, bgcolor: 'rgb(244, 244, 244)', border: 'solid 1.7px red', borderRadius: '8px', left: '50%', transform: 'translate(-50%)', top: makeErrorSubmit ? '40px' : '-100px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 1.5s ease' }}>
        <Typography variant='body1' color='red' fontWeight='bolder' letterSpacing='2.5px'>OFFER NOT ADDED</Typography>
      </Box> */}


    </Box >
  )
}

export default Home