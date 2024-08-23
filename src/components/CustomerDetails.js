
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
              <TableCell>Номер</TableCell>
              <TableCell>Валюта</TableCell>
              <TableCell>Баланс</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(customer.accounts || []).map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.number}</TableCell>
                <TableCell>{account.currency}</TableCell>
                <TableCell>{account.balance} {account.currency}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteAccount(customer.id, account.id)}>Delete account</Button>
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
                label="Номер счета"
                name="fromNumber"
                value={accountDetails.fromNumber}
                onChange={handleAccountChange}
                fullWidth
              />
              <TextField
                label="Сумма"
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
                label="Номер счета"
                name="fromNumber"
                value={accountDetails.fromNumber}
                onChange={handleAccountChange}
                fullWidth
              />
              <TextField
                label="Сумма"
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
                label="Номер счета отправления"
                name="fromNumber"
                value={accountDetails.fromNumber}
                onChange={handleAccountChange}
                fullWidth
              />
              <TextField
                label="Номер счета получения"
                name="toNumber"
                value={accountDetails.toNumber}
                onChange={handleAccountChange}
                fullWidth
              />
              <TextField
                label="Сумма"
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
              label="Валюта"
              name="currency"
              value={newAccount.currency}
              onChange={handleNewAccountChange}
              fullWidth
            />
            <TextField
              label="Баланс"
              name="balance"
              value={newAccount.balance}
              onChange={handleNewAccountChange}
              fullWidth
            />
            <Button onClick={() => handleAddAccount(customer.id, newAccount)}>Add account</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomerDetails;
















