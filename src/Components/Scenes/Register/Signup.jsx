import { Box, Button, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik, formik } from 'formik'
import * as Yup from 'yup'
import Header from '../../Global/Header'
import signup from '../../Assets/signup.png'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from "react-google-login";
import wave from '../../Assets/waveSignup.svg'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useState } from 'react'
import { textAlign } from '@mui/system'
import axios from 'axios'
function Signup() {
    const [chosen, setChosen] = useState(() => {
        const savedChosen = localStorage.getItem('choose')
        return JSON.parse(savedChosen) || ''
    })

    const SignupSchema = Yup.object().shape({
        Name: Yup.string()
            .min(2, 'Name is too short')
            .max(50, 'Name is too long')
            .required('Name is required'),
        FamilyName: Yup.string()
            .min(2, 'FamilyName is too short')
            .max(50, 'FamilyName is too long')
            .required('FamilyName is required'),
        UserName: Yup.string()
            .min(2, 'UserName is too short')
            .max(50, 'UserName is too long')
            .required('UserName is required'),
        Email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        Password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Password is required'),
    });
    const SignupSchemaCompany = Yup.object().shape({
        Name: Yup.string()
            .min(2, 'Name is too short')
            .max(50, 'Name is too long')
            .required('Name is required'),
        City: Yup.string()
            .min(3, 'Place is too short')
            .max(50, 'Place is too long')
            .required('Place is required'),
        Email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        Password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Password is required'),
    });
    const initialValuesEmployer = {
        Name: '',
        FamilyName: '',
        UserName: '',
        Email: '',
        PhoneNumber: '',
        Password: ''
    }
    const initialValuesCompany = {
        Name: '',
        City: '',
        Description: '',
        Email: '',
        Password: ''
    }
    const theme = useTheme()
    const [visibilityPassword, setVisibilityPassword] = useState(true)
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    const [email, setEmail] = useState(null);
    const responseFacebook = async (response) => {
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response.accessToken))
        // const respons = await fetch(`https://graph.facebook.com/${response.userID}?fields=id,name,email,picture&access_token=${response.accessToken}`);
        // const data = await respons.json();
        // setEmail(data);
        // console.log(data);  
    };
    // const [email, setEmail] = useState('');
    // useEffect(() => {
    //   const fetchData = async () => {
    //   };
    //   fetchData();
    // }, []);
    const responseGoogle = (response) => {
        console.log(response);
    };
    
    // fetch('http://192.168.163.79:3000/signup',{
    //     method:'POST',
    //     headers:{'Content-Type':'application/json'},
    //     body:JSON.stringify({username:'ssds',password:'sdsda'})
    // })
    return (
        <Box sx={{ background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(20,66,114,1) 100%, rgba(20,38,114,1) 100%)' }}>
            <Header isloging={false} />
            <Box p={isMatchedTablette ? '40px 30px' : '40px 60px'} display='flex' flexDirection={isMatchedTablette ? 'column' : 'row'}>
                <Box flex={chosen == 'chosenCompany' ? 1.2 : 1}>
                    <Typography variant={isMatchedPhone ? 'h5' : 'h4'} color='secondary' mb={4} width={isMatchedTablette ? '100%' : '70%'}>
                        {chosen == 'chosenCompany' ? 'Sign up for your projet !' : 'Sign up for your job !'}
                    </Typography>
                    <Formik
                        initialValues={chosen == 'chosenCompany' ? initialValuesCompany : initialValuesEmployer}
                        validationSchema={chosen == 'chosenCompany' ? SignupSchemaCompany : SignupSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false);
                            fetch('http://192.168.245.79:3000/signup', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ username: values.Name, password: values.Password,email:values.Email })
                            }).then(res=>res.json()).
                            then(data=>console.log(data))
                            .catch(er=>console.log(er))
                        }}
                    >
                        {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
                            <Form style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                    name="Name"
                                    label={chosen == 'chosenCompany' ? 'Name of company' : 'Name'}
                                    type="text"
                                    variant="filled"
                                    value={values.Name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name="Name" />}
                                    error={(touched.Name && errors.Name)}
                                    disabled={isSubmitting}
                                    sx={{ mb: '20px', width: isMatchedTablette ? '100%' : '75%' }}
                                />
                                <TextField
                                    name={chosen == 'chosenCompany' ? 'City' : 'FamilyName'}
                                    label={chosen == 'chosenCompany' ? 'Place of the company' : 'FamilyName'}
                                    type="text"
                                    variant="filled"
                                    value={chosen == 'chosenCompany' ? values.City : values.FamilyName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name={chosen == 'chosenCompany' ? 'City' : "FamilyName"} />}
                                    error={chosen == 'chosenCompany' ? (touched.City && errors.City) : (touched.FamilyName && errors.FamilyName)}
                                    disabled={isSubmitting}
                                    sx={{ mb: '20px', width: isMatchedTablette ? '100%' : '75%' }}
                                />
                                {
                                    chosen != 'chosenCompany' &&
                                    <TextField
                                        name="UserName"
                                        label="UserName"
                                        type="text"
                                        variant="filled"
                                        value={values.UserName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={<ErrorMessage name="UserName" />}
                                        error={touched.UserName && errors.UserName}
                                        disabled={isSubmitting}
                                        sx={{ mb: '20px', width: isMatchedTablette ? '100%' : '75%' }}
                                    />
                                }
                                <TextField
                                    name="Email"
                                    label="Email"
                                    type="email"
                                    variant="filled"
                                    value={values.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name="Email" />}
                                    error={touched.Email && errors.Email}
                                    disabled={isSubmitting}
                                    sx={{ mb: '20px', width: isMatchedTablette ? '100%' : '75%' }}
                                />
                                <TextField
                                    name="Password"
                                    label="Password"
                                    variant="filled"
                                    type={visibilityPassword ? 'password' : 'text'}
                                    value={values.Password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name="Password" />}
                                    error={touched.Password && errors.Password}
                                    disabled={isSubmitting}
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
                                    sx={{ mb: '20px', width: isMatchedTablette ? '100%' : '75%' }}
                                />
                                {
                                    chosen == 'chosenCompany' &&
                                    <TextField
                                        name='Description'
                                        label='Short description of your company (not required)'
                                        type="text"
                                        variant="filled"
                                        multiline={true}
                                        rows={4}
                                        value={values.Description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        sx={{ mb: '20px', width: isMatchedTablette ? '100%' : '75%' }}
                                    />
                                }
                                <Button type="submit" variant='contained' color='primary' disabled={isSubmitting} sx={{ margin: isMatchedTablette ? '0 auto' : '0', mb: '20px', width: '150px', borderRadius: '60px' }}>
                                    Sign up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <Box flex={chosen == 'chosenCompany' ? 0.8 : 1} display='flex' alignItems='center' justifyContent='center'>
                    {
                        chosen != 'chosenCompany' ? <Box width={isMatchedTablette ? '100%' : '70%'} textAlign='center' >
                            <Box display='flex' alignItems='center' mb={3}>
                                <hr style={{ height: 0, borderColor: 'rgb(81, 80, 80)', flex: 1 }} />
                                <Typography variant='h6' color='whitesmoke' m='0 5px' display='inline-block' textAlign='center'>OR</Typography>
                                <hr style={{ flex: 1, height: 0, borderColor: 'rgb(81, 80, 80)' }} />
                            </Box>

                            <FacebookLogin
                                appId="946093673468705" // Replace with your Facebook App ID
                                callback={responseFacebook}
                                render={(renderProps) => (
                                    <Button
                                        startIcon={<FacebookOutlinedIcon />}
                                        variant='contained'
                                        sx={{ width: isMatchedPhone ? '100%' : (isMatchedTablette ? '70%' : '100%'), mb: 2, borderRadius: '60px' }}
                                        onClick={renderProps.onClick}>
                                        Login with Facebook
                                    </Button>
                                )}
                            />
                            <GoogleLogin
                                clientId="378672419142-63so1bfi4dhfob95e00anj40s9t74jn3.apps.googleusercontent.com"
                                buttonText='login with google'
                                // render={(renderProps) => (
                                //     <Button
                                //         startIcon={<GoogleIcon sx={{ color: 'rgb(214, 15, 15)' }} />}
                                //         onClick={renderProps.onClick}
                                //         disabled={renderProps.disabled}
                                //         style={{
                                //             backgroundColor: "white",
                                //             color: 'rgb(214, 15, 15)',
                                //             width: isMatchedPhone ? '100%' : (isMatchedTablette ? '70%' : '100%'),
                                //             borderRadius: '60px'
                                //         }}
                                //     >
                                //         Login with Google
                                //     </Button>
                                // )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}

                            />
                        </Box>
                            : <img src={signup} alt="signup" width='85%' />
                    }

                </Box>
            </Box>
        </Box >
    )
}

export default Signup