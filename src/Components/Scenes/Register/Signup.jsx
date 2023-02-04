import { Box, Button, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { ErrorMessage, Field, Form, Formik, formik } from 'formik'
import * as Yup from 'yup'
import Header from '../../Global/Header'
import signup from '../../Assets/signup.png'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import wave from '../../Assets/waveSignup.svg'
import { useState } from 'react'
function Signup() {
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
    const initialValues = {
        Name: '',
        FamilyName: '',
        UserName: '',
        Email: '',
        PhoneNumber: '',
        Password: ''
    }
    const theme = useTheme()
    const [visibilityPassword, setVisibilityPassword] = useState(true)
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchedLaptop = useMediaQuery(theme.breakpoints.down('lg'))
    return (
        <Box sx={{ background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(20,66,114,1) 100%, rgba(20,38,114,1) 100%)' }}>
            <Header />
            <Box p={isMatchedTablette ? '40px 30px' : '40px 60px'} display='flex' flexDirection={isMatchedTablette ? 'column' : 'row'}>
                <Box flex={1}>
                    <Typography variant={isMatchedPhone ? 'h5' : 'h4'} color='secondary' mb={4} width={isMatchedTablette ? '100%' : '70%'}>
                        Inscrivez-vous  en 2 minutes seulement !
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignupSchema}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                actions.setSubmitting(false);
                            }, 1000);
                        }}
                    >
                        {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
                            <Form style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                    name="Name"
                                    label="Name"
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
                                    name="FamilyName"
                                    label="FamilyName"
                                    type="text"
                                    variant="filled"
                                    value={values.FamilyName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name="FamilyName" />}
                                    error={touched.FamilyName && errors.FamilyName}
                                    disabled={isSubmitting}
                                    sx={{ mb: '20px', width: isMatchedTablette ? '100%' : '75%' }}
                                />
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
                                    type={visibilityPassword ?'password':'text'}
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
                                                    visibilityPassword ? <VisibilityOffOutlinedIcon onClick={()=>setVisibilityPassword(false)} sx={{ color: 'black', cursor: 'pointer' }} />
                                                        : <VisibilityOutlinedIcon onClick={()=>setVisibilityPassword(true)} sx={{ color: 'black', cursor: 'pointer' }} />
                                                }
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ mb: '20px', width: isMatchedTablette ? '100%' : '75%' }}
                                />
                                <Button type="submit" variant='contained' color='primary' disabled={isSubmitting} sx={{ mb: '20px', width: '150px', borderRadius: '60px' }}>
                                    Next
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <Box flex={1} display='flex' alignItems='center' justifyContent='center'>
                    <img src={signup} alt="signup" width='85%' />
                </Box>
            </Box>
        </Box >
    )
}

export default Signup