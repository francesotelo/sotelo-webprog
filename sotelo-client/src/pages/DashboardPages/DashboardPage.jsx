import React from 'react';
import { Typography, Box, Grid, Stack, Divider, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#aa3bff', fontWeight: 'bold' }}>Overview</Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: '15px', borderTop: '4px solid #aa3bff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: '#6b6375', fontWeight: 'bold' }}>Total Artists</Typography>
                <Typography variant="h4" sx={{ color: '#08060d' }}>6</Typography>
              </Stack>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: '15px', borderTop: '4px solid #FFD700', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: '#6b6375', fontWeight: 'bold' }}>Average Age</Typography>
                <Typography variant="h4" sx={{ color: '#08060d' }}>33.8</Typography>
              </Stack>
            </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" sx={{ color: '#6b6375', mb: 2 }}>Streaming Growth</Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar', 'Apr'] }]}
                series={[
                  { data: [35, 45, 25, 35], color: '#aa3bff', label: 'Audio' }, 
                  { data: [50, 15, 50, 30], color: '#FFD700', label: 'Video' }
                ]}
                height={300}
              />
            </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ color: '#6b6375', mb: 2, alignSelf: 'flex-start' }}>Audience Demographics</Typography>
              <PieChart
                series={[{
                    data: [
                      { id: 0, value: 40, label: '18-24', color: '#aa3bff' }, 
                      { id: 1, value: 35, label: '25-34', color: '#e91e63' }, 
                      { id: 2, value: 25, label: '35+', color: '#FFD700' }
                    ],
                    innerRadius: 40,
                }]}
                width={300}
                height={200}
              />
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}