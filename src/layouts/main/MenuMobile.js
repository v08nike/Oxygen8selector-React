import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, List, Link, Drawer, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
// config
import { NAVBAR } from '../../config';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { IconButtonAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuMobile({ isOffset, navConfig }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon={'eva:menu-2-fill'} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig[0].items.map((link, index) => (
              <MenuMobileItem key={index} item={link} handleDrawerClose={handleDrawerClose} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
  handleDrawerClose: PropTypes.func,
};

function MenuMobileItem({ item, handleDrawerClose }) {
  const { title, path, icon } = item;

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      }}
      onClick={handleDrawerClose}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}
