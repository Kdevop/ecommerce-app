// import dependencies
import React, { useState } from 'react';
import styles from '../publicRoutes/registration.module.css';
import { Paper, Grid, Avatar, Button, TextField, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Formik, Form, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { registerUser, registerData, registering, registerError } from '../../reduxStore/authSlice';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password nust be at least 6 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});


function Registration() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handlePassVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (values, actions) => {
        const credentials = {
            password: values.password,
            email: values.email, 
            first_name: values.firstName, 
            last_name: values.lastName,
        };

        console.log(credentials);
        try {
            const register = await dispatch(registerUser(credentials));
            console.log(register)
            
            navigate('/');
            
        } catch (err) {
            console.error(err);
        }
        
        actions.resetForm()
    }

    return (
        <Grid className={styles.registration}>
            <Paper elevation={5} className={styles.paper}>
                <Grid align='center'>
                    <Avatar className={styles.avatar}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h3 className={styles.header}>Sign Up</h3>
                    <Typography varient='caption'>To create an account, complete the form.</Typography>
                </Grid>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, handleBlur, isSubmitting, handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'>
                            <TextField fullWidth label='First Name' name='firstName' id='firstName' placeholder='Enter your first name' className={styles.input} value={values.firstName} onChange={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name='firstName' component='div' className={styles.error} />
                            <TextField fullWidth label='Last Name' name='lastName' id='lastName' placeholder='Enter your last name' className={styles.input} value={values.lastName} onChange={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name='lastName' component='div' className={styles.error} />
                            <TextField fullWidth label='Email' name='email' id='email' placeholder='Enter your email' className={styles.input} value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name='email' component='div' className={styles.error} />
                            <TextField fullWidth type={showPassword ? 'text' : 'password'} label='Password' name='password' id='password' placeholder='Enter your password' className={styles.input} value={values.password} onChange={handleChange} onBlur={handleBlur} InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handlePassVisibility} aria-label='toggle password' edge='end'>
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                            <ErrorMessage name='password' component='div' className={styles.error} />
                            <TextField fullWidth type={showPassword ? 'text' : 'password'} label='Confirm Password' name='confirmPassword' id='confirmPassword' placeholder='Confirm your password' className={styles.input} value={values.confirmPassword} onBlur={handleBlur} onChange={handleChange} InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handlePassVisibility} aria-label='toggle password' edge='end'>
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                            <ErrorMessage name='confirmPassword' component='div' className={styles.error} />
                            {!isSubmitting ? (
                                <Button fullWidth type='submit' variant='contained' color='primary' className={styles.button} >Sign Up</Button>
                            ) : (
                                <div className={styles.loadingIcon}>
                                    <CircularProgress />
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid >
    );
};

export default Registration;

//await new Promise((resolve) => setTimeout(resolve, 5000));