import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Pagination, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ExRNAIcon from '../../icons/ExRNA_PATH_Logo-3.png';
import MarkerCardForVerification from '../../components/MarkerCardForVerification';
import MarkerCardForDeletion from '../../components/MarkerCardForDeletion';
import DashboardHome from '../../components/DashboardHome';
import { NAVIGATION, demoTheme } from './Constants';

function DashboardLayoutBasic() {

  const [pathname, setPathname] = useState('/dashboard');
  const [currentPage, setCurrentPage] = useState({
    '/markers/approve_marker': 1,
    '/markers/delete_marker': 1
  });
  const markersPerPage = 3;
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);

  useEffect(() => {
    const apiEndpoints = {
      '/markers/approve_marker': 'http://localhost:3001/api/refuted-markers',
      '/markers/delete_marker': 'http://localhost:3001/api/verified-markers'
    };
    const endpoint = apiEndpoints[pathname];

    setLoading(true); // Set loading to true at the start of the data fetch
    Promise.all([
      axios.get(endpoint),
      axios.get('http://localhost:3001/api/roles'),
      axios.get('http://localhost:3001/api/tags')
    ]).then(([markersResponse, rolesResponse, tagsResponse]) => {
      const rolesMap = rolesResponse.data.reduce((acc, role) => {
        acc[role._id] = role.roleName;
        return acc;
      }, {});

      const tagsMap = tagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const enhancedMarkers = markersResponse.data.map(marker => ({
        ...marker,
        role: rolesMap[marker.role] || marker.role,
        researchFieldTopic: marker.researchFieldTopic.map(tagId => tagsMap[tagId] || tagId)
      }));

      setMarkers(enhancedMarkers);
    }).catch(error => {
      console.error('Error fetching data:', error);
    }).finally(() => {
      setLoading(false); // Set loading to false once data is fetched or an error occurs
    });
  }, [pathname]); // Ensuring dependency on pathname

  const handleChangePage = (event, newPage) => {
    setCurrentPage(prev => ({ ...prev, [pathname]: newPage }));
  };

  const renderContent = () => {
    if (loading) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>;
    }

    const page = currentPage[pathname] || 1;
    const indexOfLastMarker = page * markersPerPage;
    const indexOfFirstMarker = indexOfLastMarker - markersPerPage;
    const currentMarkers = markers.slice(indexOfFirstMarker, indexOfLastMarker);

    if (pathname === '/markers/approve_marker' || pathname === '/markers/delete_marker') {
      const MarkerCardComponent = pathname === '/markers/approve_marker' ? MarkerCardForVerification : MarkerCardForDeletion;
      return (
        <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', padding: 2 }}>
          {currentMarkers.map(marker => (
            <MarkerCardComponent key={marker._id} marker={marker} />
          ))}
          <Pagination
            count={Math.ceil(markers.length / markersPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      );
    } else if (pathname === '/dashboard') {
      return (<DashboardHome></DashboardHome>);
    } 
    else {
      return <Typography>Dashboard content for {pathname}</Typography>;
    }
  };

  return (
    <AppProvider
      branding={{
        logo: <img src={ExRNAIcon} alt="ExRNA Logo" style={{ height: '40px' }} />,
        title: 'Admin Dashboard',
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;