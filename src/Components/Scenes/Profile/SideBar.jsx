import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import user from '../../Assets/user.jpg'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import { useNavigate } from 'react-router-dom';
import { InfoGlobal } from '../../../App';
function SideBar({handleItem,selected}) {
    const Infos=useContext(InfoGlobal)
    const navigate=useNavigate()
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    return (
        <Box p={isMatchedTablette?'4px 10px':'10px 30px'} borderRight='solid 1.5px grey'>  
            <Box display='flex' flexDirection={isMatchedTablette?'column':'row'} alignItems='center' mb={5} >
                <img src={user} alt="profile_name" width={isMatchedTablette?'55px':'70px'} style={{ marginRight:isMatchedTablette?'0px':'15px',marginBottom:isMatchedTablette?'10px':'0px', borderRadius: '18px' }} />
                <Typography variant='h6' color='primary' fontWeight='bold'>
                    {Infos.UserInfos.username}
                </Typography>
            </Box>
            <List>
                <ListItem disablePadding sx={{marginBottom:'20px'}} onClick={()=>navigate('/')} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon>
                            <HomeOutlinedIcon sx={{color:'secondary.main',margin:isMatchedTablette?'auto':'0'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Home" sx={{display:isMatchedTablette?'none':'block'}} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <ChatBubbleOutlineOutlinedIcon sx={{color:'#1D2124',margin:isMatchedTablette?'auto':'0'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Messages" sx={{display:isMatchedTablette?'none':'block'}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} onClick={()=>handleItem('You')}>
                    <ListItemButton sx={{borderRadius:'60px',color:selected=='You'&& 'primary.light'}}>
                        <ListItemIcon >
                            <PersonOutlineOutlinedIcon sx={{color:selected=='You'?'primary.light':'secondary.main',margin:isMatchedTablette?'auto':'0'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="You" sx={{display:isMatchedTablette?'none':'block'}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} onClick={()=>handleItem('JobsCreated')} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <WorkOutlineOutlinedIcon sx={{color:'#1D2124',margin:isMatchedTablette?'auto':'0'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Jobs" sx={{display:isMatchedTablette?'none':'block'}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} onClick={()=>handleItem('Saved')}>
                    <ListItemButton sx={{borderRadius:'60px',color:selected=='Saved'&& 'primary.light'}}>
                        <ListItemIcon >
                            <BookmarkBorderOutlinedIcon sx={{color:selected=='Saved'?'primary.light':'secondary.main',margin:isMatchedTablette?'auto':'0'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Saved" sx={{display:isMatchedTablette?'none':'block'}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <HelpCenterOutlinedIcon sx={{color:'#1D2124',margin:isMatchedTablette?'auto':'0'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Help" sx={{display:isMatchedTablette?'none':'block'}} />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    )
}

export default SideBar