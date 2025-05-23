import axios from 'axios';

// 🔍 Shared filter for tags
const filterValidTags = (tags) =>
  tags
    .filter(tag => tag.tagName.trim().toUpperCase() !== 'NULL')
    .map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));

// ✅ Form validation function
export const validateForm = ({
  institutionTitle,
  email,
  nameSurname,
  details,
  location,
  role,
  selectedOrganism,
  selectedDrivenProcess,
  selectedClassOfExrna,
  selectedCarrierOfExrna,
  selectedApplicationArea,
  selectedResearchExpertise,
  selectedTechnicalExpertise
}) => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!institutionTitle) newErrors.institutionTitle = '*Institution title is required!';
  else if (institutionTitle.length > 150) newErrors.institutionTitle = '*Title must include at most 150 characters!';
  if (!email) newErrors.email = '*Email is required!';
  else if (!emailRegex.test(email)) newErrors.email = '*Please enter a valid email address!';
  if (!nameSurname || typeof nameSurname !== 'string' || nameSurname.trim() === '') newErrors.nameSurname = '*Name and surname are required!'; 
  if (!nameSurname || typeof nameSurname !== 'string' || nameSurname.trim() === '') newErrors.nameSurname = '*Name and surname are required!'; 
  if (!details) newErrors.details = '*Details are required!';
  if (details.length > 500) newErrors.details = '*Details must include at most 500 characters!';
  if (selectedOrganism.length === 0) newErrors.selectedOrganism = '*At least one organism must be selected!';
  if (selectedDrivenProcess.length === 0) newErrors.selectedDrivenProcess = '*At least one driven process must be selected!';
  if (selectedClassOfExrna.length === 0) newErrors.selectedClassOfExrna = '*At least one class of exRNA must be selected!';
  if (selectedCarrierOfExrna.length === 0) newErrors.selectedCarrierOfExrna = '*At least one carrier of exRNA must be selected!';
  if (selectedApplicationArea.length === 0) newErrors.selectedApplicationArea = '*At least one application area must be selected!';
  if (selectedResearchExpertise.length === 0) newErrors.selectedResearchExpertise = '*At least one research expertise must be selected!';
  if (selectedTechnicalExpertise.length === 0) newErrors.selectedTechnicalExpertise = '*At least one technical expertise must be selected!';
  if (!location) newErrors.location = '*Location must be selected!';
  if (!role) newErrors.role = '*Role must be selected!';

  return newErrors;
};

const fetchTags = async (url, setTags) => {
  try {
    const response = await axios.get(url);
    const filtered = filterValidTags(response.data);
    setTags(filtered);
  } catch (error) {
    console.error(`Error fetching tags from ${url}:`, error);
  }
};


export const fetchOrganismTags = (setTags) =>
  fetchTags('https://backend-delta-seven-47.vercel.app/api/organismtags', setTags);

export const fetchDrivenProcessTags = (setTags) =>
  fetchTags('https://backend-delta-seven-47.vercel.app/api/drivenprocesstags', setTags);

export const fetchClassOfExrnaTags = (setTags) =>
  fetchTags('https://backend-delta-seven-47.vercel.app/api/classofexrnatags', setTags);

export const fetchCarrierOfExrnaTags = (setTags) =>
  fetchTags('https://backend-delta-seven-47.vercel.app/api/carrierofexrnatags', setTags);

export const fetchApplicationAreaTags = (setTags) =>
  fetchTags('https://backend-delta-seven-47.vercel.app/api/applicationareatags', setTags);

export const fetchResearchExpertiseTags = (setTags) =>
  fetchTags('https://backend-delta-seven-47.vercel.app/api/researchexpertisetags', setTags);

export const fetchTechnicalExpertiseTags = (setTags) =>
  fetchTags('https://backend-delta-seven-47.vercel.app/api/techexpertisetags', setTags);


export const fetchRoles = async (setRolesList) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/roles');
    const roles = response.data.map(role => ({
      label: role.roleName,
      value: role._id
    }));
    setRolesList(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};
