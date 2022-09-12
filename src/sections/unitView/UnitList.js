import * as React from 'react';
// import { paramCase } from 'change-case';
import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

// redux
import { useSelector } from 'react-redux';
import { deleteUnit } from '../../redux/slices/jobsReducer';
// hooks
import useTabs from '../../hooks/useTabs';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import UnitTableToolbar from './UnitTableToolbar';
import UnitTableRow from './UnitTableRow';
import ConfirmDialog from '../dialog/ConfirmDialog';
import { PATH_UNIT } from '../../routes/paths';
// ----------------------------------------------------------------------

const ROLE_OPTIONS = ['All', 'My Jobs', 'By Others'];

const TABLE_HEAD = [
  { id: 'tag', label: 'Tag', align: 'left' },
  { id: 'qty', label: 'Qty', align: 'left' },
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'modal', label: 'Modal', align: 'left' },
  { id: 'cfm', label: 'CFM', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UnitList() {
  const { jobId } = useParams();

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const dense = true;

  const navigate = useNavigate();
  const unitList = useSelector((state) => state.jobs.unitList.filter((item) => item.jobId.toString() === jobId)[0]);

  const [tableData, setTableData] = useState(unitList.data);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('All');

  // Delete one row
  const [isOneConfirmDialog, setOneConfirmDialogState] = React.useState(false);
  const [isOpenMultiConfirmDialog, setMultiConfirmDialogState] = React.useState(false);
  const [deleteRowID, setDeleteRowID] = React.useState(-1);

  const handleOneConfirmDialogOpen = (id) => {
    setDeleteRowID(id);
    setOneConfirmDialogState(true);
  };

  const handleOneConfirmDialogClose = () => {
    setDeleteRowID(-1);
    setOneConfirmDialogState(false);
  };

  const handleDeleteRow = () => {
    const deleteRow = tableData.filter((row) => row.unitId !== deleteRowID);
    setSelected([]);
    setDeleteRowID(-1);
    deleteUnit({ jobId, data: deleteRow });
    setTableData(deleteRow);
    handleOneConfirmDialogClose(false);
  };

  const handleMultiConfirmDialogOpen = () => {
    setMultiConfirmDialogState(true);
  };

  const handleMultiConfirmDialogClose = () => {
    setMultiConfirmDialogState(false);
  };

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('All');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };
  const handleFilterRole = (value) => {
    setFilterRole(value);
  };

  const handleDeleteRows = () => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.unitId));
    setSelected([]);
    deleteUnit({ jobId, data: deleteRows });
    setTableData(deleteRows);
    setMultiConfirmDialogState(false);
  };

  const handleEditRow = (unitId) => {
    navigate(PATH_UNIT.edit(jobId, unitId));
  };

  const handleClickNewUnit = () => {
    navigate(PATH_UNIT.add(jobId));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Container>
      <Card>
        <UnitTableToolbar
          filterName={filterName}
          filterRole={filterRole}
          onFilterName={handleFilterName}
          onFilterRole={handleFilterRole}
          onAddNewUnit={handleClickNewUnit}
          optionsRole={ROLE_OPTIONS}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {selected.length > 0 && (
              <TableSelectedActions
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.unitId)
                  )
                }
                actions={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={() => handleMultiConfirmDialogOpen()}>
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.unitId)
                  )
                }
              />

              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <UnitTableRow
                    key={index}
                    row={row}
                    selected={selected.includes(row.unitId)}
                    onSelectRow={() => onSelectRow(row.unitId)}
                    onDeleteRow={() => handleOneConfirmDialogOpen(row.unitId)}
                    onEditRow={() => handleEditRow(row.unitId)}
                  />
                ))}

                <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Box>
      </Card>
      <ConfirmDialog
        isOpen={isOneConfirmDialog}
        onClose={handleOneConfirmDialogClose}
        onConfirm={handleDeleteRow}
        isOneRow
      />
      <ConfirmDialog
        isOpen={isOpenMultiConfirmDialog}
        onClose={handleMultiConfirmDialogClose}
        onConfirm={handleDeleteRows}
        isOneRow={false}
      />
    </Container>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) =>
        item.tag.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.qty.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.type.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.modal.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.cfm.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'All') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'All') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  return tableData;
}