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
} from '@mui/material';
// Paths
import { PATH_UNIT } from '../../routes/paths';
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

  const { jobId, data } = unitInfo;

  const hanndleEditUnitList = () => {
    navigate(PATH_UNIT.view(jobId));
  };

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
            <Button size="small" onClick={hanndleEditUnitList} startIcon={<Iconify icon={'eva:edit-fill'} />}>
              Edit unit list
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button size="small" startIcon={<Iconify icon={'akar-icons:plus'} />}>
              Add new unit
            </Button>
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
  row: PropTypes.shape({
    tag: PropTypes.string,
    qty: PropTypes.number,
    type: PropTypes.string,
    modal: PropTypes.string,
    cfm: PropTypes.number,
  }),
};

function UnitListRow({ row }) {
  const { tag, qty, type, modal, cfm } = row;

  return (
    <TableRow>
      <TableCell>{tag}</TableCell>
      <TableCell>{qty}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{modal}</TableCell>
      <TableCell>{cfm}</TableCell>
    </TableRow>
  );
}
