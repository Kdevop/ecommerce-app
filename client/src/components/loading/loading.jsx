import React from 'react';
import { CircularProgress } from '@mui/material';
import { Paper } from '@mui/material';
import Styles from './loading.module.css';


function Loading() {
    return (
        <Paper className={Styles.topcontainer}>
            <div>
                <h3>Fetching Data...</h3>
            </div>
            <div>
                <img src='./photos/logo2.jpg' alt='Image of Logo' />
            </div>
            <div>
                <CircularProgress />
            </div>
        </Paper>

    )
};

export default Loading;