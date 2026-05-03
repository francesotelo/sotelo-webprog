import React, { useState } from 'react';
import { 
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, CssBaseline, 
  Card, CardContent, Grid, Button, InputBase
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  BarChart as ReportsIcon, 
  People as UsersIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const drawerWidth = 240;

// --- THEME COLORS ---
const themeColors = {
  purple: '#9c27b0',
  pink: '#e91e63',
  yellow: '#FFD700',
  lightPink: 'rgba(233, 30, 99, 0.12)'
};

// --- MOCK DATA: POP STARS ---
const userRows = [
  { id: 1, firstName: 'Taylor', lastName: 'Swift', age: 34, fullName: 'Taylor Swift' },
  { id: 2, firstName: 'Ariana', lastName: 'Grande', age: 30, fullName: 'Ariana Grande' },
  { id: 3, firstName: 'Beyoncé', lastName: 'Knowles', age: 42, fullName: 'Beyoncé' },
  { id: 4, firstName: 'Lady', lastName: 'Gaga', age: 38, fullName: 'Lady Gaga' },
  { id: 5, firstName: 'Bruno', lastName: 'Mars', age: 38, fullName: 'Bruno Mars' },
];

const barData = [
  { name: 'Q1', Streams: 350, Sales: 500 },
  { name: 'Q2', Streams: 450, Sales: 150 },
  { name: 'Q3', Streams: 250, Sales: 500 },
  { name: 'Q4', Streams: 550, Sales: 300 },
];

const pieData = [
  { name: 'Pop', value: 45, color: themeColors.purple },
  { name: 'R&B', value: 25, color: themeColors.pink },
  { name: 'Country', value: 30, color: themeColors.yellow },
];

// --- ENHANCEMENT 1: DashboardPage (Overview) ---
const DashboardPage = () => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" sx={{ mb: 2, color: themeColors.purple, fontWeight: 'bold' }}>Dashboard</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Card variant="outlined" sx={{ borderTop: `4px solid ${themeColors.pink}` }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Total Artists</Typography>
            <Typography variant="h4" sx={{ color: themeColors.purple }}>5</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card variant="outlined" sx={{ borderTop: `4px solid ${themeColors.yellow}` }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Average Age</Typography>
            <Typography variant="h4" sx={{ color: themeColors.purple }}>36.4</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

// --- ENHANCEMENT 2: ReportsPage (Charts) ---
const ReportsPage = () => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2, color: themeColors.purple, fontWeight: 'bold' }}>Performance Reports</Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        {/* Fixed Bar Chart Dimensions */}
        <Box sx={{ overflowX: 'auto' }}>
            <BarChart width={600} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="Streams" fill={themeColors.purple} />
              <Bar dataKey="Sales" fill={themeColors.yellow} />
            </BarChart>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

// --- ENHANCEMENT 3: UsersPage (Data Table) ---
const UsersPage = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    { field: 'fullName', headerName: 'Stage name', width: 200 },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: themeColors.purple, fontWeight: 'bold' }}>Artists Roster</Typography>
      <div style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
        <DataGrid
          rows={userRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#fcfcfc' },
            '& .Mui-checked': { color: `${themeColors.pink} !important` }
          }}
        />
      </div>
    </Box>
  );
};

// --- MAIN LAYOUT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Top App Bar - Themed Purple */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: themeColors.purple }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            StarBoard - {activeTab}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: 1 }}>
              <SearchIcon fontSize="small" sx={{ mr: 1 }} />
              <InputBase placeholder="Search artists..." sx={{ color: 'white', '& .MuiInputBase-input': { color: 'white' } }} />
            </Box>
            <Button variant="outlined" sx={{ color: themeColors.yellow, borderColor: themeColors.yellow }} size="small">LOGOUT</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar / Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Reports', 'Roster'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton 
                  selected={activeTab === text}
                  onClick={() => setActiveTab(text)}
                  sx={{ 
                    // Themed Pink for selection
                    '&.Mui-selected': { backgroundColor: themeColors.lightPink, borderLeft: `4px solid ${themeColors.pink}` },
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                  }}
                >
                  <ListItemIcon>
                    {text === 'Dashboard' ? <DashboardIcon sx={{ color: activeTab === text ? themeColors.pink : 'inherit' }} /> : 
                     text === 'Reports' ? <ReportsIcon sx={{ color: activeTab === text ? themeColors.pink : 'inherit' }} /> : 
                     <UsersIcon sx={{ color: activeTab === text ? themeColors.pink : 'inherit' }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: activeTab === text ? themeColors.pink : 'inherit', fontWeight: activeTab === text ? 'bold' : 'normal' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#fdfbfd', minHeight: '100vh' }}>
        <Toolbar /> {/* Spacer for AppBar */}
        
        {/* Render views based on selected sidebar item */}
        {activeTab === 'Dashboard' && (
          <>
            <DashboardPage />
            <ReportsPage />
            <UsersPage />
          </>
        )}
        {activeTab === 'Reports' && <ReportsPage />}
        {activeTab === 'Roster' && <UsersPage />}
        
      </Box>
    </Box>
  );
}