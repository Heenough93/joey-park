import React from 'react';
import { Fab, SxProps, useTheme, Zoom } from '@mui/material';


const TopButton = () => {
  //
  const [ isHidden, setIsHidden ] = React.useState<boolean>(false);

  const handleScroll = React.useCallback(() => {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 53) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const theme = useTheme();

  const transitionDuration = React.useMemo(() => ({
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }), [ theme ]);

  const handleClickTop = React.useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);2;

  return (
    <Zoom
      in={isHidden}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${isHidden ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab
        style={{ backgroundColor: '#eab8b8' }}
        sx={{ position: 'fixed', bottom: '16px', right: '16px' }}
        aria-label={'top'}
        onClick={handleClickTop}
      >
        TOP
      </Fab>
    </Zoom>
  );
};

export default TopButton;