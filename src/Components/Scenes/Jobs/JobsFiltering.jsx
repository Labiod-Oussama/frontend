import { Box, Button, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import axios from 'axios'
import '../../Global/Sketlon/Loader.css';
import { useEffect, useState, useContext } from 'react'
import SketlonElement from '../../Global/Sketlon/SketlonElement'
import { InfoGlobal } from "../../../App";
import { serverAddress } from '../../Global/Config'
import OneJob from './OneJob'
import connection from '../../Assets/connection.png'
function JobsFiltering({ keywords, cityLoc, typeOfJob }) {
  const Infos = useContext(InfoGlobal)
  const [Jobs, setJobs] = useState([])
  const [countJobs, setCountJobs] = useState(0)
  const [sort, setSort] = useState('')
  const [loading, setLoading] = useState(true)
  const OrderBy = ['By Default', 'recent first']
  const [page, setPage] = useState(1);
  const [ErrorNet, setErrorNet] = useState(null)
  const theme = useTheme()
  const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
  const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
  useEffect(() => {
    const sendingData = async () => {
      await axios.post(`${serverAddress}/search`, {
        key: keywords,
        city: cityLoc,
        typeOfJob,
        sort: sort,
        page
      }).then(setJobs([]))
        .then(setLoading(true),setErrorNet(''))
        .then(res => (setJobs(res.data.resp), setCountJobs(res.data.total)))
        .then(setTimeout(() => {
          setLoading(false)
        }, 1000))
        .catch((err) => setErrorNet(err.message))
    }
    sendingData()
  }, [keywords, cityLoc, typeOfJob, sort, page])
  useEffect(()=>{
      if (Jobs.length!=0) {
         setErrorNet('')
      }
  },[Jobs])
  return (
    <Box >
      <Box display='flex' flexDirection='column' mb={3}>
        <Box display='flex' alignItems='center' mb={6}>
          <Typography variant={isMatchedPhone ? 'h5' : isMatchedTablette ? 'h4' : 'h3'} display='flex' alignItems='center' flex={isMatchedTablette && 1} color='primary' mr={2}>
            {
              loading ? <span className='loader'></span> : countJobs
            }
            {' '}job ads found
          </Typography>
          <span style={{ display: isMatchedTablette ? 'none' : 'block', flexGrow: '1', height: '1.5px', marginRight: '15px', backgroundColor: '#144272' }}></span>
          <FormControl size='small' sx={{ minWidth: 140 }}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label='Sort By'
              value={sort}
            >
              {
                OrderBy.map((order, index) => (
                  <MenuItem key={index} value={order} onClick={() => setSort(order)} >{order}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        {
          loading && [1, 2, 3, 4].map(n => (
            <SketlonElement key={n} />
          ))
        }
        {!loading &&
          <>

            <Box>
              {
                Jobs.map((job, index) => (
                  <OneJob key={index} id={job._id} image={job.image} position={job.position} place={job.city} name={job.company.username} remote={job.typeOfJob} description={job.description} time={job.createdAt} />
                ))
              }
            </Box>

          </>
        }
        {
          ErrorNet === 'Network Error' && <Box textAlign='center'>
            <Typography variant='h6' color='primary' gutterBottom>No connection</Typography>
            <img src={connection} alt="nocnx" width={isMatchedPhone ? '70%' : isMatchedTablette ? '60%' : '50%'} />
          </Box>
        }
      </Box>
      {
        (countJobs != 0) && <Box display='flex' justifyContent='center'>
          <Stack>
            {/* <Pagination  count={Math.ceil(countJobs/4)} onClick={(e) => {setPage(Number(e.target.innerText));console.log(e.target.getAttribute('data-page'))}} shape='rounded' variant='text' color='primary'></Pagination> */}
            <Pagination
              count={Math.ceil(countJobs / 4)}
              page={page}
              onChange={(e, page) => setPage(page)}
              color='primary'
              renderItem={(item) => (
                <PaginationItem
                  component="button"
                  data-page={item.page}
                  {...item}
                />
              )}
            />
          </Stack>
        </Box>
      }

    </Box>
  )
}

export default JobsFiltering