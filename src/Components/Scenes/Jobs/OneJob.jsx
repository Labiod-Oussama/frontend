import { Avatar, Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React, { useContext, useEffect, useState } from 'react'
import Login from '../Register/Login';
import { InfoGlobal, tokenContext } from '../../../App';
import { serverAddress } from '../../Global/Config';
function OneJob({ id, image, position, place, name, remote, description, time }) {
  const Infos = useContext(InfoGlobal)
  const theme = useTheme()
  const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
  const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
  const BoxSx = {
    "&:hover": {
      backgroundColor: ' #e5ebee'
    }
  }

  // calcul the time of company
  const dayRightNow = new Date();
  const dayCompanyCreated = new Date(time);
  const diff = dayRightNow.getTime() - dayCompanyCreated.getTime();
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24)) || 40
  
  // handle the save job
  const handleSave = () => {
    const userInfos = JSON.parse(localStorage.getItem('UserInfo'));
    if (userInfos.savedJob.some(e => e == id) == false) {
      userInfos.savedJob.push(id)
      console.log(userInfos.savedJob);
      fetch(`${serverAddress}/saved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Infos.token}` },
        body: JSON.stringify({
          savedJob: userInfos.savedJob
        })
      }).then(localStorage.setItem('UserInfo', JSON.stringify(userInfos)), setSaved(userInfos.savedJob))
    }
    else {
      const index = userInfos.savedJob.indexOf(id);
      userInfos.savedJob.splice(index, 1)
      fetch(`${serverAddress}/saved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Infos.token}` },
        body: JSON.stringify({
          savedJob: userInfos.savedJob
        })
      }).then(localStorage.setItem('UserInfo', JSON.stringify(userInfos)), setSaved(userInfos.savedJob))

    }

  }
  const [saved, setSaved] = useState(JSON.parse(localStorage.getItem('UserInfo'))?.savedJob ?? [])
  return (
    <Box p={isMatchedPhone ? '5px' : '10px 30px 30px 20px'} display='flex' style={{ borderRadius: '15px', cursor: 'pointer' }} sx={BoxSx}>
      {/* <img src={image} alt={name} width={isMatchedPhone ? '90px' : '120px'} height={isMatchedPhone ? '80px' : '100px'} style={{ margin: isMatchedPhone ? '13px 20px 0 0' : '15px 20px 0 0', borderRadius: '10px', border: "solid 2px grey" }} /> */}
      <Avatar src={image} alt='profile_name' variant="rounded" style={{ width:isMatchedPhone?'90px':'120px',height:isMatchedPhone ? '80px' : '100px',margin: isMatchedPhone ? '13px 20px 0 0' : '15px 20px 0 0', borderRadius: '10px', border: "solid 2px grey" }}/>
      <Box flex={1}>
        <Typography variant={isMatchedPhone ? 'body1' : 'h5'} color='secondary' >{position}</Typography>
        <Typography variant={isMatchedPhone ? 'body2' : 'body1'} color='secondary'>{name}</Typography>
        <Typography variant={isMatchedPhone ? 'body2' : 'body1'} color='secondary' gutterBottom>{place}</Typography>
        <Typography variant='body2' color='secondary.grey' gutterBottom>{remote}</Typography>
        {
          !isMatchedTablette && <Typography variant='body2' color='secondary'>{description}</Typography>
        }

      </Box>
      <Box display='flex' flexDirection='column' height={isMatchedPhone ? '110px' : '120px'} justifyContent='space-evenly' alignItems='flex-end'>
        <Typography variant={isMatchedPhone ? 'body2' : 'body1'} color='secondary.grey' >
          {diffInDays == 0 ? 'Today' : diffInDays > 31 ? `${Math.floor(diffInDays / 31)} month` : `${diffInDays} days ago`}
        </Typography>
        {
          isMatchedTablette ? saved.some(e => e == id) ? <BookmarkIcon color='primary' onClick={handleSave} /> : <BookmarkBorderOutlinedIcon onClick={handleSave} color='primary' /> : <Button variant='outlined' color='primary' onClick={handleSave} sx={{ fontWeight: 'bolder' }} startIcon={saved.some(e => e == id) ? <BookmarkIcon color='primary' /> : <BookmarkBorderOutlinedIcon />}>
            {saved.some(e => e == id) ? 'SAVED' : 'SAVE JOB'}
          </Button>
        }

      </Box>
    </Box>
  )
}

export default OneJob