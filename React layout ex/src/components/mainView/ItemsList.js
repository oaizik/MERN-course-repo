import React, { useState, useEffect } from 'react';
import ListItem from "./items/Item";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    display: {
        width: '100%'
    },
}));

export default function ItemsList(props){
    const classes = useStyles()
    
    const {items, deleteItem, updateItem} = props;
    const [content, setContent] = useState(<div></div>);
    
    useEffect(() => {
        const makeContent = () => {
            const postItems = items.map(item => (
                <div key={item.id}>
                    <ListItem
                        item={item}
                        deleteItem={deleteItem}
                        updateItem={updateItem}
                    >
                        <div>
                            {item.title}
                        </div>
                    </ListItem>
                </div>
            ));
            setContent(postItems);
        };
        makeContent();
    }, [deleteItem, updateItem, items]);
    return (
        <div className={classes.display}>
            {content}
        </div> 
    );
};
