import { capitalCase } from 'change-case';
import { useLocation, useParams } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Tab, Box, Tabs } from '@mui/material';
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
import { UnitList } from '../sections/unitView';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function ViewUnitInfo() {
  const { themeStretch } = useSettings();
  const { jobId } = useParams();

  const { currentTab, onChangeTab } = useTabs('Unit Info');

  const ACCOUNT_TABS = [
    {
      value: 'Unit Info',
      icon: <Iconify icon={'fa-brands:unity'} width={20} height={20} />,
      component: <UnitList />,
    },
    {
      value: 'Selection',
      icon: <Iconify icon={'mdi:selection-ellipse'} width={20} height={20} />,
      component: <UnitList />,
    },
    {
      value: 'Drawing',
      icon: <Iconify icon={'arcticons:grid-drawing-for-artist'} width={20} height={20} />,
      component: <UnitList />,
    },
    {
      value: 'Layout',
      icon: <Iconify icon={'ant-design:layout-outlined'} width={20} height={20} />,
      component: <UnitList />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={currentTab}
            links={[
              { name: 'My Jobs', href: PATH_JOBS.root },
              { name: 'Job Dashboard', href: PATH_JOB.dashboard(jobId) },
              { name: 'Unit Info', href: PATH_UNIT.view(jobId) },
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
