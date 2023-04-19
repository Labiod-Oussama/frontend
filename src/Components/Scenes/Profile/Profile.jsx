import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import TopBar from './TopBar'

import SavedJobs from '../Jobs/SavedJobs'
import You from './You'
import { InfoGlobal } from '../../../App'
import JobsCreated from '../Jobs/JobsCreated'
import ProfileEdit from './ProfileEdit'
import PostComponent from './PostComponent'
function Profile({ updateContext }) {
    const Infos = useContext(InfoGlobal)
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/profile/${Infos.UserInfos.username}`)
    }, [navigate])
    const [chosenItem, setChosenItem] = useState('You')
    const [edit, setEdit] = useState(false)
    const [post, setPost] = useState(false)
    const [LoadingEdit, setLoadingEdit] = useState(false)
    const handleEditProfile = (e) => {
        setEdit(e)
    }
    const handleItem = (e) => {
        setChosenItem(e)
    }
    const handlePost = (e) => {
        setPost(e)
    }
    const handleLoadingEdit = (e) => {
        setLoadingEdit(e)
    }
    useEffect(() => {
        if (edit || post) {
            document.body.style.overflow = 'hidden';
            document.body.scrollIntoView({ behavior: 'smooth' })
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }, [edit,post])
    return (
        <Box >
            <TopBar />
            <Box display='flex' position='relative'  >
                {!isMatchedPhone && <SideBar handleItem={handleItem} selected={chosenItem} />}
                {
                    chosenItem == 'You' && <You handleEditProfile={handleEditProfile} handlePost={handlePost} />
                }
                {
                    chosenItem == 'Saved' && <SavedJobs />
                }
                {
                    chosenItem == 'JobsCreated' && <JobsCreated />
                }
                {
                    edit && <ProfileEdit handleEditProfile={handleEditProfile} updateContext={updateContext} handleLoadingEdit={handleLoadingEdit} />
                }
                {
                    post && <PostComponent handlePost={handlePost} />
                }
                {
                    LoadingEdit && <Box sx={{ position: 'fixed', width: '100%', height: '100%', bgcolor: 'rgba(0, 0, 0,0.65)', top: '0', overflowY: 'auto' }}>
                        <CircularProgress variant="indeterminate" sx={{ color: 'primary.A100', position: 'fixed', top: '50%', left: '50%' }} />
                    </Box>
                }


            </Box>
        </Box>
    )
}

export default Profile