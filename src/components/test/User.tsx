import React, { ChangeEvent } from 'react';
import { Button, Divider, Grid } from '@mui/material';


const User = () => {
  //
  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken') || '';
    setAccessToken(accessToken);
  }, [])

  const [users, setUsers] = React.useState<any[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);

  React.useEffect(() => {
    setName(selectedUser ? selectedUser.name : '');
    setEmail(selectedUser ? selectedUser.email : '');
    setPassword(selectedUser ? selectedUser.password : '');
  }, [selectedUser])

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleChangeName = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, [])

  const handleChangeEmail = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, [])

  const handleChangePassword = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, [])

  const handleClickReset = React.useCallback(() => {
    setUsers([]);
    setSelectedUser(null);
    setName('');
    setEmail('');
    setPassword('');
  }, [])

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
      body: JSON.stringify({ name, password, email })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setSelectedUser(null);
      })
      .then(async () => {
        await handleClickUserList();
      });
  }, [accessToken, name, password, email])

  const handleClickUserModify = React.useCallback(async () => {
    if (!selectedUser) {
      alert('You should select a user first.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'users/' + selectedUser.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
      body: JSON.stringify({ name, password, email })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setSelectedUser(null);
      })
      .then(async () => {
        await handleClickUserList();
      });
  }, [selectedUser, accessToken, name, password, email])

  const handleClickUserRemove = React.useCallback(async () => {
    if (!selectedUser) {
      alert('You should select a user first.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'users/' + selectedUser.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setSelectedUser(null);
      })
      .then(async () => {
        await handleClickUserList();
      });
  }, [selectedUser, accessToken])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickReset}>Reset</Button>
        <Button onClick={handleClickUserList}>User List</Button>
        <Button onClick={handleClickUserRegister}>User Register</Button>
        <Button onClick={handleClickUserModify}>User Modify</Button>
        <Button onClick={handleClickUserRemove}>User Remove</Button>
      </div>
      <Divider />
      <div style={{ height: 200 }}>
        {users.map((user, index) => {
          return (
            <div key={index} onClick={() => handleClickUser(user.id)}>
              {`NAME: ${user.name} / EMAIL: ${user.email} / ROLE: ${user.role}`}
            </div>
          )
        })}
      </div>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          NAME
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeName} value={name} />
        </Grid>
        <Grid item xs={6} md={4}>
          EMAIL
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeEmail} value={email} />
        </Grid>
        <Grid item xs={6} md={4}>
          PASSWORD
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangePassword} value={password} />
        </Grid>
      </Grid>
    </div>
  );
}

export default User;
