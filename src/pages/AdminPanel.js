import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import RoomIcon from '@mui/icons-material/Room';
import SettingsIcon from '@mui/icons-material/Settings';
import TagIcon from '@mui/icons-material/Tag';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExRNAIcon from '../icons/ExRNA_PATH_Logo-3.png'; 
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main Menu',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'markers',
    title: 'Markers',
    icon: <RoomIcon />,
    children: [
        {
          segment: 'approve_marker',
          title: 'Approve/Disapprove Marker',
          icon: <CheckCircleIcon/>,
        },
        {
          segment: 'delete_marker',
          title: 'Delete Marker',
          icon: <DeleteIcon />,
        },
      ],
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <AccountBoxIcon />,
    children: [
      {
        segment: 'add_user',
        title: 'Add User',
        icon: <PersonAddIcon/>,
      },
      {
        segment: 'delete_user',
        title: 'Delete User',
        icon: <PersonAddDisabledIcon />,
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
    icon: <SettingsIcon />,
    children: [
      {
        segment: 'tag_settings',
        title: 'Tag Settings',
        icon: <TagIcon />,
      },
      {
        segment: 'role_settings',
        title: 'Role Settings',
        icon: <AssignmentIcon />,
      },
    ],
  },

];

const demoTheme = createTheme({
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

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
     branding={{
        logo: <img src={ExRNAIcon} alt="ExRNA Logo" style={{ height: '40px' }} />, // Custom logo
        title: 'Admin Dashboard', // Custom title
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBasic.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
