import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { m } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Step, Stepper, Container, StepLabel, StepConnector, Typography, Button } from '@mui/material';
// routes
import { PATH_MY_JOBS } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { JobInfoCard, UnitList } from '../../sections/jobDashboard';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------
const jobInfo = [
  { title: 'Project Name', value: 'Welcome' },
  { title: 'Basis of Design', value: 'N/a' },
  { title: 'Reference no', value: '12345678' },
  { title: 'Revision', value: '1' },
  { title: 'Date created', value: '2022-04-14' },
  { title: 'Data revised', value: '2022-04-14' },
  { title: 'Company name', value: 'Test Rep' },
  { title: 'Contact name', value: 'John Doe' },
];

const unitList = [
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
  { tag: 'ERV1', qty: 1, type: 'Energy RecoveryVentilator (ERV)', model: 'B22OU - (525 - 1300 CFM)', cfm: 1000 },
];

const STEPS = ['Complete job info', 'Add units', 'Make a selection', 'Submit drawing'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function StepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify icon={'akar-icons:circle-check'} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Iconify
          icon={'ant-design:close-circle-outlined'}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'darkred' }}
        />
      )}
    </Box>
  );
}

export default function JobDashboard() {
  const [activeStep, setActiveStep] = useState(unitList.length > 0 ? 2 : 1);
  // const isComplete = activeStep === STEPS.length;
  const { state } = useLocation();

  console.log(state);

  return (
    <Page title="Job Dashboard">
      <RootStyle>
        <Container>
          <HeaderBreadcrumbs
            heading={state? state.projectName: 'New Job'}
            links={[{ name: 'My jobs', href: PATH_MY_JOBS.root }, { name: state? state.projectName: 'New Job' }]}
          />
          <Card sx={{ padding: '50px', pb: '10px', pt: '20px', mb: 1 }}>
            <Grid container justifyContent={unitList.length > 0 ? 'center' : 'flex-start'}>
              <Grid item xs={6} md={6} sx={{ mb: 5, textAlign: 'left' }}>
                <Box>
                  <m.div>
                    <Typography color="primary" variant="h5" sx={{ mb: 1 }}>
                      Job Status
                    </Typography>
                  </m.div>
                  <m.div>
                    <Typography sx={{ mb: 2 }}>
                      To request a submittal, you must complete the following 4 steps
                    </Typography>
                  </m.div>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} sx={{ mb: 5, textAlign: 'right' }}>
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<Iconify icon={'ant-design:mail-outlined'} />}
                    disabled={unitList.length === 0}
                  >
                    Request submittal
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} sx={{ mb: 5, textAlign: 'center' }}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                  {STEPS.map((label) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconComponent={StepIcon}
                        sx={{
                          '& .MuiStepLabel-label': {
                            typography: 'subtitle2',
                            color: 'text.disabled',
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            </Grid>
          </Card>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <JobInfoCard info={jobInfo} />
            </Grid>
            <Grid item xs={12} md={8}>
              <UnitList unitList={unitList} />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
