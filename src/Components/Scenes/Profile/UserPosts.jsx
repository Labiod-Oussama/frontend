import { Avatar, Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { InfoGlobal } from '../../../App'
import user from '../../Assets/user.jpg'
function UserPosts({paragraph}) {
    const { token, UserInfos } = useContext(InfoGlobal)
    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{display:'flex',alignItems:'center',mb:2}}>
                <Avatar
                    alt="profile_name"
                    src={user}
                    sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box>
                   <Typography variant='body1' color='primary' sx={{fontWeight:'bold'}}>{UserInfos.username}</Typography>
                   <Typography variant='body2' color='primary' >today</Typography>
                </Box>
            </Box>

            <Box>
                 {
                    paragraph
                 }
            </Box>
        </Box>
    )
}

export default UserPosts