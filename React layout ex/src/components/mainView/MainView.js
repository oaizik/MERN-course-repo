import React, {useEffect, useState} from 'react';
import ItemsList from './ItemsList';
import AddItemForm from "./Form";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container:{
        width: '90%',
        height: '700px',
        margin:'0 auto',
        backgroundImage: `url(${process.env.PUBLIC_URL+"/background.svg"})`,
        // backgroundRepeat: "no-repeat",
        // backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        border: '1px solid #171932',
        boxSizing: 'border-box',
        boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    form:{
        width: '362px',
        height: '378px',
        marginTop: '108px',
        marginLeft: '100px',
    },
    list:{
        width: '362px',
        height: '378px',
        marginTop: '108px',
        overflowY: 'scroll',
        marginRight: '100px',
        borderRadius: '10px',
    },
    photo: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '20%',
        height: '350px',
        zIndex: 1,
        borderRadius: '10px',
        position: 'relative',
        bottom: 22,
        [theme.breakpoints.down(1400)]: {
            display: 'none',
        },
    },
}));
export default function Main() {
    const classes = useStyles()

    const [items, setItems] = useState([]);
    
    const generateId = () => {
        console.log(items.length +1);
        return items.length +1;
    };
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => { response.json().then(json=>{ setItems(json) }) })
            .catch(err => {
                console.log.error();
            });
    },[setItems]);

    const deleteItem = (itemId) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`, {
            method: 'DELETE'
        });
        setItems(prevState => prevState.filter( item =>item.id !== itemId));
    };

    const updateItem = (itemBody, id) =>{
        const updatedItem = items.find(value => value.id === id);
        updatedItem.body = itemBody;
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify(updatedItem),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(json => console.log(json));
        setItems(prevState => prevState.map(item => item.id === id ? updatedItem : item))
    };

    const addNewItem = (item) =>{
        item.id = generateId();
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(json => console.log(json));
        setItems(prevState =>([...prevState, item]));
    };

    return (
        <div  className={classes.container}>
            <div className={classes.form}>
                <AddItemForm addNewItem={addNewItem}/>
            </div>
            <div className={classes.photo}>
                
            </div>
            <div className={classes.list}>
                <ItemsList items={items} deleteItem={deleteItem}  updateItem={updateItem}/>
            </div>
        </div>
    );
};
