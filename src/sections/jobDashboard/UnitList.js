import PropTypes from 'prop-types';

import { useNavigate } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import {
  Table,
  TableRow,
  CardHeader,
  Card,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
// Paths
import { PATH_UNIT } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Iconify from '../../components/Iconify';
import { TableHeadCustom } from '../../components/table';
import Scrollbar from '../../components/Scrollbar';
import EmptyContent from '../../components/EmptyContent';

// ----------------------------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(() => ({
  paddingBottom: '15px',
  borderBottom: '1px solid #b9b9b9',
}));

const TABLE_HEAD = [
  { id: 'tag', label: 'Tag' },
  { id: 'qty', label: 'Qty' },
  { id: 'type', label: 'Type' },
  { id: 'modal', label: 'Modal' },
  { id: 'cfm', label: 'CFM' },
];

// ----------------------------------------------------------------------

UnitList.propTypes = {
  unitInfo: PropTypes.object.isRequired,
};

export default function UnitList({ unitInfo }) {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'sm');

  const { jobId, data } = unitInfo;

  const hanndleEditUnitList = () => {
    navigate(PATH_UNIT.view(jobId));
  };

  const hanndleAddNewUnit = () => {
    navigate(PATH_UNIT.add(jobId));
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeaderStyle
        title={
          <Typography variant="h6">
            Unit List
            <Typography component="span" sx={{ color: 'text.secondary' }}>
              &nbsp;({data.length} item)
            </Typography>
          </Typography>
        }
        sx={{ mb: 2 }}
        action={
          <>
            {isDesktop ? (
              <Button size="small" disabled={data.length === 0} onClick={hanndleEditUnitList} startIcon={<Iconify icon={'eva:edit-fill'} />}>
                Edit Unit List
              </Button>
            ) : (
              <IconButton aria-label="delete" disabled={data.length === 0}>
                <Iconify icon={'eva:edit-fill'} />
              </IconButton>
            )}
            &nbsp;&nbsp;
            {isDesktop ? (
              <Button size="small" onClick={hanndleAddNewUnit} startIcon={<Iconify icon={'akar-icons:plus'} />}>
                Add new unit
              </Button>
            ) : (
              <IconButton aria-label="delete">
                <Iconify icon={'akar-icons:plus'} />
              </IconButton>
            )}
          </>
        }
      />

      {data.length !== 0 ? (
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720, maxHeight: '320px' }}>
            <Table stickyHeader>
              <TableHeadCustom headLabel={TABLE_HEAD} />

              <TableBody>
                {data.map((row, index) => (
                  <UnitListRow key={index} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      ) : (
        <EmptyContent title="Cart is empty" description="Look like you have no items in your shopping cart." />
      )}
    </Card>
  );
}

// ----------------------------------------------------------------------

UnitListRow.propTypes = {
  row: PropTypes.object,
};

function UnitListRow({ row }) {
  const { tag, qty, unit_type, unit_model, cfm } = row;

  return (
    <TableRow>
      <TableCell>{tag}</TableCell>
      <TableCell>{qty}</TableCell>
      <TableCell>{unit_type}</TableCell>
      <TableCell>{unit_model}</TableCell>
      <TableCell>{cfm}</TableCell>
    </TableRow>
  );
}
