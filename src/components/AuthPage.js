import React from 'react';
import { Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/registrations');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, textAlign: 'center' }}>
        <Typography component="h1" variant="h5">
          Добро пожаловать!
        </Typography>
        <Typography variant="body1" style={{ marginBottom: 20 }}>
          Пожалуйста, выберите действие:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginClick}
          style={{ marginBottom: 10 }}
          fullWidth
        >
          Войти
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRegisterClick}
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </Paper>
    </Container>
  );
};

export default AuthPage;

// import React from 'react';
// import { Button, Container, Typography, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
//
// const AuthPage = () => {
//   const navigate = useNavigate();
//
//   const handleRegisterClick = () => {
//     navigate('/registrations');
//   };
//
//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} style={{ padding: 20, textAlign: 'center' }}>
//         <Typography component="h1" variant="h5">
//           Добро пожаловать!
//         </Typography>
//         <Typography variant="body1" style={{ marginBottom: 20 }}>
//           Пожалуйста, выберите действие:
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => window.location.href = 'http://localhost:9000/api/login'}
//           style={{ marginBottom: 10 }}
//           fullWidth
//         >
//           Войти
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           onClick={handleRegisterClick}
//           fullWidth
//         >
//           Зарегистрироваться
//         </Button>
//       </Paper>
//     </Container>
//   );
// };
//
// export default AuthPage;

