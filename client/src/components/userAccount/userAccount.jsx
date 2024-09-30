import React, { useState } from "react";
import { Paper, Grid, Avatar, Button, TextField, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import EditDetails from "../editPersonalDetails/editDetails";

function UserAccount(props) {
    const [showEdit, setShowEdit] = useState(false);

    const user = props.data;

    const onSubmit = () => {
        setShowEdit(!showEdit);
    }

    return (
        <Paper>
            {user && (
                <div>
                    <p>This is the email: {user.email}</p>
                    <p>This is the first name: {user.first_name}</p>
                    <p>This is the email: {user.last_name}</p>
                </div>
            )}

            <div>
                <button onClick={onSubmit} >Edit Personal Details</button>
            </div>

            <hr />

            {showEdit ? (
                <div>
                    <EditDetails />
                </div>
            ) : (
                null
            )}

        </Paper>
    )
}

export default UserAccount;


