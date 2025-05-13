import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AdminGuide() {
  const theme = useTheme();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{ color: theme.palette.primary.main, marginBottom: 2, textAlign: 'center' }}
      >
        Admin Panel User Guide
      </Typography>

      {/* Overview */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
            🧭 Overview
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The Admin Dashboard enables you to manage essential components of the system, including <strong>markers</strong> and <strong>tags</strong>.
          </Typography>
          <Typography variant="body1" paragraph>
            To get started, use the <strong>sidebar on the left</strong> to navigate:
          </Typography>
          <Box sx={{ pl: 2 }}>
            <ul>
              <li><strong>Markers:</strong> Select this tab to view or update marker components.</li>
              <li><strong>Tags:</strong> Use this section to manage and modify available tags.</li>
            </ul>
          </Box>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            🛑 <strong>Don't forget to log out</strong> once you've completed your tasks to keep your account secure.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ➡️ Use the tabs below to learn more about each section in detail.
          </Typography>
        </AccordionDetails>
      </Accordion>


      {/* Markers Management */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: theme.palette.info.main }}>
            📍 Markers Management
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            This section allows admins to approve, disapprove, and delete markers submitted by regular users.
            Each marker includes detailed information about an institute, such as:
            the <strong>institute name</strong>, <strong>description</strong>, <strong>coordinates</strong>, <strong>contact info</strong>, <strong>marker type</strong>, and <strong>tags</strong>.
          </Typography>
          <Box sx={{ pl: 2 }}>
            <ul>
              <li>
                <strong>Approve/Disapprove Tab:</strong> Review newly submitted markers awaiting admin verification.
                If everything looks correct, click <strong>Approve</strong>. If the marker is invalid or incorrect, click <strong>Disapprove</strong> — this will <strong>permanently remove</strong> the marker.
              </li>
              <li>
                <strong>Delete Tab:</strong> Remove previously approved markers from the system.
                Use this if an institute you’ve already approved needs to be removed.
                This action will also <strong>permanently delete</strong> the marker.
              </li>
            </ul>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            ⚠️ Markers submitted by users are <strong>not visible</strong> to others until approved.
            Once verified through the <em>Approve/Disapprove</em> tab, the marker becomes visible on the map to all users.
          </Typography>
        </AccordionDetails>
      </Accordion>


      {/* Tag Settings */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: theme.palette.info.main }}>
            🏷️ Tags Management
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Admins can update the tags stored in the system. Each type of tag (e.g., category, feature, status) is managed through its own dedicated tab.
            Please select the tag type you wish to modify.
          </Typography>
          <Box sx={{ pl: 2 }}>
            <ul>
              <li>
                <strong>Add Tag Tab:</strong> Add a new tag under the currently selected tag type. You can enter the tag name directly to the input box. 
              </li>
              <li>
                <strong>Delete Tag Tab:</strong> Remove an existing tag from the selected tag type. 
              </li>
            </ul>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            🔐 If all tags of a certain type are deleted from a marker, that tag type will return a <strong>NULL</strong> value. It is not possible to leave a tag type blank once defined.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            🛑 Deleted tags will be removed from all verified markers they are attached to.
          </Typography>
        </AccordionDetails>
      </Accordion>

    </Box>
  );
}

export default AdminGuide;
