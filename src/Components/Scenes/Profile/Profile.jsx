import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import TopBar from './TopBar'

import SavedJobs from '../Jobs/SavedJobs'
import You from './You'
import { InfoGlobal } from '../../../App'
import JobsCreated from '../Jobs/JobsCreated'
import ProfileEdit from './ProfileEdit'
function Profile() {
    const Infos=useContext(InfoGlobal)
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/profile/${Infos.UserInfos.username}`)
    }, [navigate])
    const [chosenItem, setChosenItem] = useState('You')
    const [edit,setEdit]=useState(false)
    const handleEditProfile=(e)=>{
        setEdit(e)
    }
    const handleItem = (e) => {
        setChosenItem(e)
    }
    return (
        <Box>
            <TopBar />
            <Box display='flex' position='relative'>
                {!isMatchedPhone && <SideBar handleItem={handleItem} selected={chosenItem}/>}
                {
                    chosenItem == 'You' && <You handleEditProfile={handleEditProfile}/>
                }
                {
                    chosenItem == 'Saved' && <SavedJobs />
                }
                {
                    chosenItem=='JobsCreated' && <JobsCreated/> 
                }
                {
                    edit && <ProfileEdit handleEditProfile={handleEditProfile} />
                }
            </Box>
        </Box>
    )
}

export default Profile