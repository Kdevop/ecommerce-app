import React, { useState, useRef, useEffect } from "react";
import Styles from './userAccount.module.css';
import { Paper, Grid, Avatar, Button, TextField, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import EditDetails from "../editPersonalDetails/editDetails";

function UserAccount(props) {
    const [isShowEdit, setIsShowEdit] = useState(false);
    const editRef = useRef(null);
    const buttonRef = useRef(null);

    const user = props.data;

    const onSubmit = () => {
        setIsShowEdit(!isShowEdit);
    }

    const showEdit = {
        transition: 'all 0.6s ease-in-out',
        transform: isShowEdit ? 'translateY(0)' : 'translateY(-300%)',
        position: 'absolute',
        zIndex: isShowEdit ? 1000 : -1000,
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editRef.current && !editRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setIsShowEdit(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div style={showEdit} ref={editRef}>
                <EditDetails showChange={onSubmit}/>
            </div>
            {user && (
                <div>
                    <p>EMAIL:</p> 
                    <p><span className={Styles.details}>{user.email}</span></p>
                    <p>FIRST NAME: </p>
                    <p><span className={Styles.details}>{user.first_name}</span></p>
                    <p>LAST NAME: </p> 
                    <p><span className={Styles.details}>{user.last_name}</span></p>
                </div>
            )}

            <div ref={buttonRef}>
                <button onClick={onSubmit} >Edit Personal Details</button>
            </div>
        </div>
    )
}

export default UserAccount;


