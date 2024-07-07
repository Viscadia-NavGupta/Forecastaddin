import { makeStyles } from '@mui/styles';

export const useStyles15 = makeStyles({
  root: {
    display: 'flex',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: 260,
    background: '#11101d',
    zIndex: 100,
    transition: 'all 0.5s ease',
    overflow: 'hidden',
    '&.close': {
      width: 78,
    },
  },
  logoDetails: {
    height: 60,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    '& i': {
      fontSize: 30,
      color: '#fff',
    },
    '& .logo_name': {
      fontSize: 22,
      color: '#fff',
      fontWeight: 600,
      marginLeft: 10,
      transition: '0.3s ease',
    },
    '&.close .logo_name': {
      opacity: 0,
      pointerEvents: 'none',
    },
  },
  navLinks: {
    padding: '30px 0 150px 0',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  linkItem: {
    position: 'relative',
    '&:hover': {
      backgroundColor: '#1d1b31',
    },
    '&:hover $tooltip': {
      display: 'block',
    },
  },
  listItemIcon: {
    minWidth: '40px',
    color: '#fff',
  },
  listItemText: {
    color: '#fff',
    display: 'block',
    opacity: 1,
    transition: 'opacity 0.5s ease',
    '&.collapsedText': {
      display: 'none',
      opacity: 0,
    },
  },
  tooltip: {
    display: 'none',
    position: 'absolute',
    left: '80px',
    background: '#fff',
    color: '#11101d',
    padding: '5px 10px',
    borderRadius: '5px',
    zIndex: 1,
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  },
  subMenu: {
    paddingLeft: 30,
    '& .MuiListItemText-root': {
      color: '#fff',
    },
  },
  profileDetails: {
    position: 'absolute',
    bottom: 0,
    width: 260,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#1d1b31',
    padding: '12px 0',
    transition: 'all 0.5s ease',
    '&.close': {
      width: 78,
    },
    '& img': {
      height: 52,
      width: 52,
      objectFit: 'cover',
      borderRadius: 16,
      margin: '0 14px 0 12px',
      background: '#1d1b31',
    },
    '&.close img': {
      padding: 10,
    },
    '& .profile_name, & .job': {
      color: '#fff',
      fontSize: 18,
      fontWeight: 500,
    },
    '&.close .profile_name, &.close .job': {
      display: 'none',
    },
    '& .job': {
      fontSize: 12,
    },
  },
  homeSection: {
    position: 'relative',
    background: '#E4E9F7',
    height: '100vh',
    left: 260,
    width: 'calc(100% - 260px)',
    transition: 'all 0.5s ease',
    '&.close': {
      left: 78,
      width: 'calc(100% - 78px)',
    },
  },
  homeContent: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    '& .bx-menu, & .text': {
      color: '#11101d',
      fontSize: 35,
    },
    '& .bx-menu': {
      margin: '0 15px',
      cursor: 'pointer',
    },
    '& .text': {
      fontSize: 26,
      fontWeight: 600,
    },
  },
  one: {
    width: '80%',
    marginLeft: '10%',
    backgroundColor: 'black',
    height: '400px',
  },
});
