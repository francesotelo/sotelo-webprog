import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'fullName', headerName: 'Full name', width: 200, 
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` 
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

export default function UsersPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#08060d', fontWeight: 'bold' }}>Users Overview</Typography>
      <Paper sx={{ height: 400, width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5]}
          checkboxSelection
          sx={{ 
            border: 'none',
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f4f3ec', color: '#6b6375', fontWeight: 'bold' },
            '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(255, 192, 203, 0.1)' },
            '& .Mui-checked': { color: '#aa3bff !important' }
          }}
        />
      </Paper>
    </Box>
  );
}