import React from 'react';
import { Button, Divider, Grid } from '@mui/material';

import { useDialog } from '../../hooks';


const Author = () => {
  //
  const { confirm, alert } = useDialog();

  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken') || '';
    setAccessToken(accessToken);
  }, [])

  const [authors, setAuthors] = React.useState<any[]>([]);
  const [selectedAuthor, setSelectedAuthor] = React.useState<any | null>(null);

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [bio, setBio] = React.useState<string>('');

  React.useEffect(() => {
    setName(selectedAuthor ? selectedAuthor.name : '');
    setEmail(selectedAuthor ? selectedAuthor.email : '');
    setBio(selectedAuthor ? selectedAuthor.bio : '');
  }, [selectedAuthor])

  const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, [])

  const handleChangeEmail = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, [])

  const handleChangeBio = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  }, [])

  const handleClickReset = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    setAuthors([]);
    setSelectedAuthor(null);
    setName('');
    setEmail('');
    setBio('');
  }, [])

  const getAuthors = React.useCallback(async (id?: string) => {
    await fetch(process.env.REACT_APP_BASE_URL + 'authors' + `/${id ? id : ''}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        id ? setSelectedAuthor(res.data) : setAuthors(res.data);
      });
  }, [accessToken])

  const handleClickAuthorList = React.useCallback(async () => {
    await getAuthors();
  }, [getAuthors])

  const handleClickAuthor = React.useCallback(async (id: string) => {
    if (!id) {
      await alert('id is empty.');
      return;
    }

    await getAuthors(id);
  }, [getAuthors])

  const handleClickAuthorRegister = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    await fetch(process.env.REACT_APP_BASE_URL + 'authors', {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
      body: JSON.stringify({ name, email, bio })
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedAuthor(null);
          await getAuthors();
        }
      });
  }, [accessToken, name, email, bio])

  const handleClickAuthorModify = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedAuthor) {
      await alert('You should select a author first.');
      return;
    }

    await fetch(process.env.REACT_APP_BASE_URL + 'authors/' + selectedAuthor.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
      body: JSON.stringify({ name, email, bio })
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedAuthor(null);
          await getAuthors();
        }
      });
  }, [selectedAuthor, accessToken, name, email, bio])

  const handleClickAuthorRemove = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedAuthor) {
      await alert('You should select a author first.');
      return;
    }

    await fetch(process.env.REACT_APP_BASE_URL + 'authors/' + selectedAuthor.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedAuthor(null);
          await getAuthors();
        }
      });
  }, [selectedAuthor, accessToken])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickReset}>Reset</Button>
        <Button onClick={handleClickAuthorList}>Author List</Button>
        <Button onClick={handleClickAuthorRegister}>Author Register</Button>
        <Button onClick={handleClickAuthorModify}>Author Modify</Button>
        <Button onClick={handleClickAuthorRemove}>Author Remove</Button>
      </div>
      <Divider />
      <div style={{ height: 200 }}>
        {authors.map((author, index) => {
          return (
            <div key={index} onClick={() => handleClickAuthor(author.id)}>
              {`NAME: ${author.name} / EMAIL: ${author.email} / BIO: ${author.bio}`}
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
          BIO
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeBio} value={bio} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Author;
