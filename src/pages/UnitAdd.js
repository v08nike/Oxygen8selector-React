import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Step, Stepper, Container, StepLabel, StepConnector, Button } from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getUnitTypeInfo } from '../redux/slices/unitReducer';
// routes
import { PATH_JOBS, PATH_JOB, PATH_UNIT } from '../routes/paths';
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
  bottom: 0
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
  const { jobId } = useParams();
  const [activeStep, setActiveStep] = useState(1);
  const [selectStep, setActiveSelectStep] = useState(0);
  const [unitData, setUnitData] = useState();
  const [projecTypeId, setProjectTypeId] = useState(0);
  const { productType, unitType, productTypeUnitTypeLink, isLoading } = useSelector((state) => state.unit);

  console.log(productType, unitType);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isComplete = activeStep === STEPS.length;

  const onSelectProductFamilyItem = (value) => {
    setProjectTypeId(value);
    setUnitData({ ...unitData, productType: value });
    setActiveSelectStep(1);
  };

  const onSelectProductModelItem = (value) => {
    setUnitData({ ...unitData, unitType: value });
  };

  const onClickNextStep = () => {
    console.log(unitData);
    navigate(PATH_UNIT.configure(jobId), { state: unitData });
  };

  useEffect(() => {
    dispatch(getUnitTypeInfo({ jobId }));
  }, [dispatch, jobId]);

  return (
    <Page title="Unit: Add">
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
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
              <SelectProductFamily ProductFamilyData={productType} onSelectItem={onSelectProductFamilyItem} />
            ) : (
              <SelectModel
                modelData={{ unitType, productTypeUnitTypeLink }}
                currentProductTypeId={projecTypeId}
                onSelectItem={onSelectProductModelItem}
              />
            )}
          </Container>
          <FooterStepStyle>
            <Grid container>
              <Grid item xs={2} textAlign="center">
                <Button href={PATH_JOB.dashboard(jobId)} color="primary" type="button">
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
                <Button color="primary" onClick={onClickNextStep} disabled={selectStep === 0 || unitData.unitType === undefined || unitType === undefined}>
                  Next Step
                  <Iconify icon={'akar-icons:arrow-right'} />
                </Button>
              </Grid>
            </Grid>
          </FooterStepStyle>
        </RootStyle>
      )}
    </Page>
  );
}
