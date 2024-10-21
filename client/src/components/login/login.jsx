import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import { Paper, Grid, Avatar, Button, TextField, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginUser, userAuthError, userAuthDone, errorData } from '../../reduxStore/authSlice';
import { getCart } from '../../reduxStore/cartSlice';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login(props) {
    const { onLogin, onReg, showLogin } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const message = useSelector(errorData);
    const signInComplete = useSelector(userAuthDone);
    const signInError = useSelector(userAuthError);


    const handlePassVisibility = () => {
        setShowPassword(!showPassword) 
    }

    const onSubmit = async (values, actions) => {

        const credentials = {
            username: values.email,
            password: values.password,
        };

        try {
            await dispatch(loginUser(credentials));

            await new Promise(resolve => setTimeout(resolve, 2500));
            console.log(signInComplete);
            
        } catch (err) {
            console.error(err);
            alert('An issue occured, please try again.');
        }

        actions.resetForm();
    }

    useEffect(() => {
        const fetchData = async () => {
            if (signInComplete) {

                setError(false);
                setSignedIn(true);
                              
                dispatch(getCart());
                
                await new Promise(resolve => setTimeout(resolve, 2500));
                if(showLogin) {
                    onLogin();
                }
            }
    
            if (signInError) {
                setSignedIn(false);
                setError(true);
            }
        };
    
        fetchData();
    }, [signInComplete, signInError, dispatch, onLogin, showLogin]);

    const onSwitch = () => {
        onLogin();
        onReg();
    };

    return (
        <Grid className={styles.registration}>
            <Paper elevation={5} className={styles.paper}>
                <Grid align='center'>
                    <Avatar className={styles.avatar}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h3 className={styles.header}>Sign In</h3>
                    <Typography varient='caption'>To sign in, complete the form.</Typography>
                    {signedIn ? (
                        <p>You are signed in!</p>
                    ) : (
                        null
                    )}

                    {error ? (
                        <p className={styles.error}>Error signing in: {message}</p>
                    ) : (
                        null
                    )}

                </Grid>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, handleBlur, isSubmitting, handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'>
                            {/* For email. Needs on change and on blur. */}
                            <TextField fullWidth label='Email' name='email' id='email' placeholder='Enter your email' className={styles.input} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            <ErrorMessage name='email' component='div' className={styles.error} />
                            {/* For password. Needs action to hide and show password.*/}
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
                            {/* Button to sign in - needs is submitting */}
                            {!isSubmitting ? (
                                <Button fullWidth type='submit' variant='contained' color='primary' className={styles.button} >Sign In</Button>
                            ) : (
                                <div className={styles.loadingIcon}>
                                    <CircularProgress />
                                </div>
                            )}
                            <div>
                                <Typography>Don't have an account? Click here to <button onClick={onSwitch}>Register</button></Typography>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    );
};

export default Login;