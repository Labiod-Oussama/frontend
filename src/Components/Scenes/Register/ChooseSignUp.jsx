import { AppBar, Box, Button, Checkbox, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { border, boxSizing } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import logo from '../../Assets/rendili_logo.jpg'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
function ChooseSignUp() {
    const [chooseCompany, setChooseCompany] = useState(false)
    const [chooseEmployer, setChooseEmployer] = useState(false)
    const navigate = useNavigate()
    const boxSX = {
        "&:hover": {
            backgroundColor: '#1441727d',
            transition: 'all .3s ease'
        },
    };
    useEffect(() => {
        if (chooseCompany) {
            localStorage.setItem('choose', JSON.stringify('chosenCompany'))
        }
        else {
            localStorage.setItem('choose', JSON.stringify('chosenEmployer'))
        }

    }, [chooseCompany, chooseEmployer])
    return (
        <Box>
            <AppBar position='static'>
                <Toolbar sx={{ bgcolor: 'white' }} >
                    <img src={logo} alt="logo_rendili" width='60px' onClick={() => navigate('/')} />
                </Toolbar>
            </AppBar>
            <Box p='70px  100px 0 100px'>
                <Box sx={{ width: '55%', margin: '0 auto', borderRadius: '10px', border: '2px solid #144272', display: 'flex', flexDirection: 'column', textAlign: 'center', p: '30px 50px' }}>
                    <Typography variant='h4' color='secondary' mb={5}>
                        Join as a company or an emplyoer
                    </Typography>
                    <Box display='flex' justifyContent='space-evenly' mb={5}>
                        <Box sx={boxSX} onClick={() => { setChooseCompany(true); setChooseEmployer(false) }} style={{ backgroundColor: chooseCompany ? '#144272' : null, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 5px', border: '1px solid grey', justifyContent: 'space-evenly', width: '35%', height: '170px', borderRadius: '8px', cursor: 'pointer' }} >
                            <BusinessOutlinedIcon sx={{ fontSize: '2em', color: chooseCompany ? 'white' : 'primary.main' }} />
                            <Typography variant='h6' color={chooseCompany ? 'whitesmoke' : 'secondary'} >
                                I'm a company looking for a peaple
                            </Typography>

                        </Box>
                        <Box sx={boxSX} onClick={() => { setChooseEmployer(true); setChooseCompany(false) }} style={{ backgroundColor: chooseEmployer ? '#144272' : null, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', width: '35%', border: '1px solid grey', height: '170px', borderRadius: '8px', padding: '0 5px', cursor: 'pointer' }} >
                            <EngineeringOutlinedIcon sx={{ fontSize: '2em', color: chooseEmployer ? 'white' : 'primary.main' }} />
                            <Typography variant='h6' color={chooseEmployer ? 'whitesmoke' : 'secondary'}>
                                I'm an employer looking for a job
                            </Typography>
                        </Box>
                    </Box>
                    <Button variant='contained' color='primary' onClick={() => { navigate('/signup') }} disabled={!chooseCompany && !chooseEmployer} sx={{ width: '200px', margin: 'auto', p: '8px 10px', mb: 3 }}>
                        join as {chooseCompany ? 'a company' : (chooseEmployer ? 'an employer' : 'create Acounnt')}
                    </Button>
                    <Typography variant='body1' color='secondary' >
                        Already have an account?{' '}
                        <Link underline='hover' onClick={() => navigate('/login')} color='primary' sx={{ cursor: 'pointer' }}>
                            Log In
                        </Link>
                    </Typography>
                </Box>
            </Box>

        </Box>
    )
}

export default ChooseSignUp