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
import PostComponent from './PostComponent'
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
    const [post,setPost]=useState(false)
    const handleEditProfile=(e)=>{
        setEdit(e)
    }
    const handleItem = (e) => {
        setChosenItem(e)
    }
    const handlePost=(e)=>{
        setPost(e)
    }
    return (
        <Box>
            <TopBar />
            <Box display='flex' position='relative'>
                {!isMatchedPhone && <SideBar handleItem={handleItem} selected={chosenItem}/>}
                {
                    chosenItem == 'You' && <You handleEditProfile={handleEditProfile} handlePost={handlePost}/>
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
                {
                    post && <PostComponent handlePost={handlePost}/>
                }
            </Box>
        </Box>
    )
}

export default Profile