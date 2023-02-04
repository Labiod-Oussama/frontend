import { Box, Button, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useSearchParams } from "react-router-dom";
import Header from '../../Global/Header'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import JobsFiltering from './JobsFiltering';
import { useEffect } from 'react';
function Jobs() {
    const [searchParams] = useSearchParams();
     
    const theme = useTheme()
    const navigate = useNavigate()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    const [searchJob, setSearchJob] = useState('')
    const [searchPlace, setSearchPlace] = useState('')
    return (
        <Box>
            <Header />
            <Box p='50px'>
                <Box display='flex' flexWrap='wrap' mb={3} >
                         <TextField
                            label="Enter job title or keyword"
                            variant='outlined'
                            color='primary'
                            onChange={(e) => setSearchJob(e.target.value)}
                            sx={{ mr: 2, mb: 2, width: isMatchedPhone ? '100%' : '50%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon sx={{ color: 'black' }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            label="Lieu"
                            variant='outlined'
                            color='primary'
                            onChange={(e) => setSearchPlace(e.target.value)}
                            sx={{ mr: 2, width: isMatchedPhone ? '65%' : '30%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FmdGoodOutlinedIcon sx={{ color: 'black' }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button variant='contained' size='medium' onClick={() => navigate(`/Jobs?keywords=${searchJob}&cityLoc=${searchPlace}`)} sx={{ height: '55px', fontSize: '1.1em', bgcolor: 'primary.main', borderRadius: isMatchedTablette ? '50%' : '60px', fontWeight: 'bold' }}>
                            {
                                isMatchedTablette ? <ArrowForwardOutlinedIcon sx={{ textAlign: 'center' }} /> : 'Search'
                            }
                        </Button>
                 </Box>
                 {/* {
                    searchParams.get('keywords') && <JobsFiltering keywords={searchParams.get('keywords')} cityLoc={searchParams.get('cityLoc')} />
                 } */}
                 {/* <JobsFiltering /> */}
                 <JobsFiltering keywords='devops' cityLoc='oran'/>
                
            </Box>
        </Box>
    )
}

export default Jobs