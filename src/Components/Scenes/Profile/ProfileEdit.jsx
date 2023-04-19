import { Box, Button, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useState } from 'react'
import { InfoGlobal } from '../../../App'
import EditIcon from '@mui/icons-material/Edit';
import user from '../../Assets/user.jpg'
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { serverAddress } from '../../Global/Config';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function ProfileEdit({ handleEditProfile, updateContext, handleLoadingEdit }) {
    const navigate = useNavigate()
    const { token, UserInfos } = useContext(InfoGlobal)
    const [InfosEdit, setInfosEdit] = useState({
        UserName: UserInfos.username,
        City: UserInfos.city,
        email: UserInfos.email,
        Skills: ''
    })
    const [EditUserName, setEditUserName] = useState(false)
    const [EditCity, setEditCity] = useState(false)
    const [EditSkills, setEditSkills] = useState(false)
    const [image, setImage] = useState(null)
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const handleEdit = () => {
        handleLoadingEdit(true)
        fetch(`${serverAddress}/Company`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                username: InfosEdit.UserName,
                city: InfosEdit.City,
                Skills: InfosEdit.Skills
            })
        }).then(res => res.json())
            .then(data => data.success && (handleLoadingEdit(false), localStorage.setItem('UserInfo', JSON.stringify(data.resp)), updateContext({ token, UserInfos: data.resp })))
            .then(handleEditProfile(false))
            .catch(() => handleEditProfile(false))
    }
    return (
        <Box sx={{ position: 'fixed', width: '100%', height: '100%', bgcolor: 'rgba(0, 0, 0,0.65)', top: '0', overflowY: 'auto' }}>


            <Box sx={{ position: 'absolute', width: isMatchedPhone ? '85%' : isMatchedTablette ? '75%' : '50%', top: '100px', left: '50%', transform: 'translateX(-50%)', bgcolor: 'whitesmoke', borderRadius: '8px', p: '0 10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
                <Typography variant={isMatchedTablette ? 'h5' : 'h4'} color='primary' sx={{ height: '60px', lineHeight: '60px', textAlign: 'center', mb: 2, borderBottom: 'solid 1px rgb(212, 209, 209)' }}>
                    Edit Profile
                </Typography>
                <CloseIcon onClick={() => handleEditProfile(false)} sx={{ position: 'absolute', width: '30px', height: '30px', color: 'whitesmoke', bgcolor: 'primary.light', borderRadius: '50%', top: '-10px', right: '-15px', cursor: 'pointer' }} />
                <Box >
                    <Box mb={3}>
                        <Box display='flex' justifyContent='space-between' alignItems='flex-start' >
                            <Typography variant={isMatchedPhone ? 'body1' : 'h6'} color='primary' mb={2} fontWeight={isMatchedPhone && 'bold'}>Profile Picture</Typography>
                            <Button variant='text' component='label' color='primary' sx={{ fontWeight: 'bold', letterSpacing: '2px' }} >
                                Edit
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Button>

                        </Box>
                        <Box>
                            <Stack>
                                <Avatar
                                    alt="profile_name"
                                    src={image ? URL.createObjectURL(image) : user}
                                    sx={{ width: isMatchedPhone ? 100 : 120, height: isMatchedPhone ? 100 : 120, margin: '0 auto' }}
                                />
                            </Stack>
                        </Box>
                    </Box>
                    <Typography variant={isMatchedPhone ? 'body1' : 'h6'} color='primary' mb={2} fontWeight={isMatchedPhone && 'bold'}>Customize your infos</Typography>
                    <Box sx={{ display: 'flex', flexDirection: isMatchedPhone ? 'column' : 'row', justifyContent: 'space-between', mb: 2 }}>
                        <TextField
                            label='UserName'
                            variant='outlined'
                            color='primary'
                            value={InfosEdit.UserName}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <EditIcon sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => setEditUserName(true)} />
                                    </InputAdornment>
                                )
                            }}
                            disabled={!EditUserName}
                            onChange={(e) => setInfosEdit({ ...InfosEdit, UserName: e.target.value })}
                            sx={{ flex: '1', mr: isMatchedPhone ? 0 : 3, mb: isMatchedPhone ? 2 : 0 }}
                        />
                        <TextField
                            label='City'
                            variant='outlined'
                            color='primary'
                            value={InfosEdit.City}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <EditIcon sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => setEditCity(true)} />
                                    </InputAdornment>
                                )
                            }}
                            disabled={!EditCity}
                            onChange={(e) => setInfosEdit({ ...InfosEdit, City: e.target.value })}
                            sx={{ flex: '1' }}
                        />

                    </Box>
                    <Box>
                        <TextField
                            label='Skills'
                            variant='outlined'
                            color='primary'
                            value={InfosEdit.Skills}
                            multiline={true}
                            fullWidth
                            rows={4}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <EditIcon sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => setEditSkills(true)} />
                                    </InputAdornment>
                                )
                            }}
                            disabled={!EditSkills}
                            onChange={(e) => setInfosEdit({ ...InfosEdit, Skills: e.target.value })}

                        />
                    </Box>
                </Box>
                <Button variant='contained' onClick={handleEdit} sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.light' }, display: 'block', marginLeft: 'auto', mt: 2, mb: 2, fontWeight: 'bolder', letterSpacing: '2px' }}>
                    SAVE
                </Button>
            </Box>

        </Box>
    )
}

export default ProfileEdit