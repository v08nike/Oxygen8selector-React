import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { CardHeader, CardContent, Card, Box, Link } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
// components
import UnitItem from './UnitItem';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
    marginLeft: 0,
  }),
}));

const ImageBorderStyle = styled(Box)(() => ({
  borderRadius: '10px',
  border: '1px solid #484848',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  paddingTop: '100px',
}));

SelectModel.propTypes = {
  ModelData: PropTypes.array,
};
export default function SelectModel({ ModelData }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedId, setselctedId] = useState(-1);

  const handleDrawerOpen = (id) => {
    setselctedId(id);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Main open={open}>
          <Card sx={{ minWidth: 500 }}>
            <CardHeader title="Select Model" sx={{ textAlign: 'center' }} />
            <CardContent>
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                }}
              >
                {ModelData.map((item, index) => (
                  <UnitItem
                    key={index}
                    id={index}
                    info={item}
                    onSelectItem={handleDrawerOpen}
                    active={selectedId === index}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>{' '}
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          {selectedId !== -1 && (
            <Box sx={{ padding: 3 }}>
              <DrawerHeader sx={{ pb: 2, pl: 0 }}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <Iconify icon={'akar-icons:chevron-left'} />
                  ) : (
                    <Iconify icon={'akar-icons:chevron-right'} />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: 'repeat(1, 1fr)',
                  pb: '200px',
                }}
              >
                <ImageBorderStyle>
                  <img src={ModelData[selectedId].image} alt={ModelData[selectedId].description} width="100%" />
                </ImageBorderStyle>

                <Box>
                  <Typography variant="body2" component="p">
                    {ModelData[selectedId].description}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" component="p">
                    {ModelData[selectedId].description}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'grid',
                    rowGap: 2,
                    columnGap: 1,
                    gridTemplateColumns: 'repeat(1, 1fr)',
                  }}
                >
                  <Typography color="primary" variant="h6" textAlign={'left'}>
                    LEARN MORE
                  </Typography>

                  <Link component="button" variant="body2" textAlign={'left'} color="black">
                    <Iconify icon={'bxs:download'} />
                    View product brocure
                  </Link>
                  <Link component="button" variant="body2" textAlign={'left'} color="black">
                    <Iconify icon={'bxs:download'} />
                    View product brocure
                  </Link>
                  <Link component="button" variant="body2" textAlign={'left'} color="black">
                    <Iconify icon={'bxs:download'} />
                    View product brocure
                  </Link>
                </Box>
              </Box>
            </Box>
          )}
        </Drawer>
      </Box>
    </>
  );
}
