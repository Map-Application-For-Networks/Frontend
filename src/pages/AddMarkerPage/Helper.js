import axios from 'axios';

// Form validation function
export const validateForm = ({ institutionTitle, email, phoneNumber, details, selectedTags, visitingStatus, location, role }) => {
  const newErrors = {};
  const phoneRegex = /^\+?[0-9]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!institutionTitle) newErrors.institutionTitle = '*Institution title is required!';
  if (!email) newErrors.email = '*Email is required!';
  else if (!emailRegex.test(email)) newErrors.email = '*Please enter a valid email address!';
  
  if (!phoneNumber) newErrors.phoneNumber = '*Phone number is required!';
  else if (!phoneRegex.test(phoneNumber)) newErrors.phoneNumber = '*Phone number must include only + and digits!';
  
  if (!details) newErrors.details = '*Details are required!';
  if (selectedTags.length === 0) newErrors.selectedTags = '*At least one research area must be selected!';
  if (!visitingStatus) newErrors.visitingStatus = '*Visiting status is required!';
  if (!location) newErrors.location = '*Location must be selected!';
  if (!role) newErrors.role = '*Role must be selected!';

  return newErrors;
};

// Fetch tags from API
export const fetchTags = async (setTags) => {
  try {
    const response = await axios.get('http://localhost:3001/api/tags');
    const fetchedTags = response.data.map(tag => ({
      label: tag.tagName,
      value: tag._id
    }));
    setTags(fetchedTags);
  } catch (error) {
    console.error('Error fetching tags:', error);
  }
};

// Fetch roles from API
export const fetchRoles = async (setRolesList) => {
  try {
    const response = await axios.get('http://localhost:3001/api/roles');
    const roles = response.data.map(role => ({
      label: role.roleName,
      value: role._id
    }));
    setRolesList(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};
