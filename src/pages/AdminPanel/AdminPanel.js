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
import AddTag from '../../components/AddTag';
import DeleteTag from '../../components/DeleteTag';


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
      .get('https://backend-delta-seven-47.vercel.app/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(() => {
        navigate('/login');
      });
  }, [token, navigate]);

  const fetchMarkersData = useCallback(async () => {
    const apiEndpoints = {
      '/markers/approve_marker': 'https://backend-delta-seven-47.vercel.app/api/refuted-markers',
      '/markers/delete_marker': 'https://backend-delta-seven-47.vercel.app/api/verified-markers',
    };

    const endpoint = apiEndpoints[pathname];
    if (!endpoint) {
      return;
    }

    setLoading(true);

    try {
      const [markersResponse, rolesResponse, organismTagsResponse,
      drivenProcessTagsResponse,
      classOfExrnaTagsResponse,
      carrierOfExrnaTagsResponse,
      applicationAreaTagsResponse,
      researchExpertiseTagsResponse,
      technicalExpertiseTagsResponse] = await Promise.all([
        axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('https://backend-delta-seven-47.vercel.app/api/roles'),
        axios.get('https://backend-delta-seven-47.vercel.app/api/organismtags'),
        axios.get('https://backend-delta-seven-47.vercel.app/api/drivenprocesstags'),
        axios.get('https://backend-delta-seven-47.vercel.app/api/classofexrnatags'),
        axios.get('https://backend-delta-seven-47.vercel.app/api/carrierofexrnatags'),
        axios.get('https://backend-delta-seven-47.vercel.app/api/applicationareatags'),
        axios.get('https://backend-delta-seven-47.vercel.app/api/researchexpertisetags'),
        axios.get('https://backend-delta-seven-47.vercel.app/api/techexpertisetags')
      ]);

      const rolesMap = rolesResponse.data.reduce((acc, role) => {
        acc[role._id] = role.roleName;
        return acc;
      }, {});


      const organismTagsMap = organismTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const drivenProcessTagsMap = drivenProcessTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const classTagsMap = classOfExrnaTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const carrierTagsMap = carrierOfExrnaTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const applicationAreaTagsMap = applicationAreaTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const researchExpertiseTagsMap = researchExpertiseTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const technicalExpertiseTagsMap = technicalExpertiseTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const enhancedMarkers = markersResponse.data.map((marker) => ({
        ...marker,
        role: rolesMap[marker.role] || marker.role,
        organismTags: Array.isArray(marker.organismTags)
          ? marker.organismTags.map((tagId) => organismTagsMap[tagId] || tagId)
          : [],
        drivenProcessTags: Array.isArray(marker.drivenProcessTags)
          ? marker.drivenProcessTags.map((tagId) => drivenProcessTagsMap[tagId] || tagId)
          : [],
        classTags: Array.isArray(marker.classTags)
          ? marker.classTags.map((tagId) => classTagsMap[tagId] || tagId)
          : [],
        carrierTags: Array.isArray(marker.carrierTags)
          ? marker.carrierTags.map((tagId) => carrierTagsMap[tagId] || tagId)
          : [],
        applicationAreaTags: Array.isArray(marker.applicationAreaTags)
          ? marker.applicationAreaTags.map((tagId) => applicationAreaTagsMap[tagId] || tagId)
          : [],
        researchExpertiseTags: Array.isArray(marker.researchExpertiseTags)
          ? marker.researchExpertiseTags.map((tagId) => researchExpertiseTagsMap[tagId] || tagId)
          : [],
        technicalExpertiseTags: Array.isArray(marker.technicalExpertiseTags)
          ? marker.technicalExpertiseTags.map((tagId) => technicalExpertiseTagsMap[tagId] || tagId)
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
        </Box>); 
    }

    if (pathname.includes('tags/')) {
      let pathTag = pathname.split('/')[2]; // expertise_tags, tech_tags, vs.
      let action = pathname.includes('/add_') ? 'add' : pathname.includes('/delete_') ? 'delete' : null;
      if (!action) return null;
    
      let tagType = "";
      if (pathTag.includes("organism")) {
          tagType = "addorganismtags";
        }
        else if (pathTag.includes("class")) {
          tagType = "addclassofexrnatags";
        } else if (pathTag.includes("carrier")) {
          tagType = "addcarrierofexrnatags";
        } else if (pathTag.includes("application")) {
          tagType = "addapplicationareatags";
        } else if (pathTag.includes("driven")) {
          tagType = "adddrivenprocesstags";
        } else if (pathTag.includes("research")) {
          tagType = "addresearchexpertisetags";
        } else if (pathTag.includes("technical")) {
          tagType = "addtechexpertisetags";
        } else {
          return null; // Eşleşme yoksa bileşeni döndürme
        }
        return (action === 'add' ? <AddTag tagType={tagType} /> : <DeleteTag tagType={tagType} />);
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