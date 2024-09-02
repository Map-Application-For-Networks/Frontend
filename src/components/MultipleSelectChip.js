import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, Checkbox ,ListItemText} from '@mui/material'

/* It arranges the dropdown menu size.*/ 
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(tag, tagName, theme) {
  return {
    fontWeight:
      tagName.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ tags }) {
    const theme = useTheme();
    const [tagName, setTagName] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setTagName(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel>Research Areas</InputLabel>
          <Select
            multiple
            value={tagName}
            onChange={handleChange}
            input={<OutlinedInput label="Research Areas" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag} style={getStyles(tag, tagName, theme)}>
                <Checkbox checked={tagName.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
  


