import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useState } from 'react'
import couverture from '../../Assets/couverture.png'
import user from '../../Assets/user.jpg'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { InfoGlobal } from '../../../App';
import { useNavigate } from 'react-router-dom';
function You({handleEditProfile}) {
    const Infos = useContext(InfoGlobal)
    const theme = useTheme()
    const navigate = useNavigate()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    return (
        <Box p={isMatchedPhone ? '0' : isMatchedTablette ? '10px 20px' : '20px 50px'} flex={1} position='relative'>
            <Box display='flex' flexDirection='column' >
                <img src={couverture} alt='couverture' width='100%' height='300px' style={{ borderRadius: isMatchedPhone ? '0' : '10px 10px 0 0 ' }} />
                <Box display='flex' justifyContent='space-between' position='relative'>
                    <img src={user} alt='profile_name' style={{ position: 'absolute', width: isMatchedTablette ? '120px' : '150px', borderRadius: '30px', left: isMatchedPhone ? 'calc(50% - 60px)' : '5%', top: isMatchedTablette ? '-70px' : '-100px' }} />
                    <Box pl={isMatchedPhone ? '10px' : isMatchedTablette ? '160px' : '220px'}>
                        <Typography variant={isMatchedTablette ? 'h5' : 'h4'} color='secondary' gutterBottom>{Infos.UserInfos.username}</Typography>
                        <Box display='flex'>
                            <LocationOnOutlinedIcon />
                            <Typography variant='body1' color='secondary' ml={2}>Oran</Typography>
                        </Box>
                    </Box>
                    <Box pt={1} >
                        {isMatchedPhone ? <CreateOutlinedIcon sx={{ cursor: 'pointer' }} color='primary' onClick={() => handleEditProfile(true)} /> : <Button variant='outlined' color='primary' onClick={() => handleEditProfile(true)} startIcon={<CreateOutlinedIcon />} sx={{ mr: 1 }}>
                            Edit
                        </Button>}
                        {isMatchedPhone ? <IosShareOutlinedIcon sx={{ cursor: 'pointer', ml: 2, mr: 1 }} color='primary' /> : <Button variant='outlined' color='primary' startIcon={<IosShareOutlinedIcon />}>
                            Share
                        </Button>}
                    </Box>
                </Box>
            </Box>
             
        </Box>
    )
}

export default You