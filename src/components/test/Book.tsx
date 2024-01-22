import React from 'react';
import { Button, Divider, Grid } from '@mui/material';

import { useDialog } from '../../hooks';


const Book = () => {
  //
  const { confirm, alert } = useDialog();

  const [ accessToken, setAccessToken ] = React.useState<string>('');

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken') || '';
    setAccessToken(accessToken);
  }, []);

  const [ authors, setAuthors ] = React.useState<any[]>([]);

  const getAuthors = React.useCallback(async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/authors/with-books`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setAuthors(res.data);
      });
  }, [ accessToken ]);

  React.useEffect(() => {
    (getAuthors)();
  }, []);

  const [ books, setBooks ] = React.useState<any[]>([]);
  const [ selectedBook, setSelectedBook ] = React.useState<any | null>(null);

  const [ title, setTitle ] = React.useState<string>('');
  const [ description, setDescription ] = React.useState<string>('');
  const [ authorId, setAuthorId ] = React.useState<number>(0);
  const [ price, setPrice ] = React.useState<number>(0);
  const [ category, setCategory ] = React.useState<string>('');

  React.useEffect(() => {
    setTitle(selectedBook ? selectedBook.title : '');
    setDescription(selectedBook ? selectedBook.description : '');
    setAuthorId(selectedBook ? selectedBook.authorId : 0);
    setPrice(selectedBook ? selectedBook.price : 0);
    setCategory(selectedBook ? selectedBook.category : '');
  }, [ selectedBook ]);

  const handleChangeTitle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  const handleChangeDescription = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }, []);

  const handleChangeAuthor = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setAuthorId(Number(event.target.value));
  }, []);

  const handleChangePrice = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  }, []);

  const handleChangeCategory = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  }, []);

  const handleClickReset = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    setBooks([]);
    setSelectedBook(null);
    setTitle('');
    setDescription('');
    setAuthorId(0);
    setPrice(0);
    setCategory('');
  }, []);

  const getBooks = React.useCallback(async (id?: string) => {
    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/books/${id ? id : ''}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        id ? setSelectedBook(res.data) : setBooks(res.data);
      });
  }, [ accessToken ]);

  const handleClickBookList = React.useCallback(async () => {
    await getBooks();
  }, [ getBooks ]);

  const handleClickBook = React.useCallback(async (id: string) => {
    if (!id) {
      await alert('id is empty.');
      return;
    }

    await getBooks(id);
  }, [ getBooks ]);

  const handleClickBookRegister = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
      body: JSON.stringify({ title, description, authorId, price, category }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedBook(null);
          await getBooks();
        }
      });
  }, [ accessToken, title, description, authorId, price, category ]);

  const handleClickBookModify = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedBook) {
      await alert('You should select a book first.');
      return;
    }

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/books/${selectedBook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
      body: JSON.stringify({ title, description, authorId, price, category }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedBook(null);
          await getBooks();
        }
      });
  }, [ selectedBook, accessToken, title, description, authorId, price, category ]);

  const handleClickBookRemove = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedBook) {
      await alert('You should select a book first.');
      return;
    }

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/books/${selectedBook.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(res.message);
        if (ok) {
          setSelectedBook(null);
          await getBooks();
        }
      });
  }, [ selectedBook, accessToken ]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickReset}>Reset</Button>
        <Button onClick={handleClickBookList}>Book List</Button>
        <Button onClick={handleClickBookRegister}>Book Register</Button>
        <Button onClick={handleClickBookModify}>Book Modify</Button>
        <Button onClick={handleClickBookRemove}>Book Remove</Button>
      </div>
      <Divider />
      <div style={{ height: 200 }}>
        {books.map((book, index) => {
          return (
            <div key={index} onClick={() => handleClickBook(book.id)}>
              {`TITLE: ${book.title} / DESCRIPTION: ${book.description} / AUTHOR_ID: ${book.authorId} / PRICE: ${book.price} / CATEGORY: ${book.category}`}
            </div>
          );
        })}
      </div>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          TITLE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeTitle} value={title} />
        </Grid>
        <Grid item xs={6} md={4}>
          DESCRIPTION
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeDescription} value={description} />
        </Grid>
        <Grid item xs={6} md={4}>
          AUTHOR
        </Grid>
        <Grid item xs={6} md={8}>
          <select style={{ width: '177px' }} onChange={handleChangeAuthor} value={authorId}>
            <option value={0}>--select--</option>
            {authors.map((author) => {
              return (
                <option value={author.id}>{author.name}</option>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={6} md={4}>
          PRICE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangePrice} value={price} />
        </Grid>
        <Grid item xs={6} md={4}>
          CATEGORY
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeCategory} value={category} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Book;
