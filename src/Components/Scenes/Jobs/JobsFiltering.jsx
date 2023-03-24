import { Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useEffect, useState,useContext } from 'react'
import SketlonElement from '../../Global/Sketlon/SketlonElement'
import {InfoGlobal} from "../../../App";
import { serverAddress } from '../../Global/Config'
import OneJob from './OneJob'
function JobsFiltering({ keywords, cityLoc, typeOfJob }) {
  const Infos=useContext(InfoGlobal)
  const [Jobs, setJobs] = useState([])
  const [sort, setSort] = useState('')
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
  const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
  // useEffect(()=>{
  //   if (sort) {
  //     fetch('http://192.168.208.79:3000/search',{
  //       method:'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body:JSON.stringify({
  //         sort:sort
  //       })
  //     }).then(res=>res.json()).
  //     then(setJobs([])).
  //     then(setLoading(true))
  //     .then(data => setJobs(data))
  //       .then(setTimeout(() => {
  //         setLoading(false)
  //       }, 1500))
  //   }

  // },[sort])
  // const handleSort=()=>{

  // }
  // const config={
  //   headers:{
  //     'Authentication':'Bearer eyJhbGiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U3ZmNmMDZmODRjMGVmODM4MmVlNDciLCJpYXQiOjE2NzYxNDgzMDMsImV4cCI6MTY3NjE1MTkwM30.j1F3DyayvwZVpHVRubqNRNdVRntgOVt24XdSdfpCzTo'
  //   }
  // }
  // const same=keywords
  useEffect(() => {
    const sendingData = async () => {
      await axios.post(`${serverAddress}/search`, {
        key: keywords,
        city: cityLoc,
        typeOfJob,
        sort: sort
      }).then(setJobs([]))
        .then(setLoading(true))
        .then(res => setJobs(res.data))
        .then(setTimeout(() => {
          setLoading(false)
        }, 1500))

    }
    sendingData()
  }, [keywords, cityLoc, typeOfJob, sort])
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch("http://localhost:8000/Companies").then(res => res.json())
  //       .then(setLoading(true))
  //       .then(data => setJobs(data))
  //       .then(setTimeout(() => {
  //         setLoading(false)
  //       }, 2000))

  //   }
  //   getData();
  // }, [])
  const OrderBy = ['By Default', 'recent first']

  return (
    <Box >
      <Box display='flex' flexDirection='column' mb={3}>
        {
          loading && [1, 2, 3, 4, 5].map(n => (
            <SketlonElement key={n} />
          ))
        }
        {!loading &&
          <>
            <Box display='flex' alignItems='center' mb={5}>
              <Typography variant={isMatchedPhone ? 'h5' : isMatchedTablette ? 'h4' : 'h3'} flex={isMatchedTablette && 1} color='primary' mr={2}>
                {Jobs.length} job ads found
              </Typography>
              <span style={{ display: isMatchedTablette ? 'none' : 'block', flexGrow: '1', height: '1.5px', marginRight: '15px', backgroundColor: '#144272' }}></span>
              <FormControl size='small' sx={{ minWidth: 140 }}>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label='Sort By'>
                  {
                    OrderBy.map(order => (
                      <MenuItem value={order} onClick={() => setSort(order)} >{order}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Box>
            <Box>
              {
                Jobs.map(job => (
                  <OneJob id={job._id} image={job.image} position={job.position} place={job.city} name={job.name} remote={job.typeOfJob} description={job.description} time={job.createdAt} />
                ))
              }
            </Box>

          </>
        }
      </Box>
      {
        Jobs.length != 0 && <Box display='flex' justifyContent='center'>
          <Stack>
            <Pagination count={10} shape='rounded' variant='text' color='primary'></Pagination>
          </Stack>
        </Box>
      }

    </Box>
  )
}

export default JobsFiltering