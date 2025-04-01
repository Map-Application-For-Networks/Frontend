import axios from 'axios';

// Form validation function
export const validateForm = ({ institutionTitle, email, phoneNumber, details, visitingStatus, location, role, selectedAreasOfExpertise, selectedTechnologies, selectedModelOrganisms}) => {
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


  if (selectedTechnologies.length === 0) newErrors.selectedTechnologies = '*At least one technology must be selected!';
  if (selectedModelOrganisms.length === 0) newErrors.selectedModelOrganisms = '*At least one model organism must be selected!';
  if (selectedAreasOfExpertise.length === 0) newErrors.selectedAreasOfExpertise = '*At least one area must be selected!';

  if (!location) newErrors.location = '*Location must be selected!';
  if (!role) newErrors.role = '*Role must be selected!';
  
  return newErrors;
};

// Fetch tags from API
export const fetchTechTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/techtags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

export const fetchModelTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/modeltags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tech tags:', error);
  }
};

export const fetchExpertiseAreaTags = async (setTags) => {
  try {
    const response = await axios.get('https://backend-delta-seven-47.vercel.app/api/expertisetags');
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
