import React, { ChangeEvent } from 'react';
import { Button, Divider, Grid } from '@mui/material';


const Author = () => {
  //
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

  const handleChangeName = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, [])

  const handleChangeEmail = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, [])

  const handleChangeBio = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  }, [])

  const handleClickReset = React.useCallback(() => {
    setAuthors([]);
    setSelectedAuthor(null);
    setName('');
    setEmail('');
    setBio('');
  }, [])

  const handleClickAuthorList = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'authors', {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setAuthors(res.data);
      });
  }, [accessToken])

  const handleClickAuthor = React.useCallback(async (id: string) => {
    if (!id) {
      alert('id is empty.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'authors/' + id, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setSelectedAuthor(res.data);
      });
  }, [accessToken])

  const handleClickAuthorRegister = React.useCallback(async () => {
    await fetch(process.env.REACT_APP_BASE_URL + 'authors', {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
      body: JSON.stringify({ name, email, bio })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setSelectedAuthor(null);
      })
      .then(async () => {
        await handleClickAuthorList();
      });
  }, [accessToken, name, email, bio])

  const handleClickAuthorModify = React.useCallback(async () => {
    if (!selectedAuthor) {
      alert('You should select a author first.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'authors/' + selectedAuthor.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
      body: JSON.stringify({ name, email, bio })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setSelectedAuthor(null);
      })
      .then(async () => {
        await handleClickAuthorList();
      });
  }, [selectedAuthor, accessToken, name, email, bio])

  const handleClickAuthorRemove = React.useCallback(async () => {
    if (!selectedAuthor) {
      alert('You should select a author first.');
      return;
    }
    await fetch(process.env.REACT_APP_BASE_URL + 'authors/' + selectedAuthor.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setSelectedAuthor(null);
      })
      .then(async () => {
        await handleClickAuthorList();
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
