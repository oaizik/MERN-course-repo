import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    form:{
        background: 'rgba(23, 25, 50, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        beckgroundColor: 'green',
        height: '378px',
        borderRadius: '10px',
    },
    inputDiv: {
        width: '327px',
        height: '48px',
        marginTop: '16px',
    },
    highInputDiv: {
        width: '327px',
        height: '151px',
        marginTop: '16px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'flex-end',
    },
    input: {
        width:'100%',
        backgroundColor:"white",
        boarderRadius: "10px",
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    },
    svg: {
        position: 'relative',
        bottom: 22,
    },
}));

export default function AddItemForm(props) {
    const classes = useStyles()

    const {addNewItem} = props;
    const [id, setId] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [body, setBody] = useState(undefined);
    const missingFields = () => {
        setTitle('');
        setBody('');
        setId('');
    };

    const makeNewItem = (event) =>{
        event.preventDefault();
        if(id !== Number || (title === undefined || body === undefined)){
            return missingFields()
        };
        const post = {
            userId: id,
            title: title,
            body: body
        };
        addNewItem(post);
        setTitle('');
        setBody('');
        setId('');
    };
    return (
        <div className={classes.form}>
            <form>
                <div className={classes.inputDiv}>
                    <TextField value={id} type="number" id="outlined-basic"  onChange={e => setId(e.target.value)}  label="user id" className={classes.input}/>
                </div>
                <div className={classes.inputDiv}>
                    <TextField value={title} id="outlined-basic" onChange={e => setTitle(e.target.value)} label="post title" className={classes.input}/>
                </div>
                <div className={classes.inputDiv}>
                    <TextField value={title} id="outlined-basic" onChange={e => setTitle(e.target.value)} label="post title, here for the design" className={classes.input}/>
                </div>
                <div className={classes.highInputDiv}>
                    <TextField value={body} type="textarea" id="outlined-multiline-static" onChange={e => setBody(e.target.value)} label="post body" multiline rows="5" className={classes.input}/>
                </div>
                <div className={classes.icon} onClick={makeNewItem}>
                    <svg className={classes.svg} width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27 0C12.1126 0 0 12.1116 0 27C0 41.8884 12.1126 54 27 54C41.8874 54 54 41.8884 54 27C54 12.1116 41.8874 0 27 0ZM39.9808 29.0769H29.0769V40.5C29.0769 41.6465 28.1465 42.5769 27 42.5769C25.8535 42.5769 24.9231 41.6465 24.9231 40.5V29.0769H14.0192C12.8728 29.0769 11.9423 28.1465 11.9423 27C11.9423 25.8535 12.8728 24.9231 14.0192 24.9231H24.9231V14.5385C24.9231 13.392 25.8535 12.4615 27 12.4615C28.1465 12.4615 29.0769 13.392 29.0769 14.5385V24.9231H39.9808C41.1272 24.9231 42.0577 25.8535 42.0577 27C42.0577 28.1465 41.1272 29.0769 39.9808 29.0769Z" fill="#FD5842"/>
                    </svg>
                </div>
            </form>
        </div>
    );
}