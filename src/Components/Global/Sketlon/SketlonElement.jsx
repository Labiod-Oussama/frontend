import { Box } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import Shimer from './Shimer'
import Sketlon from './Sketlon'
function SketlonElement() {
  // const BoxSx={
  //   "&:hover":{
  //     backgroundColor:'red'
  //   }
  // }
  return (
    <Box display='flex' flexDirection='column' sx={{position:'relative',overflow:'hidden',mb:5}}>
      <Sketlon type='position' />
      <Box display='flex' justifyContent='space-between' > 
        <Sketlon type='thumbnail' />
        <Box sx={{ width: '100%' }}>
          <Sketlon type='place' />
          <Sketlon type='name' />
          <Sketlon type='remote' />
          <Sketlon type='Description' />
        </Box>
      </Box>
    <Shimer />
    </Box>
  )
}

export default SketlonElement