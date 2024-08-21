
// import React from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
// } from '@mui/material';
//
// const EditCustomerDialog = ({
//                               open,
//                               customer,
//                               onClose,
//                               onSave,
//                               onChange,
//                               addMode = false,
//                             }) => {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>{addMode ? 'Add Customer' : 'Edit Customer'}</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="name"
//           label="Name"
//           type="text"
//           fullWidth
//           value={customer?.name || ''}
//           onChange={onChange}
//         />
//         <TextField
//           margin="dense"
//           name="email"
//           label="Email"
//           type="email"
//           fullWidth
//           value={customer?.email || ''}
//           onChange={onChange}
//         />
//         <TextField
//           margin="dense"
//           name="age"
//           label="Age"
//           type="number"
//           fullWidth
//           value={customer?.age || ''}
//           onChange={onChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={onSave} color="primary">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
//
// export default EditCustomerDialog;

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditCustomerDialog = ({ open, customer, onClose, onSave, onChange, text, addMode = false }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{addMode ? 'Add Customer' : 'Edit Customer'}</DialogTitle>
      <DialogTitle>{text}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={customer?.name || ''}
          onChange={onChange}
          type="text"
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={customer?.email || ''}
          onChange={onChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={customer?.age || ''}
          onChange={onChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="PhoneNumber"
          name="phoneNumber"
          type="number"
          value={customer?.phoneNumber || ''}
          onChange={onChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={customer?.password || ''}
          onChange={onChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
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



