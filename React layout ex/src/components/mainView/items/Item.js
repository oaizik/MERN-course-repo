import React, {useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from "@material-ui/icons/Save";
import { IconButton, TextField, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    item: {
        backgroundColor: 'rgba(23, 25, 50, 0.6)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '59px',
        paddingLeft: '16px',
        borderBottom: '1px solid white',
    },
    text: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: '16px',
        lineHeight: '19px',
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formitem: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '59px',
        paddingLeft: '16px',
    }
}));

export default function ListItem(props){
    const classes = useStyles()


    const {item, deleteItem ,children, updateItem} = props;
    const [editing, setEditing] = useState(false);
    const [updated, setUpdated] = useState(undefined);
    const saveEditedElement = (event) => {
        event.preventDefault();
        if(updated !== undefined){
            item.body = updated;
            updateItem(item.body, item.id);
        };
        setEditing(false);
    };

    return editing ? (
        <div>
            <form className={classes.formitem}>
                <TextField type="textarea" id="outlined-multiline-static" onChange={e => setUpdated(e.target.value)} label="enter new body" />
                <IconButton onClick={saveEditedElement}>
                    <SaveIcon style={{color: 'black'}}/>
                </IconButton>
            </form>
        </div>
    ) : (
        <div className={classes.item}>
            <div>
                <Typography className={classes.text}>{children}</Typography>
            </div>
            <div className={classes.icons}>
                <IconButton onClick={() => setEditing(true)}>
                    <EditIcon style={{color: '#ffffff'}}/>
                </IconButton>
                <IconButton onClick={() => deleteItem(item.id)}>
                    <DeleteIcon style={{color: '#fd5842'}}/>
                </IconButton>
            </div>
        </div>
    )
};
