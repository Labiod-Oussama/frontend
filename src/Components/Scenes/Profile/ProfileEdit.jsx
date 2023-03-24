import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { InfoGlobal } from '../../../App'
import EditIcon from '@mui/icons-material/Edit';
import user from '../../Assets/user.jpg'
import CloseIcon from '@mui/icons-material/Close';
function ProfileEdit({ handleEditProfile }) {
    const { token, UserInfos } = useContext(InfoGlobal)
    const [InfosEdit, setInfosEdit] = useState({
        UserName: UserInfos.username,
        City: 'Oran',
        email: UserInfos.email,
        Skills: []
    })
    const [EditUserName, setEditUserName] = useState(false)
    const [EditCity, setEditCity] = useState(false)
    const [EditSkills, setEditSkills] = useState(false)
    const [image,setImage]=useState(null)
    return (
        <Box sx={{ position: 'fixed', width: '100%', height: '100%', bgcolor: 'rgba(0, 0, 0,0.65)', top: '0', overflowY: 'auto' }}>
            <Box sx={{ position: 'absolute', width: '50%', top: '100px', left: '50%', transform: 'translateX(-50%)', bgcolor: 'whitesmoke', borderRadius: '8px', p: '0 10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
                <Typography variant='h4' color='primary' sx={{ height: '60px', lineHeight: '60px', textAlign: 'center', mb: 2, borderBottom: 'solid 1px rgb(212, 209, 209)' }}>
                    Edit Profile
                </Typography>
                <CloseIcon onClick={() => handleEditProfile(false)} sx={{ position: 'absolute', width: '30px', height: '30px', color: 'whitesmoke', bgcolor: 'primary.light', borderRadius: '50%', top: '-10px', right: '-15px', cursor: 'pointer' }} />
                <Box >
                    <Box mb={3}>
                        <Box display='flex' justifyContent='space-between' textAlign='center'>
                            <Typography variant='h6' color='primary' mb={2}>Profile Picture</Typography>
                            <Button variant='text' component='label' color='primary' sx={{ fontWeight: 'bold', letterSpacing: '2px' }} >
                                Edit
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e)=>setImage(e.target.files[0])}
                                />
                            </Button>

                        </Box>
                        <Box textAlign='center'>
                            <img src={image?URL.createObjectURL(image):user} alt='profile_name' style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        </Box>
                    </Box>
                    <Typography variant='h6' color='primary' mb={2}>Customize your infos</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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
                            sx={{ flex: '1', mr: 3 }}
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
                <Button variant='contained' sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.light' }, display: 'block', marginLeft: 'auto', mt: 2, mb: 2, fontWeight: 'bolder', letterSpacing: '2px' }}>
                    SAVE
                </Button>
            </Box>

        </Box>
    )
}

export default ProfileEdit