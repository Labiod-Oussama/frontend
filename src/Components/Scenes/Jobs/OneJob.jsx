import { Box, Typography } from '@mui/material'
import React from 'react'

function OneJob({image,position,place,name,remote,description}) {
    const BoxSx={
        "&:hover":{
          backgroundColor:' #e5ebee'
        }
      }
  return (
    <Box p='10px 30px 30px 20px' display='flex' style={{borderRadius:'15px',cursor:'pointer'}} sx={BoxSx}>
        <img src={image} alt={name} width='100px' height='80px' style={{margin:'10px 20px 0 0',borderRadius:'10px',border:"solid 2px grey"}}/>
        <Box>
            <Typography variant='h5' color='secondary' >{position}</Typography>
            <Typography variant='body1' color='secondary'>{place}</Typography>
            <Typography variant='body1' color='secondary' gutterBottom>{name}</Typography>
            <Typography variant='body2' color='secondary.grey' gutterBottom>{remote}</Typography>
            <Typography variant='body2' color='secondary'>{description}</Typography>
        </Box>
    </Box>
  )
}

export default OneJob