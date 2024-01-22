import React from 'react';
import { Button, Divider, Grid } from '@mui/material';

import { useDialog } from '../../hooks';


const User = () => {
  //
  const { confirm, alert } = useDialog();

  const [ accessToken, setAccessToken ] = React.useState<string>('');

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken') || '';
    setAccessToken(accessToken);
  }, []);

  const [ users, setUsers ] = React.useState<any[]>([]);
  const [ selectedUser, setSelectedUser ] = React.useState<any | null>(null);

  const [ name, setName ] = React.useState<string>('');
  const [ email, setEmail ] = React.useState<string>('');
  const [ password, setPassword ] = React.useState<string>('');
  const [ role, setRole ] = React.useState<1 | 2>(2);

  React.useEffect(() => {
    setName(selectedUser ? selectedUser.name : '');
    setEmail(selectedUser ? selectedUser.email : '');
    setPassword(selectedUser ? selectedUser.password : '');
    setRole(selectedUser ? selectedUser.role : 2);
  }, [ selectedUser ]);

  const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleChangeEmail = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handleChangePassword = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const handleChangeRole = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(Number(event.target.value) as 1 | 2);
  }, []);

  const handleClickReset = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    setUsers([]);
    setSelectedUser(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole(2);
  }, []);

  const getUsers = React.useCallback(async (id?: string) => {
    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/users/${id ? id : ''}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        id ? setSelectedUser(res.data) : setUsers(res.data);
      });
  }, [ accessToken ]);

  const handleClickUserList = React.useCallback(async () => {
    await getUsers();
  }, [ getUsers ]);

  const handleClickUser = React.useCallback(async (id: string) => {
    if (!id) {
      await alert('id is empty.');
      return;
    }

    await getUsers(id);
  }, [ getUsers ]);

  const handleClickUserRegister = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
      body: JSON.stringify({ name, email, password, role }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedUser(null);
          await getUsers();
        }
      });
  }, [ accessToken, name, email, password, role ]);

  const handleClickUserModify = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedUser) {
      await alert('You should select a user first.');
      return;
    }

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/users/${selectedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
      body: JSON.stringify({ name, email, password, role }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedUser(null);
          await getUsers();
        }
      });
  }, [ selectedUser, accessToken, name, email, password, role ]);

  const handleClickUserRemove = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedUser) {
      await alert('You should select a user first.');
      return;
    }

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/users/${selectedUser.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedUser(null);
          await getUsers();
        }
      });
  }, [ selectedUser, accessToken ]);

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
          );
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
        <Grid item xs={6} md={4}>
          ROLE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeRole} value={role} />
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
