import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
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

// routes
import { PATH_JOBS, PATH_JOB } from '../routes/paths';
// hooks
import useTabs from '../hooks/useTabs';
import useTable, { getComparator, emptyRows } from '../hooks/useTable';
// redux
import { useSelector } from '../redux/store';
import { getJobList, addNewJob, setJobInfo } from '../redux/slices/jobsReducer';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../components/table';
// sections
import { JobsTableToolbar, JobsTableRow } from '../sections/jobslist';
import NewJobFormDialog from '../sections/dialog/NewJobFormDialog';
import ConfirmDialog from '../sections/dialog/ConfirmDialog';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

const ROLE_OPTIONS = ['All', 'My Jobs', 'By Others'];

const TABLE_HEAD = [
  { id: 'projectName', label: 'Project Name', align: 'left' },
  { id: 'referenceNo', label: 'Reference no', align: 'left' },
  { id: 'revNo', label: 'Rev no', align: 'left' },
  { id: 'rep', label: 'Rep', align: 'left' },
  { id: 'createdBy', label: 'Created By', align: 'left' },
  { id: 'revisiedBy', label: 'Revisied By', align: 'left' },
  { id: 'createdDate', label: 'Created Date', align: 'left' },
  { id: 'revisedDate', label: 'Revised Date', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function MyJobs() {
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

  const tableData = useSelector(getJobList);

  // const [tableData, setTableData] = useState(myJobList);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('All');

  const [newJobDialogOpen, setNewJobDialog] = React.useState(false);

  const handleClickNewJobDialogOpen = () => {
    setNewJobDialog(true);
  };

  const handleNewJobDialogClose = () => {
    setNewJobDialog(false);
  };

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
    const deleteRow = tableData.filter((row) => row.jobId !== deleteRowID);
    setSelected([]);
    setDeleteRowID(-1);
    setJobInfo(deleteRow);
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
    const deleteRows = tableData.filter((row) => !selected.includes(row.jobId));
    setSelected([]);
    setJobInfo(deleteRows);
    setMultiConfirmDialogState(false);
  };

  const handleEditRow = (jobid) => {
    navigate(PATH_JOB.dashboard(jobid));
  };

  const handleAddNewJob = (data) => {
    addNewJob({
      jobName: data.jobName,
      referenceNo: data.reference,
      revNo: 1,
      rep: 'Admin',
      createdBy: 'Admin',
      revisiedBy: 'Admin',
      createdDate: '2020-09-23',
      revisedDate: '2020-09-23',
      status: 'Open',
    });
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
    <Page title="Jobs">
      <RootStyle>
        <Container>
          <HeaderBreadcrumbs heading="My Jobs" links={[{ name: 'Job Lists', href: PATH_JOBS.root }]} />

          <Card>
            <JobsTableToolbar
              filterName={filterName}
              filterRole={filterRole}
              onFilterName={handleFilterName}
              onFilterRole={handleFilterRole}
              onOpneDialog={handleClickNewJobDialogOpen}
              optionsRole={ROLE_OPTIONS}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, position: 'relative', overflowX: 'initial!important' }}>
                {selected.length > 0 && (
                  <TableSelectedActions
                    dense={dense}
                    numSelected={selected.length}
                    rowCount={tableData.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row.jobId)
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
                        tableData.map((row) => row.jobId)
                      )
                    }
                  />

                  <TableBody>
                    {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <JobsTableRow
                        key={index}
                        row={row}
                        selected={selected.includes(row.jobId)}
                        onSelectRow={() => onSelectRow(row.jobId)}
                        onDeleteRow={() => handleOneConfirmDialogOpen(row.jobId)}
                        onEditRow={() => handleEditRow(row.jobId)}
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
        </Container>
        <NewJobFormDialog
          newJobDialogOpen={newJobDialogOpen}
          handleNewJobDialogClose={handleNewJobDialogClose}
          addNewJob={handleAddNewJob}
        />
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
      </RootStyle>
    </Page>
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
        item.projectName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.referenceNo.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.rep.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.createdBy.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.createdDate.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.revisedDate.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.status.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
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
