import React from 'react';
import { Typography, Box, Grid, Paper, Stack, Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

// Data Grid Setup
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'fullName', headerName: 'Full name', width: 200, 
    valueGetter: (params) => `${params.row?.firstName || ''} ${params.row?.lastName || ''}` 
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#08060d', fontWeight: 'bold' }}>Dashboard</Typography>
      
      {/* 1. Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: '#6b6375', fontWeight: 'bold' }}>Total Users</Typography>
              <Typography variant="h4" sx={{ color: '#08060d' }}>9</Typography>
            </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: '#6b6375', fontWeight: 'bold' }}>Average Age</Typography>
              <Typography variant="h4" sx={{ color: '#08060d' }}>47.8</Typography>
            </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* 2. Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
              series={[
                { data: [35, 45, 25, 35], color: '#4285F4' }, 
                { data: [50, 5, 50, 30], color: '#FBBC05' }
              ]}
              width={600}
              height={300}
            />
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart
              series={[
                { 
                  data: [
                    { id: 0, value: 20, label: 'A', color: '#EA4335' }, 
                    { id: 1, value: 15, label: 'B', color: '#FBBC05' }, 
                    { id: 2, value: 10, label: 'C', color: '#4285F4' }
                  ],
                }
              ]}
              width={300}
              height={200}
            />
        </Grid>
      </Grid>

      {/* 3. Data Grid */}
      <Typography variant="h6" gutterBottom sx={{ color: '#08060d', mt: 4 }}>Users Overview</Typography>
      <Paper sx={{ height: 400, width: '100%', border: 'none', boxShadow: 'none' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5]}
          checkboxSelection
          sx={{ border: 'none' }}
        />
      </Paper>
    </Box>
  );
}