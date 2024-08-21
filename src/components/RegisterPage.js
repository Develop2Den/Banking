import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:9000/api/auth', {
        name,
        email,
        password: { password },
        age,
        phoneNumber,
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Ошибка регистрации');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography component="h1" variant="h5">Зарегистрироваться</Typography>
        <form onSubmit={handleRegister} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Возраст"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Номер телефона"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;

