import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Avatar, Badge, Box, Button, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import logo from '../../Assets/rendili_logo.svg'
import user from '../../Assets/user.jpg'
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HelpIcon from '@mui/icons-material/Help';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { InfoGlobal } from '../../../App'
function TopBar() {
    const Infos = useContext(InfoGlobal)
    const navigate = useNavigate()
    const [searchProfile, setSearchProfile] = useState('')
    const [downProfile, setDownProfile] = useState(false)
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setDownProfile(prev => !prev)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //responsive
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    return (
        <AppBar sx={{ bgcolor: "whitesmoke", height: '70px', position: 'relative', mb: isMatchedPhone ? 0 : 2 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }} >
                <img src={logo} alt="logo_rendili" width='40px' onClick={() => navigate('/')} />
                <TextField
                    label='Enter a job title, name or keyword'
                    color='primary'
                    value={searchProfile}
                    onChange={(e) => setSearchProfile(e.target.value)}
                    size='small'
                    sx={{ display: isMatchedTablette ? 'none' : 'flex', width: '35%', m: '0 15%' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon sx={{ color: 'black' }} />
                            </InputAdornment>
                        )
                    }}
                />
                <Box display='flex' alignItems='center' color='primary.main'>
                    <Badge color="primary" badgeContent={0} showZero sx={{ mr: 3, cursor: 'pointer' }}>
                        <NotificationsIcon />
                    </Badge>
                    {/* {
                        isMatchedPhone ? <NotificationsIcon sx={{ color: 'black', mr: 2 }} /> : <Button variant='outlined' color='secondary' sx={{ marginRight: '20px', borderRadius: '20px' }} startIcon={<NotificationsIcon />}>
                            Notifications
                        </Button>
                    } */}

                    {/* <Button variant='text' color='primary' onClick={() => setDownProfile(prev => !prev)} sx={{ position: 'relative', borderRadius: '18px' }} endIcon={!downProfile ? <KeyboardArrowDownIcon sx={{ transform: 'scale(1.3)' }} /> : <KeyboardArrowUpIcon sx={{ transform: 'scale(1.3)' }} />}>
                        <img src={user} alt="profile_name" width='50px' style={{ borderRadius: '18px' }} />
                        <Box sx={{ display: downProfile ? 'block' : 'none', width: '200px', bgcolor: '#f2f3f4', position: 'absolute', top: '66px', right: '0', borderRadius: '8px', p: '15px' }}>
                            <Box display='flex' alignItems='center' mb={2}>
                                <img src={user} alt="profile_name" width='70px' style={{ marginRight: '15px', borderRadius: '18px' }} />
                                <Typography variant='h6' color='secondary' fontWeight='bold'>
                                    {Infos.UserInfos.username}
                                </Typography>
                            </Box>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText style={{ color: 'rgb(29, 33, 36)' }} primary={"Saved"} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText style={{ color: 'rgb(29, 33, 36)' }} primary="Setting" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText style={{ color: 'rgb(29, 33, 36)' }} primary="Help" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary="Log out" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Button> */}
                    <Button
                        variant='text'
                        color='primary'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        endIcon={!downProfile ? <KeyboardArrowDownIcon sx={{ transform: 'scale(1.3)' }} /> : <KeyboardArrowUpIcon sx={{ transform: 'scale(1.3)' }} />}
                    >
                        <Avatar src={user} alt='profile_name' variant="rounded" sx={{ width: '46px', height: '46px',cursor: 'pointer' }} />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" color='primary' />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <HelpIcon fontSize="small" color='primary' />
                            </ListItemIcon>
                            Help
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Logout fontSize="small" color='primary' />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar