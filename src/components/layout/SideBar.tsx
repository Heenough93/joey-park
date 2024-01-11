import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { useSideBarStore } from '../../stores';


const SideBar = () => {
  //
  const { open, openDrawer } = useSideBarStore();

  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken') || '';
    setAccessToken(accessToken);
  }, [])

  const list = () => (
    <Box
      // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={openDrawer( false)}
      onKeyDown={openDrawer( false)}
    >
      <List>
        {['Portfolio'].map((text, index) => (
          <Link key={index} to={''}>
            <ListItem disablePadding>
              <ListItemButton>
                {/*<ListItemIcon>*/}
                {/*  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                {/*</ListItemIcon>*/}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Visitor', 'Message', 'Map'].map((text, index) => (
          <Link key={index} to={text.toLowerCase()}>
            <ListItem disablePadding>
              <ListItemButton>
                {/*<ListItemIcon>*/}
                {/*  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                {/*</ListItemIcon>*/}
                  <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Auth'].map((text, index) => (
          <Link key={index} to={text.toLowerCase()}>
            <ListItem disablePadding>
              <ListItemButton>
                {/*<ListItemIcon>*/}
                {/*  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                {/*</ListItemIcon>*/}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Stock', 'Test', 'My-Map'].map((text, index) => (
          <Link key={index} to={text.toLowerCase()} state={{ accessToken: accessToken }}>
            <ListItem disablePadding>
              <ListItemButton>
                {/*<ListItemIcon>*/}
                {/*  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                {/*</ListItemIcon>*/}
                  <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={'left'}
        open={open}
        onClose={openDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}

export default SideBar;
