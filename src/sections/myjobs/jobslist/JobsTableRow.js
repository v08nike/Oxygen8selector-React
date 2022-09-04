import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Divider } from '@mui/material';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { projectName, referenceNo, revNo, rep, createdBy, revisiedBy, createdDate,  revisedDate, status} = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover sx={{ borderBottom: '1px solid #a7b1bc' }} selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        {projectName}
      </TableCell>
      <TableCell align="left">{referenceNo}</TableCell>
      <TableCell align="left">
        {revNo}
      </TableCell>

      <TableCell align="center">{rep}</TableCell>
      <TableCell align="center">{createdBy}</TableCell>
      <TableCell align="center">{revisiedBy}</TableCell>
      <TableCell align="center">{createdDate}</TableCell>
      <TableCell align="center">{revisedDate}</TableCell>
      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'pending' && 'info') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                sx={{ color: 'info.main' }}
              >
                <Iconify icon={'akar-icons:eye'} />
                View Job
              </MenuItem>            
              <MenuItem
                sx={{ color: 'info.main' }}
              >
                <Iconify icon={'codicon:copy'} />
                Duplicate
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>);
}
