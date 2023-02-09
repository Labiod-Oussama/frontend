import { Box, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SketlonElement from '../../Global/Sketlon/SketlonElement'
import OneJob from './OneJob'
function JobsFiltering({ keywords, cityLoc, typeOfJob }) {
  const [Jobs, setJobs] = useState(null)
  // useEffect(()=>{
  //    async function postData(url = '', data = {}) {
  //     const response = await fetch(url, {
  //       method: 'POST', 
  //       mode: 'cors', 
  //       cache: 'no-cache',
  //       credentials: 'same-origin', 
  //       headers: {
  //         'Content-Type': 'application/json'
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       redirect: 'follow', // manual, *follow, error
  //       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //       body: JSON.stringify(data) // body data type must match "Content-Type" header
  //     });
  //     return response.json(); // parses JSON response into native JavaScript objects
  //   }

  //   postData('http://192.168.129.79:3000/company', {city:cityLoc,position:keywords })
  //     .then((data) => {
  //       console.log(data); // JSON data parsed by data.json() call
  //     });
  // },[keywords,cityLoc])


  const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   const sendingData = async () => {
  //     await axios.post('http://192.168.43.134:3000/search', {
  //       key: keywords,
  //        city: cityLoc,
  //        typeOfJob
  //     })
  //     .then(setLoading(true))
  //     .then(res => setJobs(res.data))
  //     .then(setTimeout(()=>{
  //       setLoading(false)
  //     },1500))

  //   }
  //   sendingData()
  // }, [keywords, cityLoc])
  useEffect(() => {
    const getData = async () => {

      const response = await fetch("http://localhost:8000/Companies").then(res => res.json())
        .then(setLoading(true))
        .then(data => setJobs(data))
        .then(setTimeout(() => {
          setLoading(false)
        }, 2000))

    }
    getData();
  }, [])

  return (
    <Box>
      <Box display='flex' flexDirection='column' >
        {
          loading && [1, 2, 3, 4, 5].map(n => (
            <SketlonElement key={n} />
          ))
        }
        {!loading &&
          <>
            <Typography variant='h3' color='primary' mb={8} ml={2}>
              job ads found
            </Typography>
            <Box>
              {
                Jobs.map((job, index) => (
                  <OneJob key={index} image={job.image} position={job.postion} place={job.city} name={job.name} remote={job.typeOfJob} description={job.description} />
                ))
              }
            </Box>
          </>
        }



      </Box>
    </Box>
  )
}

export default JobsFiltering