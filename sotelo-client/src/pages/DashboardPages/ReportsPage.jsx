import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

export default function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#08060d', fontWeight: 'bold' }}>Reports & Analytics</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" sx={{ color: '#aa3bff', fontWeight: 'bold', mb: 2 }}>Quarterly Performance</Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
              series={[
                { data: [40, 30, 60, 50], color: '#aa3bff' }, 
                { data: [20, 50, 35, 45], color: '#FFD700' }
              ]}
              width={600}
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#aa3bff', fontWeight: 'bold', mb: 2, alignSelf: 'flex-start' }}>User Demographics</Typography>
            <PieChart
              series={[
                { 
                  data: [
                    { id: 0, value: 20, label: 'Group A', color: '#aa3bff' }, 
                    { id: 1, value: 15, label: 'Group B', color: '#FFD700' }, 
                    { id: 2, value: 10, label: 'Group C', color: '#FFB6C1' }
                  ],
                  innerRadius: 30,
                  paddingAngle: 5,
                  cornerRadius: 5,
                }
              ]}
              width={350}
              height={200}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}