import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import user from '../../Assets/user.jpg'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
function SideBar() {
    return (
        <Box width='15%' p='10px 20px 10px 30px' borderRight='solid 1.5px grey'>
            <Box display='flex' alignItems='center' mb={5}>
                <img src={user} alt="profile_name" width='70px' style={{ marginRight: '15px', borderRadius: '18px' }} />
                <Typography variant='h6' color='secondary' fontWeight='bold'>
                    {JSON.parse(localStorage.getItem('UserInfo'))[0].username}
                </Typography>
            </Box>
            <List>
                <ListItem disablePadding sx={{marginBottom:'20px'}} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <HomeOutlinedIcon sx={{color:'#1D2124'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <ChatBubbleOutlineOutlinedIcon sx={{color:'#1D2124'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Messages" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <PersonOutlineOutlinedIcon sx={{color:'#1D2124'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="You" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <WorkOutlineOutlinedIcon sx={{color:'#1D2124'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Jobs" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <BookmarkBorderOutlinedIcon sx={{color:'#1D2124'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Saved" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom:'20px'}} >
                    <ListItemButton sx={{borderRadius:'60px'}}>
                        <ListItemIcon >
                            <HelpCenterOutlinedIcon sx={{color:'#1D2124'}}/>
                        </ListItemIcon>
                        <ListItemText  primary="Help" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    )
}

export default SideBar