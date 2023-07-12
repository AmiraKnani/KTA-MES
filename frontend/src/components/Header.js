import { styled, useTheme,createTheme,ThemeProvider  } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PopUpBox from '../pages/Dashboard/Machine/PopUpBox';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function Header(props){
    const username=localStorage.getItem('username')
    const email=localStorage.getItem('email')
    const pic=localStorage.getItem('pic')
 
    const theme1 = createTheme({
        palette: {
          primary: {
            main: '#414258', 
          },
        },
      });
      const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: 240,
          width: `calc(100% - 240px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));      
    return(
<ThemeProvider theme={theme1}>
<AppBar   position="fixed" >
  <Toolbar className='TB'>
    <div className="KTAMES"> 
    <img className="ktames-1-icon" alt="ktames.png" src="https://trello.com/1/cards/649aae62fbcf66a8254419bd/attachments/649aae78e3e6f312ac4e6dba/previews/649aae79e3e6f312ac4e6dc4/download/KTA_8320_%286%29.png" />
    <b className="kta-8320"> KTA 8320</b>
    </div>
    <div className="userinfo"> 
    <PopupState variant="popover" popupId="demo-popup-popover">
  {(popupState) => (
    <div>
      <Button variant="" {...bindTrigger(popupState)}>
        <div className="avatar">
          <Avatar alt={username} src={pic} />
        </div>
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableAutoFocus
        disableEnforceFocus
      >
        <Typography sx={{ p: 2}}><PopUpBox/></Typography>
      </Popover>
    </div>
  )}
</PopupState>
    </div>
</Toolbar>
</AppBar>
</ThemeProvider> 
   );
  }
  export default Header;
