import React, { useState } from "react";
import Styles from '../address/address.module.css';
import { Paper, Grid, Avatar, Button, TextField, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { addAddress } from "../../reduxStore/userSlice";
import EditAddress from "../editAddress/editAddress";

const validationSchema = Yup.object().shape({
    address_line_1: Yup.string().required('This feild is required.'),
    address_line_2: Yup.string().required('This feild is required.'),
    city: Yup.string().required('This feild is required.'),
    county: Yup.string().required('This feild is required.'),
    post_code: Yup.string().required('This feild is required.'),
});

function Address(props) { 
    const dispatch = useDispatch();
    const [isShowEdit, setIsShowEdit] = useState(false);

    const showEdit = {
        transition: 'all 0.6s ease-in-out',
        transform: isShowEdit ? 'translateY(0)' : 'translateY(-300%)',
        position: 'absolute',
        zIndex: isShowEdit ? 1000 : -1000,
    };

    const onSubmit = async (values, actions) => {

        const address = {
            address_line_1: values.address_line_1,
            address_line_2: values.address_line_2,
            city: values.city,
            county: values.county,
            post_code: values.post_code,
        };

        console.log(address);

        try {
            const sendAddress = await dispatch(addAddress(address));

            console.log(sendAddress);

            //additional steps needed here to inform the user the address has been updated. 

        } catch (error) {
            console.warn(error);
            //error message to be added to form.
        };

        actions.resetForm();

    }

    const editAddress = () => {
        setIsShowEdit(!isShowEdit);
    }

    if (props.dataCheck) {

        return (
            <Paper>
                <div>
                    <div style={showEdit}>
                        <EditAddress />
                    </div>
                    <div>Address will go here</div>
                    <p>This is the first line of the address: {props.data.address_line1}</p>
                    <p>This is the second line of the address: {props.data.address_line2}</p>
                    <p>This is the city: {props.data.city}</p>
                    <p>This is the county: {props.data.county}</p>
                    <p>This is the Post Code: {props.data.post_code}</p>
                </div>

                <div>
                    <button onClick={editAddress}>Edit Your Address</button>
                </div>

                <hr />


            </Paper>
        )
    }
    else {
        return (
            <div>
                <div>You need to add an address!</div>
                <Grid className={Styles.registration}>
                    <Paper elevation={5} className={Styles.paper}>
                        <Grid align='center'>
                            <Avatar className={Styles.avatar}>
                                <AddCircleOutlineOutlinedIcon />
                            </Avatar>
                            <Typography varient='caption'>To update your details, make any changes below.</Typography>
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
                                    <TextField fullWidth label='Number and Street Name' name='address_line_1' id='address_line_1' placeholder='Number and Street Name' className={Styles.input} value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
                                    <ErrorMessage name='address_line_1' component='div' className={Styles.error} />
                                    <TextField fullWidth label='Town or Village' name='address_line_2' id='address_line_2' placeholder='Town or Village' className={Styles.input} value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
                                    <ErrorMessage name='address_line_2' component='div' className={Styles.error} />
                                    <TextField fullWidth label='City' name='city' id='city' placeholder='City' className={Styles.input} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                    <ErrorMessage name='city' component='div' className={Styles.error} />
                                    <TextField fullWidth label='County' name='county' id='county' placeholder='County' className={Styles.input} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                    <ErrorMessage name='county' component='div' className={Styles.error} />
                                    <TextField fullWidth label='Post Code' name='post_code' id='post_code' placeholder='Post Code' className={Styles.input} value={values.email} onChange={handleChange} onBlur={handleBlur} />
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
            </div>
        )
    }

}

export default Address;