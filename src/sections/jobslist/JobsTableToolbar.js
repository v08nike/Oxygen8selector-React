import * as React from 'react';

import PropTypes from 'prop-types';
import { Stack, IconButton, InputAdornment, TextField, Menu, MenuItem, Button, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
  onOpneDialog: PropTypes.func,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserTableToolbar({ filterName, onFilterName, onFilterRole, optionsRole, onOpneDialog }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    onFilterRole(event);
    setAnchorEl(null);
  };

  return (
    <Stack
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ py: 2.5, px: 3 }}
    >
      <Item sx={{ width: { md: '20%', xs: '100%' } }}>
        <IconButton aria-label="filter" id="role" label="Role" sx={{ fontSize: '16px' }} onClick={handleClick}>
          <Iconify icon={'codicon:filter-filled'} /> Filter
        </IconButton>
        <Menu
          id="role"
          MenuListProps={{
            'aria-labelledby': 'role',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose('All')}
          PaperProps={{
            style: {
              maxHeight: '300px',
              width: '20ch',
            },
          }}
        >
          {optionsRole.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
              }}
              onClick={(event) => handleClose(event.target.attributes.value.value)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Item>
      <Item sx={{ width: { md: '60%', xs: '100%' } }}>
        <TextField
          fullWidth
          size="small"
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search Jobs..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </Item>
      <Item sx={{ width: { md: '20%', xs: '100%' } }}>
        <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={onOpneDialog}>
          Create New Job
        </Button>
      </Item>
    </Stack>
  );
}
