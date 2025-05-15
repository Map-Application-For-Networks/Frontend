import { RoomOutlined, DashboardOutlined, CheckCircleOutline, DeleteOutline, Logout, AddCircleOutline,
  RemoveCircleOutline, LabelOutlined, } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import { ADMIN_DASHBORD_VERSION } from '../../components/Version'; 

export const NAVIGATION = [
    {
      kind: 'header',
      title: 'Main Menu',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      segment: 'markers',
      title: 'Markers',
      icon: <RoomOutlined />,
      children: [
          {
            segment: 'approve_marker',
            title: 'Approve/Disapprove Marker',
            icon: <CheckCircleOutline/>,
          },
          {
            segment: 'delete_marker',
            title: 'Delete Marker',
            icon: <DeleteOutline />,
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
      segment: 'organism_tags',
      title: 'Organism Tags',
      icon: <LabelOutlined />,
      children: [
        {
          segment: 'add_organism_tags',
          title: 'Add Tags',
          icon: <AddCircleOutline />
        },
        {
          segment: 'delete_organism_tags',
          title: 'Delete Tags',
          icon: <RemoveCircleOutline />
        }
      ]
    },
    {
      segment: 'driven_process_tags',
      title: 'exRNA-Driven Process Tags',
      icon: <LabelOutlined />,
      children: [
        {
          segment: 'add_driven_process_tags',
          title: 'Add Tags',
          icon: <AddCircleOutline />
        },
        {
          segment: 'delete_driven_process_tags',
          title: 'Delete Tags',
          icon: <RemoveCircleOutline />
        }
      ]
    },
    {
      segment: 'class_of_exrna_tags',
      title: 'Class of exRNA Tags',
      icon: <LabelOutlined />,
      children: [
        {
          segment: 'add_class_of_exrna_tags',
          title: 'Add Tags',
          icon: <AddCircleOutline />
        },
        {
          segment: 'delete_class_of_exrna_tags',
          title: 'Delete Tags',
          icon: <RemoveCircleOutline />
        }
      ]
    },
    {
      segment: 'carrier_of_exrna_tags',
      title: 'Carrier of exRNA Tags',
      icon: <LabelOutlined />,
      children: [
        {
          segment: 'add_carrier_of_exrna_tags',
          title: 'Add Tags',
          icon: <AddCircleOutline />
        },
        {
          segment: 'delete_carrier_of_exrna_tags',
          title: 'Delete Tags',
          icon: <RemoveCircleOutline />
        }
      ]
    },
    {
      segment: 'application_area_tags',
      title: 'Application Area Tags',
      icon: <LabelOutlined />,
      children: [
        {
          segment: 'add_application_area_tags',
          title: 'Add Tags',
          icon: <AddCircleOutline />
        },
        {
          segment: 'delete_application_area_tags',
          title: 'Delete Tags',
          icon: <RemoveCircleOutline />
        }
      ]
    },
    {
      segment: 'research_expertise_tags',
      title: 'Research Expertise Tags',
      icon: <LabelOutlined />,
      children: [
        {
          segment: 'add_research_expertise_tags',
          title: 'Add Tags',
          icon: <AddCircleOutline />
        },
        {
          segment: 'delete_research_expertise_tags',
          title: 'Delete Tags',
          icon: <RemoveCircleOutline />
        }
      ]
    },
    {
      segment: 'technical_expertise_tags',
      title: 'Technical Expertise Tags',
      icon: <LabelOutlined />,
      children: [
        {
          segment: 'add_technical_expertise_tags',
          title: 'Add Tags',
          icon: <AddCircleOutline />
        },
        {
          segment: 'delete_technical_expertise_tags',
          title: 'Delete Tags',
          icon: <RemoveCircleOutline />
        }
      ]
    },
    {
      segment: 'logout',
      title: 'Logout',
      icon: <Logout />, // You can use another icon for logout, e.g., <ExitToApp />
   
    },
    {
      kind: 'header',
      title: `Admin Dashboard · V ${ADMIN_DASHBORD_VERSION}`,
      style: {
        color: '#999',
        fontSize: '0.75rem',
        pointerEvents: 'none',
      },
    }
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