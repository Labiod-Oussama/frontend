import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { InfoGlobal } from '../../../App';
import { serverAddress } from '../../Global/Config';
// import { serverAddress } from '../../Global/Config';
import Header from '../../Global/Header';
import SketlonElement from '../../Global/Sketlon/SketlonElement';
import OneJob from './OneJob';

function SavedJobs() {
    const Infos = useContext(InfoGlobal)
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    const [saved, setSaved] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const gettingSaved = async () => {
            setLoading(true)
            const response = await fetch(`${serverAddress}/saved`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Infos.token}` },
            });
            const json = await response.json();
            setSaved(json)
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        }
        gettingSaved()
    }, [])
    return (
        <Box p={isMatchedPhone ? '0' : isMatchedTablette ? '10px 20px' : '20px 40px'} flex={1}>
            <Typography variant='h4' color='primary.light' sx={{mb:6,textAlign:'center',fontWeight:'bold',letterSpacing:'3px'}}>
                SAVED JOB
            </Typography>
             {
                loading && [1,2,3,4,5].map(n=>(
                    <SketlonElement key={n}/>
                ))
             }
             {
                !loading && saved.savedJob.map(job=>(
                    <OneJob key={job._id} id={job._id} image={job.image} position={job.position} place={job.city} name='algerie telecom' remote={job.typeOfJob} description={job.description} time={job.createdAt} />
                ))
             }
        </Box>
    )
}

export default SavedJobs