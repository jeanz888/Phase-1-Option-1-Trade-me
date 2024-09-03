import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const ItemForm = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default ItemForm;