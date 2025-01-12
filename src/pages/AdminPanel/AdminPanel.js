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
  const [pathname, setPathname] = useState('/dashboard');
  const [currentPage, setCurrentPage] = useState({
    '/markers/approve_marker': 1,
    '/markers/delete_marker': 1,
  });
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const markersPerPage = 3;
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  }, [navigate]);

  const router = useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        if (path === '/logout') {
          handleLogout();
        } else {
          setPathname(String(path));
        }
      },
    }),
    [pathname, handleLogout]
  );

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

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:3001/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(() => {
        navigate('/login');
      });
  }, [token, navigate]);

  const fetchMarkersData = useCallback(async () => {
    const apiEndpoints = {
      '/markers/approve_marker': 'http://localhost:3001/api/refuted-markers',
      '/markers/delete_marker': 'http://localhost:3001/api/verified-markers',
    };

    const endpoint = apiEndpoints[pathname];
    if (!endpoint) {
      return;
    }

    setLoading(true);

    try {
      const [markersResponse, rolesResponse, techTagsResponse, modelTagsResponse, expertiseTagsResponse] = await Promise.all([
        axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:3001/api/roles'),
        axios.get('http://localhost:3001/api/techtags'),
        axios.get('http://localhost:3001/api/modeltags'),
        axios.get('http://localhost:3001/api/expertisetags'),
      ]);

      const rolesMap = rolesResponse.data.reduce((acc, role) => {
        acc[role._id] = role.roleName;
        return acc;
      }, {});

      const techTagsMap = techTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const modelTagsMap = modelTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const expertiseTagsMap = expertiseTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const enhancedMarkers = markersResponse.data.map((marker) => ({
        ...marker,
        role: rolesMap[marker.role] || marker.role,
        techTags: Array.isArray(marker.techTags)
          ? marker.techTags.map((tagId) => techTagsMap[tagId] || tagId)
          : [],
        modelTags: Array.isArray(marker.modelTags)
          ? marker.modelTags.map((tagId) => modelTagsMap[tagId] || tagId)
          : [],
        expertiseAreaTags: Array.isArray(marker.expertiseAreaTags)
          ? marker.expertiseAreaTags.map((tagId) => expertiseTagsMap[tagId] || tagId)
          : [],
      }));

      setMarkers(enhancedMarkers);
    } catch (error) {
      setMarkers([]); // Reset to empty state on error
    } finally {
      setLoading(false);
    }
  }, [pathname, token]);

  useEffect(() => {
    if (pathname === '/markers/approve_marker' || pathname === '/markers/delete_marker') {
      setMarkers([]); // Clear stale markers
      fetchMarkersData();
    }
  }, [pathname, fetchMarkersData]);

  const handleMarkerUpdate = async (id, verified) => {
      fetchMarkersData(); // Re-fetch the markers to ensure the state is up to date
      
  };

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


    if ((pathname === '/markers/approve_marker' || pathname === '/markers/delete_marker') && markers.length === 0) {
      // Show "No markers found" message only for marker-related routes
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <Typography variant="h6">No markers found for this category.</Typography>
        </Box>
      );
    }

    if (pathname === '/markers/approve_marker' || pathname === '/markers/delete_marker' ) {

      const page = currentPage[pathname] || 1;
      const indexOfLastMarker = page * markersPerPage;
      const indexOfFirstMarker = indexOfLastMarker - markersPerPage;
      const currentMarkers = markers.slice(indexOfFirstMarker, indexOfLastMarker);

      if (currentMarkers.length === 0 && page > 1) {
        // If the page is empty, decrement the page and re-render
        setCurrentPage((prev) => ({
          ...prev,
          [pathname]: page - 1,
        }));
        return null; // Temporarily render nothing until the next re-render
      }
    

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
