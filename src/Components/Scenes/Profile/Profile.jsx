import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import TopBar from './TopBar'
import couverture from '../../Assets/couverture.png'
import user from '../../Assets/user.jpg'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
function Profile() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/profile/${JSON.parse(localStorage.getItem('UserInfo'))[0].username}`)
    }, [navigate])

    return (
        <Box>
            <TopBar />
            <Box display='flex'>
                <SideBar />
                <Box p='20px 50px' flex={1}>
                    <Box display='flex' flexDirection='column' position='relative'>
                        <img src={couverture} alt='couverture' width='100%' height='300px' style={{ borderRadius: '10px 10px 0 0 ' }} />
                        <img src={user} alt='profile_name' style={{ position: 'absolute', width: '150px', borderRadius: '30px', left: '30px', top: '200px' }} />
                        <Box display='flex' >
                            <Box p='60px'>
                                <Typography variant='h4' color='secondary'  >{JSON.parse(localStorage.getItem('UserInfo'))[0].username}</Typography>
                            </Box>
                            <Box display='flex' flex={1} justifyContent='space-between' alignItems='flex-start' mt={2} >
                                <Box display='flex'>
                                    <LocationOnOutlinedIcon />
                                    <Typography variant='body1' color='secondary' ml={2}>Oran</Typography>
                                </Box>
                                <Box>
                                    <Button variant='outlined' color='primary' startIcon={<CreateOutlinedIcon />} sx={{ mr: 2 }}>
                                        Edit
                                    </Button>
                                    <Button variant='outlined' color='primary' startIcon={<IosShareOutlinedIcon />}>
                                        Share
                                    </Button>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                    
                </Box>
            </Box>
        </Box>
    )
}

export default Profile