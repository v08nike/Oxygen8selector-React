import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton, Button, Drawer, Divider, Link } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const BoxStyle = styled(Button)(() => ({
  borderRadius: '50%',
  border: '1px solid #a3a3a3',
  width: 300,
  height: 300,
  margin: 'auto',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const ImageBorderStyle = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  border: '1px solid #484848',
}));

// ----------------------------------------------------------------------
SideDescription.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  drawerInfo: PropTypes.any,
};
export default function SideDescription({ open, handleDrawerClose, drawerInfo }) {
  const { image, description } = drawerInfo;
  return (
    <Drawer
      sx={{
        width: '500px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '500px',
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Box sx={{ padding: 3 }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <Iconify icon={'iconoir:cancel'} />
          </IconButton>
        </DrawerHeader>
        <Box
          sx={{
            display: 'grid',
            rowGap: 3,
            columnGap: 2,
            gridTemplateColumns: 'repeat(1, 1fr)',
          }}
        >
          <ImageBorderStyle>
            <img src={image} alt={description} width="100%" />
          </ImageBorderStyle>
          <Box>
            <Typography variant="body2" component="body2">
              {description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" component="body2">
              {description}
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
    </Drawer>
  );
}
