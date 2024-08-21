
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Извините, страница не найдена.</p>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
        Вернуться на главную страницу
      </Link>
    </div>
  );
};

export default NotFoundPage;
