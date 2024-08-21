// import React from 'react';
// import { Container } from '@mui/material';
// import CustomerList from './components/CustomerList';
//
// function App() {
//   return (
//     <Container>
//       <CustomerList />
//     </Container>
//   );
// }
//
// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CustomerList from "./components/CustomerList";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrations" element={<RegisterPage />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;


