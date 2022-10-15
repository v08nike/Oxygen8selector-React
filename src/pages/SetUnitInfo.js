import React, { useEffect } from 'react';
import { capitalCase } from 'change-case';
import { useLocation, useParams } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Tab, Box, Tabs } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getInitUnitinfo } from '../redux/slices/unitReducer';
// routes
import { PATH_JOBS, PATH_JOB, PATH_UNIT } from '../routes/paths';
// hooks
import useTabs from '../hooks/useTabs';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { UnitEdit, Drawing, Layout, Selection } from '../sections/configureUnit';
import Loading from '../sections/Loading';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function SetUnitInfo() {
  const { themeStretch } = useSettings();
  const { jobId, unitId } = useParams();
  const { state } = useLocation();
  // console.log(state);
  const dispatch = useDispatch();
  const { currentTab, onChangeTab } = useTabs('Unit Info');
  const { unitInfo } = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(
      getInitUnitinfo({
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
        intProductTypeID: state.productType,
        intUnitTypeID: state.unitType,
        intUnitNo: unitId === undefined ? -1 : unitId,
      })
    );
  }, [dispatch, state, jobId, unitId]);

  const isLoading = JSON.stringify(unitInfo) === '{}';

  const ACCOUNT_TABS = !isLoading
    ? [
        {
          value: 'Unit Info',
          icon: <Iconify icon={'fa-brands:unity'} width={20} height={20} />,
          component: <UnitEdit unitType={state.unitType.toString()} productType={state.productType} />,
        },
        {
          value: 'Layout',
          icon: <Iconify icon={'ant-design:layout-outlined'} width={20} height={20} />,
          component: <Layout unitType={state.unitType.toString()} productType={state.productType} />,
        },
        {
          value: 'Drawing',
          icon: <Iconify icon={'arcticons:grid-drawing-for-artist'} width={20} height={20} />,
          component: <Drawing />,
        },
        {
          value: 'Selection',
          icon: <Iconify icon={'mdi:selection-ellipse'} width={20} height={20} />,
          component: <Selection />,
        },
      ]
    : [];

  return isLoading ? (
    <Loading />
  ) : (
    <Page title="Unit: View">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={currentTab}
            links={[
              { name: 'My Jobs', href: PATH_JOBS.root },
              { name: 'Job Dashboard', href: PATH_JOB.dashboard(jobId) },
              { name: currentTab },
            ]}
          />

          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          <Box sx={{ mb: 5 }} />

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Container>
      </RootStyle>
    </Page>
  );
}
