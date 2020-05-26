import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    header: {
        backgroungColor: '#e5e5e5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '110px',
    },
    text: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '26px',
        lineHeight: '30px',        
        color: '#ffffff',
    },
}));
export default function Header(props) {
    const classes = useStyles()

    return (
        <div className={classes.header}>
            <Typography className={classes.text}>React Ex 4, ohad aizik</Typography>
        </div>

    );
};



