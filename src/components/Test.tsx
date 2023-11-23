import React, { ChangeEvent } from 'react';
import { Button } from '@mui/material';


const Test = () => {

  const [token, setToken] = React.useState<string>('');
  const [id, setId] = React.useState<string>('');

  const handleChangeId = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  }, [])


  /**
   * auth
   * */
  const handleClickRegister = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "name": "user11",
        "email": "user11@test.com",
        "password": "qweqwe"
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
      });
  }, [])

  const handleClickLoginAdmin = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "email": "admin@bookie.local",
        "password": "password123"
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setToken(res.data.accessToken);
      });
  }, [])

  const handleClickLoginUser = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "email": "user11@test.com",
        "password": "qweqwe"
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setToken(res.data.accessToken);
      });
  }, [])

  /**
   * user
   * */
  const handleClickUserList = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'users', {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": token },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('User List', res.data);
      });
  }, [token])

  const handleClickUser = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'users/' + id, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": token },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('User', res.data);
      });
  }, [token])

  const handleClickUserRegister = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'users', {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": token },
      body: JSON.stringify({
        "name": "user11",
        "password": "qweqwe",
        "email": "user11@test.com"
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('User Register', res.data);
      });
  }, [token])

  const handleClickUserModify = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'users/' + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": token },
      body: JSON.stringify({
        "name": "user12",
        "password": "qweqwe",
        "email": "user12@test.com"
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('User Modify', res.data);
      });
  }, [token])

  const handleClickUserRemove = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'users/' + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": token },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('User Remove', res.data);
      });
  }, [token])

  /**
   * author
   * */
  const handleClickAuthorList = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'authors', {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": token },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('Author List', res.data);
      });
  }, [token])

  const handleClickAuthor = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'authors/' + id, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": token },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('Author', res.data);
      });
  }, [token])

  const handleClickAuthorRegister = React.useCallback(async () => {

  }, [token])

  const handleClickAuthorModify = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }

  }, [token])

  const handleClickAuthorRemove = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }

  }, [token])

  /**
   * book
   * */
  const handleClickBookList = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'books', {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": token },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('Book List', res.data);
      });
  }, [token])

  const handleClickBook = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'books/' + id, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": token },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('Book', res.data);
      });
  }, [token])

  const handleClickBookRegister = React.useCallback(async () => {

  }, [token])

  const handleClickBookModify = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }

  }, [token])

  const handleClickBookRemove = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }

  }, [token])

    return (
      <>
        <div>
          <Button onClick={handleClickRegister}>Register</Button>
          <Button onClick={handleClickLoginAdmin}>Login Admin</Button>
          <Button onClick={handleClickLoginUser}>Login User</Button>
        </div>
        <div>
          <input onChange={handleChangeId} value={id} />
        </div>
        <div>
          <Button onClick={handleClickUserList}>User List</Button>
          <Button onClick={() => handleClickUser(id)}>User</Button>
          <Button onClick={handleClickUserRegister}>User Register</Button>
          <Button onClick={() => handleClickUserModify(id)}>User Modify</Button>
          <Button onClick={() => handleClickUserRemove(id)}>User Remove</Button>
        </div>
        <div>
          <Button onClick={handleClickAuthorList}>Author List</Button>
          <Button onClick={() => handleClickAuthor(id)}>Author</Button>
          <Button onClick={handleClickAuthorRegister}>Author Register</Button>
          <Button onClick={() => handleClickAuthorModify(id)}>Author Modify</Button>
          <Button onClick={() => handleClickAuthorRemove(id)}>Author Remove</Button>
        </div>
        <div>
          <Button onClick={handleClickBookList}>Book List</Button>
          <Button onClick={() => handleClickBook(id)}>Book</Button>
          <Button onClick={handleClickBookRegister}>Book Register</Button>
          <Button onClick={() => handleClickBookModify(id)}>Book Modify</Button>
          <Button onClick={() => handleClickBookRemove(id)}>Book Remove</Button>
        </div>
      </>
    );
}

export default Test;
