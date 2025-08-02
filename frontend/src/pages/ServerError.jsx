import React from 'react';
import ErrorPage from './ErrorPage';

const ServerError = () => {
  return <ErrorPage code={500} message="Internal Server Error" />;
};

export default ServerError;