import React from 'react';
import { Button, Grid } from '@mui/material';


const User = () => {
  //
  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken') || '';
    setAccessToken(accessToken);
  }, [])

  const [users, setUsers] = React.useState<any[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);


  const handleClickUserList = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'users', {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setUsers(res.data);
      });
  }, [accessToken])

  const handleClickUser = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'users/' + id, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setSelectedUser(res.data);
      });
  }, [accessToken])

  const handleClickUserRegister = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'users', {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
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
  }, [accessToken])

  const handleClickUserModify = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'users/' + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
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
  }, [accessToken])

  const handleClickUserRemove = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'users/' + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        console.log('User Remove', res.data);
      });
  }, [accessToken])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickUserList}>User List</Button>
        {/*<Button onClick={handleClickUserRegister}>User Register</Button>*/}
        {/*<Button onClick={() => handleClickUserModify(id)}>User Modify</Button>*/}
        {/*<Button onClick={() => handleClickUserRemove(id)}>User Remove</Button>*/}
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          NAME
        </Grid>
        <Grid item xs={6} md={8}>
          {selectedUser.name}
          {/*<input onChange={handleChangeName} value={name} />*/}
        </Grid>
        <Grid item xs={6} md={4}>
          EMAIL
        </Grid>
        <Grid item xs={6} md={8}>
          {selectedUser.email}
          {/*<input onChange={handleChangeEmail} value={email} />*/}
        </Grid>
        <Grid item xs={6} md={4}>
          PASSWORD
        </Grid>
        <Grid item xs={6} md={8}>
          {selectedUser.password}
          {/*<input onChange={handleChangePassword} value={password} />*/}
        </Grid>
      </Grid>

      {users.map((user, index) => {
        return (
          <div key={index} onClick={() => handleClickUser(user.id)}>
            {`NAME: ${user.name} / EMAIL: ${user.email} / ROLE: ${user.role}`}
          </div>
        )
      })}
    </div>
  );
}

export default User;
