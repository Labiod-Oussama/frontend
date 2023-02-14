import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, InputAdornment, List, ListItem, ListItemButton, ListItemText, TextField, Toolbar, Typography } from '@mui/material'
import logo from '../../Assets/rendili_logo.jpg'
import user from '../../Assets/user.jpg'
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function TopBar() {
    const navigate = useNavigate()
    const [searchProfile, setSearchProfile] = useState('')
    const [downProfile, setDownProfile] = useState(false)
  return (
    
    <AppBar sx={{ bgcolor: "whitesmoke", height: '70px', position: 'relative', mb: 2 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }} >
        <img src={logo} alt="logo_rendili" width='60px' onClick={() => navigate('/')} />
        <TextField
            label='Enter a job title, name or keyword'
            color='primary'
            value={searchProfile}
            onChange={(e) => setSearchProfile(e.target.value)}
            size='small'
            sx={{ width: '35%', m: '0 15%' }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchOutlinedIcon sx={{ color: 'black' }} />
                    </InputAdornment>
                )
            }}
        />
        <Box display='flex' alignItems='center'>
            <Button variant='outlined' color='secondary' sx={{ marginRight: '20px', borderRadius: '20px' }} startIcon={<NotificationsIcon />}>
                Notifications
            </Button>
            <Button variant='text' color='primary' onClick={() => setDownProfile(prev => !prev)} sx={{ position: 'relative', borderRadius: '18px' }} endIcon={!downProfile ? <KeyboardArrowDownIcon sx={{ transform: 'scale(1.3)' }} /> : <KeyboardArrowUpIcon sx={{ transform: 'scale(1.3)' }} />}>
                <img src={user} alt="profile_name" width='50px' style={{ borderRadius: '18px' }} />
                <Box sx={{ display: downProfile ? 'block' : 'none', width: '200px', bgcolor: '#f2f3f4', position: 'absolute', top: '66px', right: '0', borderRadius: '8px', p: '15px' }}>
                    <Box display='flex' alignItems='center' mb={2}>
                        <img src={user} alt="profile_name" width='70px' style={{ marginRight: '15px', borderRadius: '18px' }} />
                        <Typography variant='h6' color='secondary' fontWeight='bold'>
                            {JSON.parse(localStorage.getItem('UserInfo')).username}
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
            </Button>
        </Box>
    </Toolbar>
</AppBar>
  )
}

export default TopBar