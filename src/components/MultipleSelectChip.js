import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, Checkbox, ListItemText } from '@mui/material';

/* It arranges the dropdown menu size. */
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

function getStyles(tag, selectedTags, theme) {
  return {
    fontWeight:
      selectedTags.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ tags, selectedTags, setSelectedTags }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Research Areas</InputLabel>
        <Select
          multiple
          value={selectedTags} // Now using the parent-controlled value
          onChange={handleChange} // Update the parent state
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
            <MenuItem key={tag} value={tag} style={getStyles(tag, selectedTags, theme)}>
              <Checkbox checked={selectedTags.indexOf(tag) > -1} />
              <ListItemText primary={tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

  


