import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { m } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector,
  Typography,
  Button,
  Stack,
} from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getJobsAndUnitsInfo } from '../redux/slices/jobDashboardReducer';
// routes
import { PATH_JOB, PATH_JOBS } from '../routes/paths';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { JobInfo, UnitList } from '../sections/jobDashboard';
import Loading from '../sections/Loading';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------
// , 'Make a selection', 'Submit drawing'
const STEPS = ['Complete job info', 'Add units'];

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const { jobInfo, unitList, isLoading } = useSelector((state) => state.jobDashboard);

  useEffect(() => {
    dispatch(getJobsAndUnitsInfo({ jobId }));
  }, [dispatch, jobId]);

  const activeStep = unitList.length > 0 ? 2 : 1;
  // const isComplete = activeStep === STEPS.length;

  const onClickRequestSubmittal = () => {
    navigate(PATH_JOB.submittal(jobId));
  };

  return (
    <Page title="Job: Dashboard">
      <RootStyle>
        {isLoading ? (
          <Loading />
        ) : (
          <Container>
            <HeaderBreadcrumbs
              heading={jobInfo.job_name}
              links={[{ name: 'My jobs', href: PATH_JOBS.root }, { name: jobInfo.job_name }]}
              action={
                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <Button variant="text" startIcon={<Iconify icon={'bxs:download'} />}>
                    Export report
                  </Button>
                </Stack>
              }
            />
            <Card sx={{ padding: '50px', pb: '10px', pt: '20px', mb: 1 }}>
              <Grid container justifyContent={unitList.length > 0 ? 'center' : 'flex-start'}>
                <Grid item xs={12} md={6} sx={{ mb: 5, textAlign: 'left' }}>
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
                <Grid item xs={12} md={6} sx={{ mb: 5, textAlign: { md: 'right', xs: 'left' } }}>
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon={'ant-design:mail-outlined'} />}
                      disabled={unitList.length === 0}
                      onClick={onClickRequestSubmittal}
                    >
                      Request submittal
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ mb: 5, textAlign: 'center' }}>
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
                <JobInfo jobInfo={jobInfo} />
              </Grid>
              <Grid item xs={12} md={8}>
                <UnitList unitInfo={{ jobId, data: unitList }} />
              </Grid>
            </Grid>
          </Container>
        )}
      </RootStyle>
    </Page>
  );
}
