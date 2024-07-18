import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, TextField, Button } from '@mui/material';

const CustomerDetails = ({ customer, editMode, actionType, accountDetails, handleAccountChange, handleDeposit, handleWithdraw, handleTransfer, handleAddAccount, handleDeleteAccount }) => {
  const [newAccount, setNewAccount] = useState({ currency: '', balance: '' });

  const handleNewAccountChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  return (
    <Box>
      <Typography variant="h5" component="h3" gutterBottom>
        {customer.name}
      </Typography>
      <Typography variant="body1">Email: {customer.email}</Typography>
      <Typography variant="body1">Age: {customer.age}</Typography>
      <Typography variant="h6" component="h4" gutterBottom>
        Accounts
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.number}</TableCell>
                <TableCell>{account.currency}</TableCell>
                <TableCell>{account.balance} {account.currency}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteAccount(customer.id, account.id)}>Delete Account</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {editMode && (
        <Box>
          {actionType === 'deposit' && (
            <>
              <TextField
                label="From Account Number"
                name="fromNumber"
                value={accountDetails.fromNumber}
                onChange={handleAccountChange}
                fullWidth
              />
              <TextField
                label="Amount"
                name="amount"
                value={accountDetails.amount}
                onChange={handleAccountChange}
                fullWidth
              />
              <Button onClick={handleDeposit}>Deposit</Button>
            </>
          )}
          {actionType === 'withdraw' && (
            <>
              <TextField
                label="From Account Number"
                name="fromNumber"
                value={accountDetails.fromNumber}
                onChange={handleAccountChange}
                fullWidth
              />
              <TextField
                label="Amount"
                name="amount"
                value={accountDetails.amount}
                onChange={handleAccountChange}
                fullWidth
              />
              <Button onClick={handleWithdraw}>Withdraw</Button>
            </>
          )}
          {actionType === 'transfer' && (
            <>
              <TextField
                label="From Account Number"
                name="fromNumber"
                value={accountDetails.fromNumber}
                onChange={handleAccountChange}
                fullWidth
              />
              <TextField
                label="To Account Number"
                name="toNumber"
                value={accountDetails.toNumber}
                onChange={handleAccountChange}
                fullWidth
              />
              <TextField
                label="Amount"
                name="amount"
                value={accountDetails.amount}
                onChange={handleAccountChange}
                fullWidth
              />
              <Button onClick={handleTransfer}>Transfer</Button>
            </>
          )}
          <Box mt={2}>
            <TextField
              label="Currency"
              name="currency"
              value={newAccount.currency}
              onChange={handleNewAccountChange}
              fullWidth
            />
            <TextField
              label="Balance"
              name="balance"
              value={newAccount.balance}
              onChange={handleNewAccountChange}
              fullWidth
            />
            <Button onClick={() => handleAddAccount(customer.id, newAccount)}>Add Account</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomerDetails;












