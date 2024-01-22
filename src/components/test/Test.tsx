import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Test = () => {
  //
  const navigate = useNavigate();

  const handleClickUser = React.useCallback(() => {
    navigate('user');
  }, [ navigate ]);

  const handleClickAuthor = React.useCallback(() => {
    navigate('author');
  }, [ navigate ]);

  const handleClickBook = React.useCallback(() => {
    navigate('book');
  }, [ navigate ]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={handleClickUser}>User</Button>
      <Button onClick={handleClickAuthor}>Author</Button>
      <Button onClick={handleClickBook}>Book</Button>
    </div>
  );
};

export default Test;
