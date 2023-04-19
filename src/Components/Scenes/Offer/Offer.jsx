import { Box, Button, Dialog, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { serverAddress } from '../../Global/Config';
import './style.css'
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// function Offer({ offering, handleClick }) {
function Offer({ handleClick }) {
  const [offer, setOffer] = useState({})
  const [next, setNext] = useState(1)
  const [nextCorrect, setNextCorrect] = useState(true)
  const theme = useTheme()
  const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
  const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const token = getCookie("token");
  useEffect(() => {
    if (Object.keys(offer).length == 5) {
      if (offer.position.trim() != '' && offer.city.trim() && offer.typeOfJob.trim() && offer.salaryMin.trim() && offer.salaryMax.trim()) {
        setNextCorrect(false)
      }
      else {
        setNextCorrect(true)
      }
    }
  }, [offer])
  const handleSubmit = () => {
    fetch(`${serverAddress}/Jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(offer)
    }).then((res) => res.json())
      .then((data) => data.success && (setTimeout(() => {
        handleClick(true)
      }, 600)))
      .catch((err) => setTimeout(() => {
        handleClick(false)
      }, 600)) // ngrok cors
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button variant='contained' size='large' onClick={handleClickOpen} startIcon={<AddCircleOutlinedIcon />} sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.main' }, width: isMatchedPhone ? '170px' : '190px', height: isMatchedPhone ? '40px' : '50px', mb: isMatchedPhone ? 2 : 5, borderRadius: '60px', fontWeight: 'bolder', letterSpacing: isMatchedPhone ? '1px' : '3px' }}
      >
        Add offer
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
         
      </Dialog>
    </Box>
    // <Box sx={{ position: 'fixed', width: '100%', height: '100vh', bgcolor: 'rgba(0, 0, 0,0.65)', top: 0 }}>
    // <Box sx={{ position: 'absolute', width: isMatchedPhone ? '80%' : isMatchedTablette ? '70%' : '50%', p: '10px 20px 20px', bgcolor: 'whitesmoke', top: '55%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '10px' }}>
    // <Dialog>
    //   <CloseIcon onClick={() => offering(false)} sx={{ display: 'block', marginLeft: 'auto', cursor: 'pointer' }} />
    //   <Typography variant={isMatchedPhone ? 'h6' : isMatchedTablette ? 'h5' : 'h4'} color='primary' sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, letterSpacing: '3px' }}>FILL YOUR OFFER</Typography>
    //   <form style={{ display: 'flex', flexDirection: isMatchedPhone ? 'column' : 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
    //     {
    //       next == 1 && <>
    //         <TextField
    //           label='position'
    //           variant='filled'
    //           color='primary'
    //           value={offer.position}
    //           sx={{ width: isMatchedPhone ? '100%' : '45%', mb: isMatchedPhone ? 2 : 4 }}
    //           onChange={(e) => setOffer({ ...offer, position: e.target.value })}
    //         />
    //         <TextField
    //           label='city'
    //           variant='filled'
    //           color='primary'
    //           value={offer.city}
    //           sx={{ width: isMatchedPhone ? '100%' : '45%', mb: isMatchedPhone ? 2 : 4 }}
    //           onChange={(e) => setOffer({ ...offer, city: e.target.value })}
    //         />
    //         <TextField
    //           label='type of job'
    //           variant='filled'
    //           color='primary'
    //           value={offer.typeOfJob}
    //           sx={{ width: isMatchedPhone ? '100%' : '45%', mb: isMatchedPhone ? 2 : 0 }}
    //           onChange={(e) => setOffer({ ...offer, typeOfJob: e.target.value })}
    //         />
    //         <Box display='flex' alignItems='center' width={isMatchedPhone ? '100%' : '45%'}>
    //           <TextField
    //             label='min-salay'
    //             type='number'
    //             variant='outlined'
    //             color='primary'
    //             value={offer.min < 0 ? 0 : offer.min}
    //             sx={{ mr: 1 }}
    //             onChange={(e) => setOffer({ ...offer, salaryMin: `${e.target.value}` })}
    //           />
    //           to
    //           <TextField
    //             label='max-salay'
    //             type='number'
    //             variant='outlined'
    //             color='primary'
    //             value={offer.max < 0 ? 0 : offer.max}
    //             sx={{ ml: 1 }}
    //             onChange={(e) => setOffer({ ...offer, salaryMax: `${e.target.value}` })}
    //           />
    //         </Box>
    //       </>
    //     }
    //     {
    //       next == 2 &&
    //       <>
    //         <TextField
    //           label='Description'
    //           variant='filled'
    //           color='primary'
    //           multiline={true}
    //           rows={4}
    //           value={offer.description}
    //           sx={{ width: isMatchedPhone ? '100%' : '45%', mb: isMatchedPhone ? 2 : 0 }}
    //           onChange={(e) => setOffer({ ...offer, description: e.target.value })}
    //         />
    //         <TextField
    //           label='skills'
    //           variant='filled'
    //           color='primary'
    //           multiline={true}
    //           rows={4}
    //           value={offer.skills}
    //           sx={{ width: isMatchedPhone ? '100%' : '45%' }}
    //           onChange={(e) => setOffer({ ...offer, skills: e.target.value })}
    //         />

    //       </>
    //     }
    //   </form>
    //   {
    //     next == 1 &&
    //     <Button variant='contained' color='primary' disabled={nextCorrect} sx={{ display: 'block', marginLeft: 'auto', fontWeight: 'bold', letterSpacing: '3px' }}
    //       onClick={() => setNext(prev => prev + 1)}
    //     >
    //       Next
    //     </Button>
    //   }
    //   {
    //     next == 2 && <Box display='flex' justifyContent='space-between'>
    //       <Button variant='contained' color='primary' sx={{ fontWeight: 'bold', letterSpacing: '3px' }}
    //         onClick={() => setNext(prev => prev - 1)}
    //       >

    //         back
    //       </Button>
    //       <Button variant='contained' color='primary' sx={{ fontWeight: 'bold', letterSpacing: '3px' }}
    //         onClick={handleSubmit}
    //       >
    //         Submit
    //       </Button>
    //     </Box>
    //   }
    // </Dialog>
    // </Box>
    // </Box>
  )
  //  position skills tasks  sallary remote  city  site desc
}

export default Offer