import { Box, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
function JobsFiltering({keywords,cityLoc}) {
    const [Jobs,setJobs]=useState(null)
    // const [loading,setLoading]=useState(true)
    // useEffect(()=>{
    //   // const getData=async()=>{
    //   //   const response =await fetch("http://192.168.162.79:3000/company").then(res=>res.json())
    //   //   .then(data=>setJobs(data))
    //   //  .then(setLoading(false))
        
    //   // }
    //   // getData();
       
    //    // axios.get("http://192.168.162.79:3000/company").then
    //   // (res=>setJobs(res.data)).then(console.log(Jobs))
    //     // fetch("http://192.168.162.79:3000/company",{
    //     //     method:'post',
    //     //     // headers: {'Content-Type':'application/json'},
    //     //     body:JSON.stringify({
    //     //         keywords:'devops',
    //     //         cityLoc:'oran'
    //     //     })
    //     // }).then(res=>res.json()).then(dat=>setJobs(dat)).then(setLoading(false))
    // },[])
    useEffect(() => {
         axios.post('http://192.168.162.79:3000/company',{
           position:'devops',
           city:'oran'
         }).then(res=>setJobs(res))
    }, []);
  return (

    <Box>
        <Box display='flex' >
            <Typography variant='h3' color='primary'>
            {Jobs === null ? 'Loading...' : console.log(Jobs)}
                 job ads found
                
            </Typography>
        </Box>
    </Box>
  )
}

export default JobsFiltering