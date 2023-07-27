import * as React from 'react';
import { styled, useTheme,createTheme,ThemeProvider  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { useEffect,useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import Taux from './Dashboard/Machine/Taux';
import Charte from './Dashboard/Machine/Charte'
import Seance from './Dashboard/Machine/Seance';
import ChartsTaux from './Dashboard/Machine/ChartsTaux'
import '../css/App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import  Title  from '../pages/Dashboard/Machine/Title';
import Table from './Dashboard/Machine/Table'



const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDrawerOpenClose = () => {
    setOpen(!open);
  };

  const handleDirect= (v) => {
    setView(v)
  };
  const [backendData, setBackenData] = useState([{}])
  useEffect(() => {
    // Test if the client is logged in before rendering the page
    const myVariable = localStorage.getItem('isLoggedin');
    if (!myVariable) {
      navigate('/');
    }
  }, []);
  
  
  useEffect(()=> {
    fetch("/data").then(
      response=>response.json()
    ).then(
      data => {
        setBackenData(data)
      }
    )
  }
  
   )



  



  useEffect(() => {
    // Test if the client is logged in before rendering the page
    const myVariable = localStorage.getItem('isLoggedin');

    



    
  }, []);






  const num=backendData.moy*100;
   const username=localStorage.getItem('username')
   const email=localStorage.getItem('email')
   const pic=localStorage.getItem('pic')

  //dashboard view
     const dashboard = (   <>
     <br/> <br/>
    <div>
      <Seance data={backendData}/>
    </div>
    <div>
      <Taux/>
    </div>
    <div>
      <Charte/>
    </div> 
     

    <div>
      <Table/>
    </div> 

    </>
   );
   const machine="machine"
   const homme="homme"
   const produit="produit"
   

  return (<>
<Header/>
<Title pageTitle="Suivi des états des postes de travail" />
    <Box style={{overflow:'hidden'}} sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer className='nav' style={{overflow:'hidden'}}  variant="permanent" open={open}>
        <DrawerHeader className='DH' >
        </DrawerHeader>
        <List className="ez">
        <ListItem key="list" disablePadding sx={{ display: 'block' }} onClick={() => handleDrawerOpenClose() }  >
             <ListItemButton 
               sx={{
                 minHeight: 55,
                 justifyContent: open ? 'initial' : 'center',
                 px: 2.5,
               }}
             >
               <ListItemIcon
                 sx={{
                   minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                 }}
               >       
                 <MenuIcon style={{ color: '#FFFFFF' }} />
               </ListItemIcon>
               <ListItemText  primary="" sx={{ opacity: open ? 1 : 0 }} />
             </ListItemButton>

           </ListItem>
        <ListItem key="Dashboard" disablePadding sx={{ display: 'block' }} onClick={() => handleDirect("Dashboard") }  >
             
             <ListItemButton 
               sx={{
                 minHeight: 55,
                 justifyContent: open ? 'initial' : 'center',
                 px: 2.5,
               }}
             >
               <ListItemIcon
                 sx={{
                   minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                 }}
               >       
                 <DashboardIcon style={{ color: '#FFFFFF' }} />
               </ListItemIcon>
               <ListItemText  primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
             </ListItemButton>

           </ListItem>

           <ListItem key="Machine" disablePadding sx={{ display: 'block' }}onClick={() => handleDirect("Machine") } >
             
             <ListItemButton 
               sx={{
                 minHeight: 48,
                 justifyContent: open ? 'initial' : 'center',
                 px: 2.5,
               }}
             >
               <ListItemIcon
                 sx={{
                   minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                 }}
               >       
               <PrecisionManufacturingIcon style={{ color: '#FFFFFF' }}  />
              </ListItemIcon>
               <ListItemText primary="Machine" sx={{ opacity: open ? 1 : 0 }} />
             </ListItemButton>

           </ListItem>
           <ListItem key="Homme" disablePadding sx={{ display: 'block' }}onClick={() => handleDirect("Homme") } >
             
             <ListItemButton 
               sx={{
                 minHeight: 48,
                 justifyContent: open ? 'initial' : 'center',
                 px: 2.5,
               }}
             >
               <ListItemIcon
                 sx={{
                   minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                 }}
               >       
                 <GroupsIcon style={{ color: '#FFFFFF' }} />
              </ListItemIcon>
               <ListItemText primary="Homme" sx={{ opacity: open ? 1 : 0 }} />
             </ListItemButton>

           </ListItem>
           <ListItem key="Produit" disablePadding sx={{ display: 'block' }}onClick={() => handleDirect("Produit") } >
             
             <ListItemButton 
               sx={{
                 minHeight: 48,
                 justifyContent: open ? 'initial' : 'center',
                 px: 2.5,
               }}
             >
               <ListItemIcon
                 sx={{
                   minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                 }}
               >       
                 <InventoryIcon  style={{ color: '#FFFFFF' }} />
              </ListItemIcon>
               <ListItemText primary="Produit" sx={{ opacity: open ? 1 : 0 }} />
             </ListItemButton>

           </ListItem>

        </List>

      </Drawer>
      
      <Box component="main" className="maiin" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
              {
                view==="Machine" ? machine
                : view==="Homme" ? homme 
                : view==="Produit"? produit
                : dashboard  
              }
              <br/> 
      <div><br/><br/><Footer view="dash"/> </div>
      </Box>
    </Box></>
  );
}