
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Button,
  Pagination,
  Stack
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Delete, Edit, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import EditCustomerDialog from './EditCustomerDialog';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [accountDetails, setAccountDetails] = useState({ fromNumber: '', toNumber: '', amount: '' });
  const [editCustomer, setEditCustomer] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', age: '', phoneNumber: '', password: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/customers', {
        withCredentials: true,
        params: {
          page: page - 1,
        }
      });
      console.log('Fetched customers:', response.data);

      if (Array.isArray(response.data.content)) {
        setCustomers(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        console.error('Полученные данные не содержат массив клиентов:', response.data);
      }
    } catch (error) {
      console.error('Произошла ошибка при загрузке клиентов!', error);
    }
  }, [page]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleLogout = async () => {
    try {
    const response = await axios.post('http://localhost:9000/api/logout', {}, {
      withCredentials: true,
      maxRedirects: 0
    });
    if (response.status === 200) {
      console.log('Logout response:', response);
      localStorage.removeItem("email");
      navigate("/");
    }
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error.response ? error.response.data : error.message);
    }
  };


  const handleToggle = (customerId) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [customerId]: !prevOpen[customerId]
    }));
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:9000/api/customers/${customerId}`, {
        withCredentials: true,
      });
      await fetchCustomers();
    } catch (error) {
      console.error('There was an error deleting the customer!', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditCustomer({ ...customer });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditCustomer(null);
  };

  const handleSaveCustomer = async () => {
    try {
      await axios.put(`http://localhost:9000/api/customers/${editCustomer.id}`, editCustomer, {
        withCredentials: true,
      });
      fetchCustomers();
      handleEditDialogClose();
    } catch (error) {
      console.error('There was an error updating the customer!', error);
    }
  };

  const handleChangeEditCustomer = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = (type, customer) => {
    if (open[customer.id]) {
      setEditMode(true);
      setCurrentCustomer(customer);
      setActionType(type);

      if (type === 'deposit' || type === 'withdraw') {
        setAccountDetails({
          fromNumber: customer.accounts.length > 0 ? customer.accounts[0].number : '',
          toNumber: '',
          amount: ''
        });
      } else if (type === 'transfer') {
        setAccountDetails({
          fromNumber: '',
          toNumber: customer.accounts.length > 0 ? customer.accounts[0].number : '',
          amount: ''
        });
      }
    }
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value
    });
  };

  const handleDeposit = async () => {
    try {
      await axios.post(`http://localhost:9000/api/accounts/deposit`, null, {
        withCredentials: true,
        params: {
          number: accountDetails.fromNumber,
          amount: accountDetails.amount
        }
      });
      fetchCustomers();
      resetState(); // Reset state after successful action
    } catch (error) {
      console.error('There was an error depositing to the account!', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.post(`http://localhost:9000/api/accounts/withdraw`, null, {
        withCredentials: true,
        params: {
          number: accountDetails.fromNumber,
          amount: accountDetails.amount
        }
      });
      fetchCustomers();
      resetState(); // Reset state after successful action
    } catch (error) {
      console.error('There was an error withdrawing from the account!', error);
    }
  };

  const handleTransfer = async () => {
    try {
      await axios.post(`http://localhost:9000/api/accounts/transfer`, null, {
        withCredentials: true,
        params: {
          fromNumber: accountDetails.fromNumber,
          toNumber: accountDetails.toNumber,
          amount: accountDetails.amount
        }
      });
      fetchCustomers();
      resetState(); // Reset state after successful action
    } catch (error) {
      console.error('There was an error transferring the amount!', error);
    }
  };

  const handleAddAccount = async (customerId, newAccount) => {
    try {
      await axios.post(`http://localhost:9000/api/customers/${customerId}/accounts`, newAccount,{
        withCredentials: true,
      });
      console.log('Account added:', newAccount);
      fetchCustomers();
      resetState();
    } catch (error) {
      console.error('There was an error adding the account!', error);
    }
  };

  const handleDeleteAccount = async (customerId, accountId) => {
    try {
      await axios.delete(`http://localhost:9000/api/accounts/${accountId}`, {
        withCredentials: true,
      });
      fetchCustomers();
    } catch (error) {
      console.error('There was an error deleting the account!', error);
    }
  };

  const handleAddCustomer = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewCustomer({ name: '', email: '', age: '', phoneNumber: '', password: '' });
  };

  const handleSaveNewCustomer = async () => {
    try {
      await axios.post('http://localhost:9000/api/customers', newCustomer, {
        withCredentials: true,
      });
      fetchCustomers();
      handleAddDialogClose();
    } catch (error) {
      console.error('There was an error adding the new customer!', error);
    }
  };

  const handleChangeNewCustomer = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const resetState = () => {
    setEditMode(false);
    setCurrentCustomer(null);
    setActionType(null);
    setAccountDetails({ fromNumber: '', toNumber: '', amount: '' });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, marginTop: 2, marginRight: 5 }}>
        <Button variant="contained" color="primary" onClick={handleLogout} startIcon={<Logout />}>
          Logout
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell colSpan={5} align="right">
                <Button variant="contained" color="primary" onClick={handleAddCustomer}>
                  Add Customer
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <React.Fragment key={customer.id}>
                <TableRow>
                  <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleToggle(customer.id)}>
                      {open[customer.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.age}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleEditCustomer(customer)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDeleteCustomer(customer.id)}>
                      <Delete />
                    </IconButton>
                    <Button onClick={() => handleAction('deposit', customer)} disabled={!open[customer.id]}>Deposit</Button>
                    <Button onClick={() => handleAction('withdraw', customer)} disabled={!open[customer.id]}>Withdraw</Button>
                    <Button onClick={() => handleAction('transfer', customer)} disabled={!open[customer.id]}>Transfer</Button>
                    <Button onClick={() => handleAction('addAccount', customer)} disabled={!open[customer.id]}>Add Account</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open[customer.id]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <CustomerDetails
                          customer={customer}
                          editMode={editMode && currentCustomer && currentCustomer.id === customer.id}
                          actionType={actionType}
                          accountDetails={accountDetails}
                          handleAccountChange={handleAccountChange}
                          handleDeposit={handleDeposit}
                          handleWithdraw={handleWithdraw}
                          handleTransfer={handleTransfer}
                          handleAddAccount={handleAddAccount}
                          handleDeleteAccount={handleDeleteAccount}
                        />
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2, alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
      <EditCustomerDialog
        open={addDialogOpen}
        customer={newCustomer}
        onClose={handleAddDialogClose}
        onSave={handleSaveNewCustomer}
        onChange={handleChangeNewCustomer}
        text={"Add Customer"}
      />
      <EditCustomerDialog
        open={editDialogOpen}
        customer={editCustomer}
        onClose={handleEditDialogClose}
        onSave={handleSaveCustomer}
        onChange={handleChangeEditCustomer}
        text={"Edit Customer"}
      />
    </div>
  );
};

export default CustomerList;


















