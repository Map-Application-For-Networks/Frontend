import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Pagination } from '@mui/material';
import { demoTheme } from './Constants'; // Ensure this export exists in your constants file
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ExRNAIcon from '../../icons/ExRNA_PATH_Logo-3.png';
import MarkerCard from '../../components/MarkerCard'; // Ensure this path is correct
import { NAVIGATION } from './Constants'; // Ensure this path is correct

function DashboardLayoutBasic(props) {
  const [pathname, setPathname] = React.useState('/dashboard');
  const [currentPage, setCurrentPage] = React.useState(1);
  const markersPerPage = 3; // You can adjust this number based on your preference

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/api/verified-markers'),
      axios.get('http://localhost:3001/api/roles'),
      axios.get('http://localhost:3001/api/tags')
    ]).then(([markersResponse, rolesResponse, tagsResponse]) => {
      const rolesMap = rolesResponse.data.reduce((acc, role) => {
        acc[role._id] = role.roleName; // Ensure the backend sends 'roleName'
        return acc;
      }, {});

      const tagsMap = tagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName; // Ensure the backend sends 'tagName'
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
    });
  }, []);

  const indexOfLastMarker = currentPage * markersPerPage;
  const indexOfFirstMarker = indexOfLastMarker - markersPerPage;
  const currentMarkers = markers.slice(indexOfFirstMarker, indexOfLastMarker);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const renderContent = () => {
    if (pathname === '/markers/approve_marker') {
      return (
        <>
          {currentMarkers.map(marker => (
            <MarkerCard key={marker._id} marker={marker} />
          ))}
          <Pagination
            count={Math.ceil(markers.length / markersPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
          />
        </>
      );
    } else {
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