import React from 'react';
import ErrorPage from './ErrorPage';

const NotFound = () => {
  return <ErrorPage code={404} message="Page Not Found" />;
};

export default NotFound;