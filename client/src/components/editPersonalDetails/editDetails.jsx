import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from '../editPersonalDetails/editDetails.module.css'
import { Paper, Grid, Avatar, Button, TextField, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails, updatedUser } from '../../reduxStore/userSlice';

const validationSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email'),
    password: Yup.string().min(6, 'Password nust be at least 6 characters').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!@#$%^&*]).{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function EditDetails(props) {
    const {showChange} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formCheck, setformCheck] = useState(false);
    const [showComplete, setShowComplete] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userChanged = useSelector(updatedUser);

    const handlePassVisibility = () => {
        setShowPassword(!showPassword)
    };

    const onSubmit = async (values, actions) => {

        const formCheck = () => {
            if (Object.values(values).every(value => value === '')) {
                // Display an error message to the user (you can use a toast, modal, or any other UI element)
                console.log('Please fill in at least one field');
                
                return false;

            }   else {
                return true;
            }
        }

        if (formCheck()) {
            const dataToSubmit = Object.entries(values)
            .filter(([key, value]) => value !== '')
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

            
            try {

                const update = await dispatch(updateDetails(dataToSubmit));
                await new Promise(resolve => setTimeout(resolve, 2500));
                console.log(update);
                showChange();

            } catch (error) {
                setShowError(true);
                console.error(error);
            }
        } else {
            setformCheck(true)
        }

        actions.resetForm();
    };

    useEffect(() => {
        const fetchData = async () => {
            if (userChanged) {
                setShowComplete(true);
                await new Promise(resolve => setTimeout(resolve, 2500));
                navigate('/userdetails');
            }
        };
    
        fetchData();
    }, [navigate, userChanged]);


    return (
        <Grid className={Styles.registration}>
            <Paper elevation={5} className={Styles.paper}>
                <Grid align='center'>
                    <Avatar className={Styles.avatar}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h3 className={Styles.header}>Change Personal Details</h3>
                    <Typography varient='caption'>To update your details, make any changes below.</Typography>
                    {formCheck? (
                        <p className={Styles.formError}>You need to complete the fields that you wish to change.</p>
                    ) : (
                        null
                    )}
                    {showComplete? ( 
                        <p>Your details have been updated.</p>
                    ) : (
                        null
                    )}
                    {showError? (
                        <p className={Styles.formError}>An error occured, please try again later.</p>
                    ) : (
                        null
                    )}
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
                            <TextField fullWidth label='New First Name' name='firstName' id='firstName' placeholder='Enter your first name' className={Styles.input} value={values.firstName} onChange={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name='firstName' component='div' className={Styles.error} />
                            <TextField fullWidth label='New Last Name' name='lastName' id='lastName' placeholder='Enter your last name' className={Styles.input} value={values.lastName} onChange={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name='lastName' component='div' className={Styles.error} />
                            <TextField fullWidth label='New Email' name='email' id='email' placeholder='Enter your email' className={Styles.input} value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name='email' component='div' className={Styles.error} />
                            <TextField fullWidth type={showPassword ? 'text' : 'password'} label='New Password' name='password' id='password' placeholder='Enter your password' className={Styles.input} value={values.password} onChange={handleChange} onBlur={handleBlur} InputProps={{
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
                            <ErrorMessage name='password' component='div' className={Styles.error} />
                            <TextField fullWidth type={showPassword ? 'text' : 'password'} label='Confirm Password' name='confirmPassword' id='confirmPassword' placeholder='Confirm your password' className={Styles.input} value={values.confirmPassword} onBlur={handleBlur} onChange={handleChange} InputProps={{
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
                            <ErrorMessage name='confirmPassword' component='div' className={Styles.error} />
                            {!isSubmitting ? (
                                <Button fullWidth type='submit' variant='contained' color='primary' className={Styles.button} >Submit Changes</Button>
                            ) : (
                                <div className={Styles.loadingIcon}>
                                    <CircularProgress />
                                </div>
                            )}

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid >
    )
};

export default EditDetails;