import { Box, Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { useSearchParams } from "react-router-dom";
import Header from '../../Global/Header'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import JobsFiltering from './JobsFiltering';
import { useEffect } from 'react';
import { InfoGlobal } from '../../../App';
import SearchKeywords from './SearchKeywords';
function Jobs({ updateContext }) {
    const Infos = useContext(InfoGlobal)
    const [searchParams] = useSearchParams();
    const theme = useTheme()
    const navigate = useNavigate()
    const TimeCheckbox = ['onsite', 'remote', 'hybride',]
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    const [searchJob, setSearchJob] = useState('')
    const [searchPlace, setSearchPlace] = useState('')
    const [TypeOfJob, setTypeOfJob] = useState('')
    const [checked, setChecked] = useState([]);
    const [order, setorder] = useState('')
    // useEffect(() => {
    //     console.log(Array.from(checked))
    //     console.log(searchParams.get('typeOfJob'));

    // }, [searchParams.get('typeOfJob')])
    const [Jobs, setJobs] = useState(null)
    const sort = (e) => {
        setorder(e)
    }
    //Search Keywords
    const [SearchKeys, setSearchKeys] = useState(() => {
        const words = localStorage.getItem('SearchKeywords');
        return JSON.parse(words) || []
    })
    const handleShowKeywords = (e) => {
        setSearchKeys(e)
    }
    const handleSearchKeywords = (e) => {
        navigate(`/Jobs?${e && `keywords=${e.trim()}`}`)
        setSearchJob(e)
    }
    return (
        <Box>
            <Header isloging={false} profile={Infos.token ? true : false} UserInfos={Infos.UserInfos} updateContext={updateContext} />
            <Box p={isMatchedPhone ? '10px' : isMatchedTablette ? '30px' : '50px'}>
                <Box display='flex' flexWrap='wrap' mb={0} >
                    <TextField
                        label="Enter job title or keyword"
                        variant='outlined'
                        color='primary'
                        value={searchJob}
                        onChange={(e) => { setSearchJob(e.target.value) }}
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
                        sx={{ mr: 2, mb: 1, width: isMatchedPhone ? '65%' : '30%' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FmdGoodOutlinedIcon sx={{ color: 'black' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button variant='contained' size='medium' onClick={() => { navigate(`/Jobs?${searchJob && `keywords=${searchJob.trim()}&`}${searchPlace && `cityLoc=${searchPlace}&`}${Array.from(checked).length != 0 && `typeOfJob=${Array.from(checked).join(',')}&`}${order && `Sort=${order}`}`); searchJob.trim() !== '' && setSearchKeys(Array.from(new Set([...SearchKeys, searchJob.trim()]))); searchJob.trim() !== '' && localStorage.setItem('SearchKeywords', JSON.stringify(Array.from(new Set([...SearchKeys, searchJob.trim()])))) }} sx={{ height: '55px', fontSize: '1.1em', bgcolor: 'primary.A200', '&:hover': { bgcolor: 'primary.A100' }, color: 'primary.main', borderRadius: isMatchedTablette ? '50%' : '60px', fontWeight: 'bold' }}>
                        {
                            isMatchedTablette ? <ArrowForwardOutlinedIcon sx={{ textAlign: 'center' }} /> : 'Search'
                        }
                    </Button>
                    <FormGroup sx={{ display: "flex", flexWrap: 'wrap', flexDirection: 'row', mb: SearchKeys.length !== 0 ? 2 : 5 }}>
                        {
                            TimeCheckbox.map((ele, index) => (
                                <FormControlLabel key={index} control={<Checkbox onChange={(e) => (e.target.checked ? setChecked(new Set([...checked, ele])) : setChecked([...checked].filter(elem => elem != ele)))} />} label={ele} sx={{ mr: 5 }}></FormControlLabel>
                            ))
                        }
                    </FormGroup>
                </Box>
                {
                    SearchKeys.length != 0 && <SearchKeywords Search={SearchKeys} handleShowKeywords={handleShowKeywords} handleSearchKeywords={handleSearchKeywords} />
                }
                {
                    <JobsFiltering keywords={searchParams.get('keywords') || ''} cityLoc={searchParams.get('cityLoc') || ''} typeOfJob={searchParams.get('typeOfJob') || ''} />
                }


            </Box>
        </Box>
    )
}

export default Jobs