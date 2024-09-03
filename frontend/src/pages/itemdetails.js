import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CardActions, Button, Container, Grid } from '@material-ui/core';
import io from 'socket.io-client';

// Replace with your server URL
const socket = io('http://localhost:3001');

// Sample items list
const items = [
  { id: 1, name: 'Vintage Watch', description: 'A classic timepiece from the 1960s', startingPrice: 100 },
  { id: 2, name: 'Modern Art Painting', description: 'Abstract canvas by up-and-coming artist', startingPrice: 500 },
  { id: 3, name: 'Antique Furniture', description: '19th century mahogany dresser', startingPrice: 300 },
  { id: 4, name: 'Rare Comic Book', description: 'First edition superhero comic in mint condition', startingPrice: 1000 },
  { id: 5, name: 'Sports Memorabilia', description: 'Signed jersey from legendary athlete', startingPrice: 200 },
  { id: 6, name: 'Tech Gadget', description: 'Latest smartphone model, unopened', startingPrice: 800 },
];

function ItemDetails() {
  const [bids, setBids] = useState({});
  const [userBids, setUserBids] = useState({});

  useEffect(() => {
    // Initialize bids
    const initialBids = items.reduce((acc, item) => {
      acc[item.id] = item.startingPrice;
      return acc;
    }, {});
    setBids(initialBids);

    // Listen for bid updates
    socket.on('bidUpdate', (data) => {
      setBids(prevBids => ({
        ...prevBids,
        [data.itemId]: data.amount
      }));
    });

    return () => {
      socket.off('bidUpdate');
    };
  }, []);

  const placeBid = (itemId) => {
    const currentBid = bids[itemId];
    const newBid = currentBid + 10; // Increment by $10
    socket.emit('placeBid', { itemId, amount: newBid });
    setUserBids(prevUserBids => ({
      ...prevUserBids,
      [itemId]: newBid
    }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Auction Items
      </Typography>
      <Grid container spacing={4}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" component="p">
                  Current Bid: ${bids[item.id]}
                </Typography>
                <Typography variant="body2" component="p">
                  Your Bid: ${userBids[item.id] || 0}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => placeBid(item.id)}>
                  Place Bid
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ItemDetails;