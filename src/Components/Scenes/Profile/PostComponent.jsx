import { Avatar, Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import user from '../../Assets/user.jpg'
import React, { useContext, useEffect, useState } from 'react'
import { InfoGlobal } from '../../../App'
import { grey } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close';
function PostComponent({ handlePost }) {
    const { token, UserInfos } = useContext(InfoGlobal)
    const [ThePost,setThePost]=useState('')
    const [doPosting,setDoPosting]=useState(false)
    useEffect(()=>{
       if (ThePost) {
          setDoPosting(true)
       }
       else{
        setDoPosting(false)
       }
    },[ThePost])
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box sx={{ position: 'fixed', width: '100%', height: '100%', bgcolor: 'rgba(0, 0, 0,0.65)', top: '0', overflowY: 'auto' }}>
            <Box sx={{ position: 'absolute', width:isMatchedPhone?'85%':isMatchedTablette?'70%':'50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', bgcolor: 'whitesmoke', borderRadius: '8px', p: '0 10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
                <Typography variant={isMatchedTablette?'h5':'h4'} color='primary' sx={{ height: '60px', lineHeight: '60px', textAlign: 'center', mb: 2 }}>
                    Create Post
                </Typography>
                <CloseIcon onClick={() => handlePost(false)} sx={{ position: 'absolute', width: '30px', height: '30px', color: 'whitesmoke', bgcolor: 'primary.light', borderRadius: '50%', top: '-10px', right: '-15px', cursor: 'pointer' }} />
               <Box>
                <TextField 
                  placeholder={`What's on your mind ${UserInfos.username}`}
                  variant='outlined'
                  color='primary'
                  fullWidth
                  multiline={true}
                  rows={7}
                  value={ThePost}
                  onChange={(e)=>setThePost(e.target.value)}
                />

               </Box>
                <Button variant='contained' disabled={!doPosting} sx={{width:'100%', bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.light' } , mt: 2, mb: 2, fontWeight: 'bolder', letterSpacing: '2px'}}>
                    POST
                </Button>
            </Box>

        </Box>
    )
}

export default PostComponent