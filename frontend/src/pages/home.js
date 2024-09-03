import React, { useState, useEffect } from 'react';
import { Typography, Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ItemList from '../components/ItemList';
import { getItems, deleteItem } from '../services/api';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Items
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/items/new"
        style={{ marginBottom: '20px' }}
      >
        Add New Item
      </Button>
      <ItemList items={items} onDelete={handleDelete} />
    </Container>
  );
};

export default Home;