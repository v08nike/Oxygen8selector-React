import PropTypes from 'prop-types';
import React, { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Step, Stepper, Container, StepLabel, StepConnector, Button } from '@mui/material';
// _mock_
import { _modelInfos, _productFamilyInfos } from '../_mock';
// routes
import { PATH_JOBS } from '../routes/paths';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { SelectModel, SelectProductFamily } from '../sections/addNewUnit';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const FooterStepStyle = styled(Card)(() => ({
  borderRadius: 0,
  background: '#fff',
  paddingTop: '20px',
  position: 'absolute',
  padding: '30px',
  zIndex: 1250,
  width: '100%',
}));

// ----------------------------------------------------------------------

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
  let icon;
  let color;
  if (active) {
    icon = 'ant-design:exclamation-circle-outlined';
    color = 'primary.main';
  } else if (completed) {
    icon = 'akar-icons:circle-check';
    color = 'primary.main';
  } else {
    icon = 'ant-design:close-circle-outlined';
    color = 'darkred';
  }

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
      <Iconify icon={icon} sx={{ zIndex: 1, width: 20, height: 20, color }} />
    </Box>
  );
}

export default function AddNewUnit() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectStep, setActiveSelectStep] = useState(0);
  const [unitData, setUnitData] = useState();
  // const isComplete = activeStep === STEPS.length;

  const onSelectProductFamilyItem = (type, value) => {
    if (type === "family"){
      setUnitData({...unitData, fimily: value});
      setActiveSelectStep(1);
    }
  };

  return (
    <Page title="Unit: Add">
      <RootStyle>
        <Container>
          <HeaderBreadcrumbs
            heading="Add New Unit"
            links={[
              { name: 'My jobs', href: PATH_JOBS.root },
              // { name: 'Selected Job', href: PATH_MY_JOBS.dashboard },
              { name: 'Add New Unit' },
            ]}
            sx={{ paddingLeft: '24px', paddingTop: '24px' }}
          />

          {selectStep === 0 ? (
            <SelectProductFamily ProductFamilyData={_productFamilyInfos} onSelectItem={onSelectProductFamilyItem} />
          ) : (
            <SelectModel ModelData={_modelInfos} />
          )}
        </Container>
        <FooterStepStyle>
          <Grid container>
            <Grid item xs={2} textAlign="center">
              <Button href='/jobDashboard' color="primary" type="button">
                <Iconify icon={'akar-icons:arrow-left'} />
                Back to job dashboard
              </Button>
            </Grid>
            <Grid item xs={8}>
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
            <Grid item xs={2} textAlign="center">
              <Button color="primary">
                Next Step
                <Iconify icon={'akar-icons:arrow-right'} />
              </Button>
            </Grid>
          </Grid>
        </FooterStepStyle>
      </RootStyle>
    </Page>
  );
}
