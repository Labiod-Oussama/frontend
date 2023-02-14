import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React, { useContext, useEffect, useState } from 'react'
import Login from '../Register/Login';
import { tokenContext } from '../../../App';

function OneJob({ id, image, position, place, name, remote, description, time }) {
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
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  // handle the save job
  const handleSave = () => {
    const userInfos = JSON.parse(localStorage.getItem('UserInfo'));
    if (userInfos[0].companies.some(e => e == id) == false) {
      userInfos[0].companies.push(id)
      setSaved(userInfos[0].companies)
    }
    else{
      const index=userInfos[0].companies.indexOf(id);
      userInfos[0].companies.splice(index,1)
      setSaved(userInfos[0].companies.splice(index,1))
    }
    fetch(`http://192.168.245.79:3000/save/${JSON.parse(localStorage.getItem('UserInfo'))[0]._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companies: id
      })
    }).then(res => res.json())
      .then(data => data.success && localStorage.setItem('UserInfo', JSON.stringify(userInfos)))
  }
  const [saved,setSaved]=useState(JSON.parse(localStorage.getItem('UserInfo'))[0].companies)
  useEffect(()=>{

  },[])
  return (
    <Box p={isMatchedPhone ? '5px' : '10px 30px 30px 20px'} display='flex' style={{ borderRadius: '15px', cursor: 'pointer' }} sx={BoxSx}>
      <img src={image} alt={name} width={isMatchedPhone ? '90px' : '120px'} height={isMatchedPhone ? '80px' : '100px'} style={{ margin: isMatchedPhone ? '13px 20px 0 0' : '15px 20px 0 0', borderRadius: '10px', border: "solid 2px grey" }} />
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
          {diffInDays == 0 ? 'Today' : `${diffInDays} days ago`}
        </Typography>
        {
          isMatchedTablette ? saved.some(e=>e==id)?<BookmarkIcon color='primary'/>:<BookmarkBorderOutlinedIcon onClick={handleSave} color='primary' /> : <Button variant='outlined' color='primary' onClick={handleSave} sx={{ fontWeight: 'bolder' }} startIcon={saved.some(e=>e==id)?<BookmarkIcon color='primary'/> :<BookmarkBorderOutlinedIcon />}>
            {saved.some(e=>e==id)?'SAVED' :'SAVE JOB'}
          </Button>
        }

      </Box>
    </Box>
  )
}

export default OneJob