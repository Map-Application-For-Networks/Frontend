import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, Pagination, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ExRNAIcon from '../../icons/ExRNA_PATH_Logo-3.png';
import MarkerCardForVerification from '../../components/MarkerCardForVerification';
import MarkerCardForDeletion from '../../components/MarkerCardForDeletion';
import DashboardHome from '../../components/DashboardHome';
import { NAVIGATION, demoTheme } from './Constants';
import { useNavigate } from 'react-router-dom';

function DashboardLayoutBasic() {
  const handleMarkerUpdate = (id, verified) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker._id === id ? { ...marker, verified } : marker
      )
    );
  };
  
  const [pathname, setPathname] = useState('/dashboard');
  const [currentPage, setCurrentPage] = useState({
    '/markers/approve_marker': 1,
    '/markers/delete_marker': 1,
  });
  const markersPerPage = 3;
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  }, [navigate]);

  const router = useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => {
      if (path === '/logout') {
        handleLogout();
      } else {
        setPathname(String(path));
      }
    },
  }), [pathname, handleLogout]);

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  // Prevent back/forward navigation
  useEffect(() => {
    window.history.replaceState(null, '', window.location.href);

    const blockBackNavigation = () => {
      window.history.pushState(null, '', window.location.href);
    };

    blockBackNavigation();
    window.addEventListener('popstate', blockBackNavigation);

    return () => {
      window.removeEventListener('popstate', blockBackNavigation);
    };
  }, []);

  // Token validation on mount
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:3001/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` }, // Fixed here
      })
      .catch(() => {
        navigate('/login');
      });
  }, [token, navigate]);

  // Fetch data (roles, tags, and markers) based on pathname
  useEffect(() => {
    const apiEndpoints = {
      '/markers/approve_marker': 'http://localhost:3001/api/refuted-markers',
      '/markers/delete_marker': 'http://localhost:3001/api/verified-markers',
    };
    const endpoint = apiEndpoints[pathname];

    const fetchMarkersData = async () => {
      setLoading(true);
      try {
        const [markersResponse, rolesResponse, techTagsResponse, modelTagsResponse,expertiseTagsResponse] = await Promise.all([
          axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } }), // Fixed here
          axios.get('http://localhost:3001/api/roles'),
          //axios.get('http://localhost:3001/api/tags'),
          axios.get('http://localhost:3001/api/techtags'),
          axios.get('http://localhost:3001/api/modeltags'),
          axios.get('http://localhost:3001/api/expertisetags')
        ]);

        const rolesMap = rolesResponse.data.reduce((acc, role) => {
          acc[role._id] = role.roleName;
          return acc;
        }, {});

        const techTags_list = techTagsResponse.data.reduce((acc, tag) => {
          acc[tag._id] = tag.tagName;
          return acc;
        }, {});

        const modelTags_list = modelTagsResponse.data.reduce((acc, tag) => {
          acc[tag._id] = tag.tagName;
          return acc;
        }, {});

        const expertiseTags_list = expertiseTagsResponse.data.reduce((acc, tag) => {
          acc[tag._id] = tag.tagName;
          return acc;
        }, {});


        const enhancedMarkers = markersResponse.data.map((marker) => ({
          ...marker,
          role: rolesMap[marker.role] || marker.role,
          techTags: Array.isArray(marker.techTags)
            ? marker.techTags.map(tagId => techTags_list[tagId] || tagId)
            : [], // Default to an empty array
          modelTags: Array.isArray(marker.modelTags)
            ? marker.modelTags.map(tagId => modelTags_list[tagId] || tagId)
            : [], // Default to an empty array
          expertiseAreaTags: Array.isArray(marker.expertiseAreaTags)
            ? marker.expertiseAreaTags.map(tagId => expertiseTags_list[tagId] || tagId)
            : [] // Default to an empty array
        }));

        setMarkers(enhancedMarkers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pathname === '/markers/approve_marker' || pathname === '/markers/delete_marker') {
      fetchMarkersData();
    }
  }, [pathname, token]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage((prev) => ({ ...prev, [pathname]: newPage }));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      );
    }

    const page = currentPage[pathname] || 1;
    const indexOfLastMarker = page * markersPerPage;
    const indexOfFirstMarker = indexOfLastMarker - markersPerPage;
    const currentMarkers = markers.slice(indexOfFirstMarker, indexOfLastMarker);

    if (pathname === '/markers/approve_marker' || pathname === '/markers/delete_marker') {
      const MarkerCardComponent =
        pathname === '/markers/approve_marker' ? MarkerCardForVerification : MarkerCardForDeletion;
      return (
        <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', padding: 2 }}>
          {currentMarkers.map((marker) => (
            <MarkerCardComponent key={marker._id} marker={marker} onMarkerUpdate={handleMarkerUpdate} />
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
    }
    if (pathname === '/dashboard') {
      return <DashboardHome />;
    }
    return <Typography>Dashboard content for {pathname}</Typography>;
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
      <DashboardLayout>{renderContent()}</DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;
