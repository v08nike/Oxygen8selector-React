// @mui
import { styled } from '@mui/material/styles';
import { Container, Card, CardHeader, CardContent, Grid, List, ListItem, IconButton, Link } from '@mui/material';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// hooks
import useTabs from '../hooks/useTabs';
// ----------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: 'white',
  background: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

const groups = [
  {
    commercial: {
      name: 'Literature & Brochures Commercial',
      items: [
        {
          title: 'Flexible Connections',
          href: '/assets/Layouts/layout_nova_in_h_lh.png',
          icon: 'fluent:document-pdf-20-regular',
          state: 1,
        },
        {
          title: 'Flexible Connections',
          href: '/assets/Layouts/layout_nova_in_h_lh.png',
          icon: 'fluent:document-pdf-20-regular',
          state: 1,
        },
        {
          title: 'Flexible Connections',
          href: '/assets/Layouts/layout_nova_in_h_lh.png',
          icon: 'fluent:document-pdf-20-regular',
          state: 1,
        },
        {
          title: 'Flexible Connections',
          href: '/assets/Layouts/layout_nova_in_h_lh.png',
          icon: 'fluent:document-pdf-20-regular',
          state: 1,
        },
        {
          title: 'Flexible Connections',
          href: '/assets/Layouts/layout_nova_in_h_lh.png',
          icon: 'fluent:document-pdf-20-regular',
          state: 1,
        },
        {
          title: 'Flexible Connections',
          href: '/assets/Layouts/layout_nova_in_h_lh.png',
          icon: 'fluent:document-pdf-20-regular',
          state: 1,
        },
      ],
    },
    residential: {
      name: 'Literature & Brochures Commercial',
      items: [
        {
          title: 'Flexible Connections',
          href: '/public/assets/Layoutslayout_nova_in_h_lh.png',
          icon: 'fluent:document-pdf-20-regular',
          state: 1,
        },
      ],
    },
  },
];

export default function Resources() {
  const { currentTab, onChangeTab } = useTabs('general');
  return (
    <Page title="Resources">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <HeaderBreadcrumbs heading="Resources" links={[{ name: 'Resources' }]} />
          {groups.map((group, index) => (
            <Grid key={index} container spacing={1} sx={{ mt: 2, display: 'flex' }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardHeaderStyle title={group.commercial.name} />
                  <CardContent>
                    <List dense>
                      {group.commercial.items.map((item, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                              <Iconify icon={item.icon} />
                            </IconButton>
                          }
                        >
                          <Link
                            component="a"
                            href={item.href}
                            sx={{
                              fontWeight: item.state ? '1000' : '300',
                              cursor: item.state ? 'pointor' : 'not-allowed',
                            }}
                            download
                          >
                            {item.title}
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardHeaderStyle title={group.residential.name} />
                  <CardContent>
                    <List dense>
                      {group.residential.items.map((item, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                              <Iconify icon={item.icon} />
                            </IconButton>
                          }
                        >
                          <Link href="#">{item.title}</Link>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Container>
      </RootStyle>
    </Page>
  );
}
