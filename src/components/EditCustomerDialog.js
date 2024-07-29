
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const EditCustomerDialog = ({
                              open,
                              customer,
                              onClose,
                              onSave,
                              onChange,
                              addMode = false,
                            }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{addMode ? 'Add Customer' : 'Edit Customer'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={customer?.name || ''}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={customer?.email || ''}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="age"
          label="Age"
          type="number"
          fullWidth
          value={customer?.age || ''}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerDialog;




