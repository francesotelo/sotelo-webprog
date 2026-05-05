import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  IconButton, Button, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, CssBaseline, Avatar 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Reports', to: '/dashboard/reports', icon: <BarChartIcon /> },
  { label: 'Users', to: '/dashboard/users', icon: <PeopleIcon /> },
];

export default function DashLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => navigate('/auth/signin'); // Redirects to login on logout
  const handleViewSite = () => navigate('/'); // Jumps to the Ryzza Mae Home Page

  const logoUrl = "https://alchetron.com/cdn/ryzza-mae-dizon-f771b678-d254-4912-be43-78d67392749-resize-750.png";

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#aa3bff' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          
          {/* Rebranded Logo and Title */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              src={logoUrl} 
              alt="RMD" 
              sx={{ width: 35, height: 35, border: '2px solid white' }} 
            />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              RMD Studio Admin
            </Typography>
          </Box>

          {/* Quick links to navigate between the Admin and the Public Site */}
          <Button 
            color="inherit" 
            onClick={handleViewSite} 
            startIcon={<OpenInNewIcon />}
            sx={{ mr: 2, textTransform: 'none', fontWeight: 'bold' }}
          >
            View Live Site
          </Button>

          <Button 
            color="inherit" 
            variant="outlined" 
            onClick={handleLogout} 
            sx={{ borderColor: '#FFD700', color: '#FFD700', fontWeight: 'bold' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#fffcfd' },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: '#aa3bff' }}/> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ pt: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.to} disablePadding sx={{ mb: 1, px: 2 }}>
              <ListItemButton
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
                sx={{
                  borderRadius: '10px',
                  '&.Mui-selected': { backgroundColor: 'rgba(170, 59, 255, 0.1)' },
                  '&:hover': { backgroundColor: 'rgba(170, 59, 255, 0.05)' }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.to ? '#aa3bff' : '#6b6375' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: location.pathname === item.to ? '#aa3bff' : '#6b6375', '& .MuiTypography-root': { fontWeight: location.pathname === item.to ? 'bold' : 'normal' } }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} sx={{ backgroundColor: '#fdfbfd', minHeight: '100vh' }}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}