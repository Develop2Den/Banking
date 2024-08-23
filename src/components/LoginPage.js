
// import React, { useState } from 'react';
// import { Button, TextField, Container, Typography, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//
//     try {
//       const response = await axios.post('http://localhost:9000/api/login', { email, password });
//
//       if (response.status === 200) {
//         const { role } = response.data;
//         console.log(response.data)
//         // Сохранение роли и email в localStorage
//         localStorage.setItem('role', role);
//         localStorage.setItem('email', email);
//
//         // Переход на страницу в зависимости от роли
//         if (role === 'ADMIN') {
//           navigate('/customers'); // Переход на страницу для админа
//         } else {
//           navigate('/customers'); // Переход на страницу для пользователя
//         }
//       } else {
//         setError('Ошибка авторизации');
//       }
//     } catch (err) {
//       setError('Ошибка подключения к серверу');
//     }
//   };
//
//
//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} style={{ padding: 20 }}>
//         <Typography component="h1" variant="h5">Войти</Typography>
//         <form onSubmit={handleLogin} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             label="Email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             label="Пароль"
//             type="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && <Typography color="error">{error}</Typography>}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             style={{ marginTop: 16 }}
//           >
//             Войти
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// };
//
// export default LoginPage;

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Sending request:', { email, password });
      const response = await axios.post(
        'http://localhost:9000/api/login',
        qs.stringify({ username: email, password }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const id = response.data.content[0].id
        localStorage.setItem("email", email);
        localStorage.setItem("ID", id);
          navigate('/customers');

      } else {
        setError('Ошибка авторизации');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography component="h1" variant="h5">Войти</Typography>
        <form onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
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
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;





