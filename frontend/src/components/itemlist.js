import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const ItemList = ({ items, onDelete }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item._id} button component={Link} to={`/items/${item._id}`}>
          <ListItemText primary={item.name} secondary={item.description} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" component={Link} to={`/items/edit/${item._id}`}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item._id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;