import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from '../editAddress/editAddress.module.css';
import * as Yup from 'yup';
import { Paper, Grid, Avatar, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { updateAddress, updatedUser } from '../../reduxStore/userSlice';

const validationSchema = Yup.object().shape({
    address_line_1: Yup.string().required('This feild is required.'),
    address_line_2: Yup.string().required('This feild is required.'),
    city: Yup.string().required('This feild is required.'),
    county: Yup.string().required('This feild is required.'),
    post_code: Yup.string().required('This feild is required.'),
});

function EditAddress(props) {
    const {showEdit} = props;
    const [showComplete, setShowComplete] = useState(false);
    const dispatch = useDispatch();
    const userChanged = useSelector(updatedUser);
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        const address = { 
            address_line_1: values.address_line_1,
            address_line_2: values.address_line_2,
            city: values.city,
            county: values.county,
            post_code: values.post_code,
        };

        try {
            const sendAddress = await dispatch(updateAddress(address));
            await new Promise(resolve => setTimeout(resolve, 2500));
            console.log(sendAddress);
            showEdit();

        } catch (error) {
            console.warn(error);
        }

        actions.resetForm();
    }

    useEffect(() => {
        const fetchData = async () => {
            if (userChanged) {
                setShowComplete(true);
                await new Promise(resolve => setTimeout(resolve, 25000));
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
                    <Typography varient='caption'>To update your details, make any changes below.</Typography>
                    {showComplete ? (
                        <p>Your details have been updated</p>
                    ) : (
                        null
                    )}
                </Grid>
                <Formik
                    initialValues={{
                        address_line_1: '',
                        address_line_2: '',
                        city: '',
                        county: '',
                        post_code: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, handleBlur, isSubmitting, handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'>
                            <TextField fullWidth label='Number and Street Name' name='address_line_1' id='address_line_1' placeholder='Number and Street Name' className={Styles.input} value={values.address_line_1} onChange={handleChange} onBlur={handleBlur} />
                            <ErrorMessage name='address_line_1' component='div' className={Styles.error} />
                            <TextField fullWidth label='Town or Village' name='address_line_2' id='address_line_2' placeholder='Town or Village' className={Styles.input} value={values.address_line_2} onChange={handleChange} onBlur={handleBlur} />
                            <ErrorMessage name='address_line_2' component='div' className={Styles.error} />
                            <TextField fullWidth label='City' name='city' id='city' placeholder='City' className={Styles.input} value={values.city} onChange={handleChange} onBlur={handleBlur} />
                            <ErrorMessage name='city' component='div' className={Styles.error} />
                            <TextField fullWidth label='County' name='county' id='county' placeholder='County' className={Styles.input} value={values.county} onChange={handleChange} onBlur={handleBlur} />
                            <ErrorMessage name='county' component='div' className={Styles.error} />
                            <TextField fullWidth label='Post Code' name='post_code' id='post_code' placeholder='Post Code' className={Styles.input} value={values.post_code} onChange={handleChange} onBlur={handleBlur} />
                            <ErrorMessage name='post_code' component='div' className={Styles.error} />
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
        </Grid>
    )
}

export default EditAddress;