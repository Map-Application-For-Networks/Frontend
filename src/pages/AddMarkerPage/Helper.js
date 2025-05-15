import axios from 'axios';

// Form validation function
export const validateForm = ({ institutionTitle, email, phoneNumber, details, location, role, selectedOrganism,
    selectedDrivenProcess,
    selectedClassOfExrna,
    selectedCarrierOfExrna,
    selectedApplicationArea,
    selectedResearchExpertise,
    selectedTechnicalExpertise
}) => {
  const newErrors = {};
  const phoneRegex = /^\+?[0-9]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!institutionTitle) newErrors.institutionTitle = '*Institution title is required!';
  if (!email) newErrors.email = '*Email is required!';
  else if (!emailRegex.test(email)) newErrors.email = '*Please enter a valid email address!';
  
  //if (!phoneNumber) newErrors.phoneNumber = '*Phone number is required!';
  if (!phoneRegex.test(phoneNumber)) newErrors.phoneNumber = '*Phone number must include only + and digits!';
  
  if (!details) newErrors.details = '*Details are required!';
  if (details.length > 500) newErrors.details = '*Details must include at most 500 characters!';


  if (selectedOrganism.length === 0) {
    newErrors.selectedOrganism = '*At least one organism must be selected!';
  }

  if (selectedDrivenProcess.length === 0) {
    newErrors.selectedDrivenProcess = '*At least one driven process must be selected!';
  }

  if (selectedClassOfExrna.length === 0) {
    newErrors.selectedClassOfExrna = '*At least one class of exRNA must be selected!';
  }

  if (selectedCarrierOfExrna.length === 0) {
    newErrors.selectedCarrierOfExrna = '*At least one carrier of exRNA must be selected!';
  }

  if (selectedApplicationArea.length === 0) {
    newErrors.selectedApplicationArea = '*At least one application area must be selected!';
  }

  if (selectedResearchExpertise.length === 0) {
    newErrors.selectedResearchExpertise = '*At least one research expertise must be selected!';
  }

  if (selectedTechnicalExpertise.length === 0) {
    newErrors.selectedTechnicalExpertise = '*At least one technical expertise must be selected!';
  }

  if (!location) newErrors.location = '*Location must be selected!';
  if (!role) newErrors.role = '*Role must be selected!';
  
  return newErrors;
};

// Fetch tags from API
export const fetchOrganismTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/organismtags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

export const fetchDrivenProcessTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/drivenprocesstags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

export const fetchClassOfExrnaTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/classofexrnatags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

export const fetchCarrierOfExrnaTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/carrierofexrnatags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

export const fetchApplicationAreaTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/applicationareatags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

export const fetchResearchExpertiseTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/researchexpertisetags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

export const fetchTechnicalExpertiseTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/techexpertisetags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

// Fetch roles from API
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
