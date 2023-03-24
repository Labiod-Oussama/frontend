import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { serverAddress } from '../../Global/Config'
import SketlonElement from '../../Global/Sketlon/SketlonElement'
import OneJob from './OneJob'
function JobsCreated() {
    const [jobCreated,setJobCreated]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        setLoading(true)
         const gettingJobCreated=async()=>{
            const response=await fetch(`${serverAddress}`,{
                method:'GET'
            })
            const json =await response.json()
            setJobCreated(json)
            setLoading(false)
         }
         gettingJobCreated()
    },[])
    return (
        <Box p='10px 20px' width='100%'>
            <Typography variant='h4' color='primary.light' sx={{ textAlign: 'center', fontWeight: 'bold', letterSpacing: '3px',mb:6 }}>
                JOBS CREATED
            </Typography>
            {
                loading && [1,2,3].map(n=>(
                    <SketlonElement key={n}/>
                ))
            }
            {
                !loading && jobCreated.map(job=>(
                    <OneJob key={job._id} id={job._id} image={job.image} position={job.position} place={job.city} name='algerie telecom' remote={job.typeOfJob} description={job.description} time={job.createdAt} />
                ))
            }

        </Box>
    )
}

export default JobsCreated