import React from 'react'
import Sketlon from '../../Global/Sketlon/Sketlon'
import Shimer from '../../Global/Sketlon/Shimer'
import { Box, useMediaQuery, useTheme } from '@mui/material'

function SkeltonPosts() {
    const theme = useTheme()
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <Box display='flex' sx={{ flexDirection: 'column', position: 'relative', p: 1, border: 'solid 1.5px #e5ebee', borderRadius: '10px', overflow: 'hidden', mb: 3, mr: isMatchedTablette?0: 2 }}>
            <Box display='flex' alignItems='center' mb={2}>
                <Sketlon type='circle' />
                <Box sx={{ width: '100%' }}>
                    <Sketlon type='username' />
                    <Sketlon type='timed' />
                </Box>

            </Box>
            <Sketlon type='paragraph' />

            <Shimer />
        </Box>
    )
}

export default SkeltonPosts