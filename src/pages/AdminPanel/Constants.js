import {PersonAddDisabled, PersonAdd, AccountBox, Assignment, Tag, Room, Settings, Dashboard, CheckCircle, Delete} from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

export const NAVIGATION = [
    {
      kind: 'header',
      title: 'Main Menu',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <Dashboard />,
    },
    {
      segment: 'markers',
      title: 'Markers',
      icon: <Room />,
      children: [
          {
            segment: 'approve_marker',
            title: 'Approve/Disapprove Marker',
            icon: <CheckCircle/>,
          },
          {
            segment: 'delete_marker',
            title: 'Delete Marker',
            icon: <Delete />,
          },
        ],
    },
    {
      segment: 'users',
      title: 'Users',
      icon: <AccountBox />,
      children: [
        {
          segment: 'add_user',
          title: 'Add User',
          icon: <PersonAdd/>,
        },
        {
          segment: 'delete_user',
          title: 'Delete User',
          icon: <PersonAddDisabled />,
        },
      ],
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Settings',
    },
    {
      segment: 'add_marker_settings',
      title: 'Add Marker Settings',
      icon: <Settings />,
      children: [
        {
          segment: 'tag_settings',
          title: 'Tag Settings',
          icon: <Tag />,
        },
        {
          segment: 'role_settings',
          title: 'Role Settings',
          icon: <Assignment />,
        },
      ],
    },
  
  ];


  export const demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });