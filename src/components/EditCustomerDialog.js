
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditCustomerDialog = ({ open, customer, onClose, onChange, onSave, text }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{text}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={customer?.name || ''}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={customer?.email || ''}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Age"
          name="age"
          value={customer?.age || ''}
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerDialog;



