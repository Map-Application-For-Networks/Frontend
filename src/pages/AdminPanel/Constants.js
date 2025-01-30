import { Tag, Room, Dashboard, CheckCircle, Delete, Logout, Biotech, Science, Coronavirus, AddCircle, RemoveCircle } from '@mui/icons-material';
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
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Settings',
    },
    {
      segment: 'tags',
      title: 'Tags',
      icon: <Tag />,
      children: [
        {
          segment: 'expertise_tags',
          title: 'Area(s) of Expertise Tags',
          icon: <Science/>,
          children:
          [
            {
              segment: 'add_expertise_tags',
              title: 'Add Tags',
              icon: <AddCircle/>
            },
            {
              segment: 'delete_expertise_tags',
              title: 'Delete Tags',
              icon: <RemoveCircle/>
            },

          ]
        },
        {
          segment: 'tech_tags',
          title: 'Technology(s) Tags',
          icon: <Biotech/>,
          children:
          [
            {
              segment: 'add_tech_tags',
              title: 'Add Tags',
              icon: <AddCircle/>
            },
            {
              segment: 'delete_tech_tags',
              title: 'Delete Tags',
              icon: <RemoveCircle/>
            },

          ]
        },
        {
          segment: 'model_organism_tags',
          title: 'Model Organism Tags',
          icon: <Coronavirus />,
          children:
          [
            {
              segment: 'add_model_organism_tags',
              title: 'Add Tags',
              icon: <AddCircle/>
            },
            {
              segment: 'delete_model_organism_tags',
              title: 'Delete Tags',
              icon: <RemoveCircle/>
            },

          ]
        },
      ],
    },
    {
      segment: 'logout',
      title: 'Logout',
      icon: <Logout />, // You can use another icon for logout, e.g., <ExitToApp />
   
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