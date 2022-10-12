import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, Box, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

TableLoadingData.propTypes = {
  isLoading: PropTypes.bool,
};

export default function TableLoadingData({ isLoading }) {
  return (
    <TableRow>
      {isLoading ? (
        <TableCell colSpan={12}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <CircularProgress size="lg" />
          </Box>
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
