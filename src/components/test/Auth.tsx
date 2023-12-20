import React, { ChangeEvent } from 'react';
import { Button, Grid } from '@mui/material';


const Auth = () => {
  //
  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    setAccessToken('');
  }, [])

  React.useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);
    }
  }, [accessToken])

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

  const handleClickRegister = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
      });
  }, [name, email, password])

  const handleClickLogin = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setAccessToken(res.data.accessToken);
      });
  }, [email, password])

  const handleClickReset = React.useCallback(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickRegister}>Register</Button>
        <Button onClick={handleClickLogin}>Login</Button>
        <Button onClick={handleClickReset}>Reset</Button>
      </div>

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

export default Auth;
