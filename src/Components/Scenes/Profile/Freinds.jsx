import { Box, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
function Freinds() {
  const [freinds,setFriends]=useState([]);
  return (
    <Box flex={0.8} sx={{height:100,p:'5px 20px',borderRadius:'10px',border:'solid 1.5px grey'}}>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant='h5' color='primary'>
          Friends
        </Typography>
        <Link underline='hover' color='primary' sx={{cursor:'pointer'}}>
          See all freinds
        </Link>
      </Box>
      <Box>
        {
          freinds.length==0 && <Typography variant='h6' color='secondary.grey' textAlign='center'>No freinds</Typography>
        }
      </Box>

    </Box>
  )
}

export default Freinds