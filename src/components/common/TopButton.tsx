import React from 'react';
import { Fab, SxProps, useTheme, Zoom } from '@mui/material';


const TopButton = () => {
  //
  const [ hidden, setHidden ] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = React.useCallback(() => {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 53) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, []);

  const handleClickTop = React.useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // const MyComponent = styled('div')({
  //   root: {
  //     width: '50px',
  //     display: 'flex',
  //     position: 'fixed',
  //     right: '16px',
  //     bottom: '120px',
  //     zIndex: 50,
  //     transition: 'opacity .8s, transform .8s',
  //     transform: 'translateY(0)',
  //     opacity: 1,
  //     '& button': {
  //       borderRadius: '50%',
  //       minWidth: '50px !important',
  //       height: '50px !important',
  //       '& .MuiButton-label': {
  //         display: 'flex',
  //         justifyContent: 'flex-start',
  //         alignItems: 'center',
  //         flexDirection: 'column',
  //         lineHeight: '1.1em',
  //         fontSize: 'clamp(1.4rem, 3.4vw, 1.8rem)',
  //         '& svg': {
  //           fontSize: 'clamp(1.8rem, 3.8vw, 2.2rem)',
  //           marginTop: '-5px',
  //         },
  //       },
  //     },
  //   },
  //   hide: {
  //     opacity: 0,
  //     right: '-200px',
  //     transform: 'translate(-20px)',
  //   },
  // });

  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabStyle = {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
  };

  const fab = {
    backgroundColor: '#eab8b8' as const,
    sx: fabStyle as SxProps,
    icon: 'TOP',
    // icon: <AddIcon />,
    label: 'top',
  };

  return (
    <Zoom
      in={hidden}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${hidden ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab style={{ backgroundColor: fab.backgroundColor }} sx={fab.sx} aria-label={fab.label} onClick={handleClickTop}>
        {fab.icon}
      </Fab>
    </Zoom>
  );
};

export default TopButton;