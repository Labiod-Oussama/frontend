import { Box, Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Header from '../../Global/Header'
import logologin from '../../Assets/login.png'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { InfoGlobal } from '../../../App';
import { serverAddress } from '../../Global/Config';
function Login({ updateContext }) {
    const Infos = useContext(InfoGlobal)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorUserName, setErrorUserName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [visibilityPassword, setVisibilityPassword] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        if (userName) {
            setErrorUserName(false)
        }
        if (password) {
            setErrorPassword(false)
        }
    }, [userName, password])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!userName) {
            setErrorUserName(true)
        }
        if (!password) {
            setErrorPassword(true)
        }
        fetch(`${serverAddress}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        }).then(res => res.json()).
            // then(data=>console.log(data))
            then(data => data.success && (navigate('/'), document.cookie = `token=${data.token}; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/`, localStorage.setItem('UserInfo', JSON.stringify(data.user)),updateContext({token:data.token,UserInfos:JSON.parse(localStorage.getItem('UserInfo'))})))
            .catch(error => console.log(error))
    }
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box sx={{ height: '103vh', background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(20,66,114,1) 100%, rgba(20,38,114,1) 100%)' }}>
            <Header isloging={true} />
            <Box p={isMatchedPhone ? '50px 10px' : '30px'} display='flex' justifyContent='center' alignItems='center'>
                <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{ width: isMatchedTablette ? '80%' : isMatchedPhone ? '100%' : '35%' }}>
                    <img src={logologin} alt="login" width='28%' style={{ margin: '0 auto', marginBottom: '40px' }} />
                    <Typography variant='h4' color='secondary' mb={2}>
                        Bienvenue !
                    </Typography>
                    <form noValidate autoComplete='off' id='my-login' onSubmit={handleSubmit}>
                        <TextField
                            label='UserName or Email'
                            variant='outlined'
                            type='text'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            error={errorUserName}
                            sx={{ width: '100%', mb: 2 }}
                        />
                        <TextField
                            label='Password'
                            variant='outlined'
                            type={visibilityPassword ? 'password' : 'text'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errorPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {
                                            visibilityPassword ? <VisibilityOffOutlinedIcon onClick={() => setVisibilityPassword(false)} sx={{ color: 'black', cursor: 'pointer' }} />
                                                : <VisibilityOutlinedIcon onClick={() => setVisibilityPassword(true)} sx={{ color: 'black', cursor: 'pointer' }} />
                                        }
                                    </InputAdornment>
                                )
                            }}
                            sx={{ width: '100%', mb: 1 }}
                        />
                    </form>
                    <FormGroup sx={{ display: 'inline-block' }}>
                        <FormControlLabel control={<Checkbox />} label='Reste connecte' ></FormControlLabel>
                    </FormGroup>
                    <Link underline='hover' color='primary' variant='body1' sx={{ cursor: 'pointer', mr: 'auto', mb: 2 }}>
                        Vous n'arrivez pas à vous connecter ?
                    </Link>
                    <Button type='submit' variant='contained' color='primary' sx={{ borderRadius: '60px', width: '180px', mb: 3 }} form='my-login' >
                        Connexion
                    </Button>
                    <Link underline='none' color='secondary' variant='body1' onClick={()=>navigate('/chooseToBe')} sx={{ cursor: 'pointer', m: '0 auto' }}>
                        Pas encore membre de Rendili ? Inscrivez-vous gratuitement
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Login