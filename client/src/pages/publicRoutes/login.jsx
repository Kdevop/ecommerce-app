import React, { useState } from 'react';
import styles from './login.module.css';
import { Paper, Grid, Avatar, Button, TextField, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Formik, Form, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePassVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (values, actions) => {

        const credentials = {
            email: values.email,
            password: values.password,
        };

        console.log(credentials);

        await new Promise((resolve) => setTimeout(resolve, 5000));
        actions.resetForm();
    }

    return (
        <Grid className={styles.registration}>
            <Paper elevation={5} className={styles.paper}>
                <Grid align='center'>
                    <Avatar className={styles.avatar}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h3 className={styles.header}>Sign Ip</h3>
                    <Typography varient='caption'>To sign in, complete the form.</Typography>
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
                                <Typography>Don't have an account? Click here to <NavLink to='/register'>Sign Up!</NavLink></Typography>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    );
};

export default Login;