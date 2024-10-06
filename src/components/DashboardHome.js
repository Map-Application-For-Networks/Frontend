import React from 'react';
import { Box, Card, CardContent, Typography, Paper, useTheme } from '@mui/material';

function DashboardHome() {
  const theme = useTheme(); // Access theme to use theme-specific properties

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      padding: 3
    }}>
      <Paper elevation={3} sx={{ padding: 2, backgroundColor: theme.palette.background.paper }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: theme.palette.primary.main }}>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          This dashboard allows you to manage markers, users, and settings. Navigate through the options below to see detailed functionalities.
        </Typography>
      </Paper>
      <Card raised sx={{ backgroundColor: 'background.default', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>
            Markers Management
          </Typography>
          <Typography variant="body1">
            Admin can view all details about the markers. The "Approve/Disapprove Marker" option shows newly added markers awaiting verification. The "Delete Marker" option displays verified markers that can be removed by the admin.
          </Typography>
        </CardContent>
      </Card>
      <Card raised sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: theme.palette.info.main }}>
            User Settings
          </Typography>
          <Typography variant="body1">
            Manage user roles, permissions, and access control within the dashboard. Ensure secure and efficient operation of the admin functions.
          </Typography>
        </CardContent>
      </Card>
      {/* Add more cards or components as needed */}
    </Box>
  );
}

export default DashboardHome;
