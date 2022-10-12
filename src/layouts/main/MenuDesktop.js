import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Stack,} from '@mui/material';
// components
// import Iconify from '../../components/Iconify';
import { NavSectionHorizontal } from '../../components/nav-section';

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));

// ----------------------------------------------------------------------

MenuDesktop.propTypes = {
  navConfig: PropTypes.array,
};

export default function MenuDesktop({ navConfig }) {
  return (
    <Stack direction="row">
      <NavSectionHorizontal navConfig={navConfig} />
    </Stack>
  );
}

// ----------------------------------------------------------------------

IconBullet.propTypes = {
  type: PropTypes.oneOf(['item', 'subheader']),
};

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

MenuDesktopItem.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
  }),
};

function MenuDesktopItem({ item }) {
  const { title, path } = item;

  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        color: 'text.primary',
        '&.active': {
          color: 'primary.main',
        },
      }}
    >
      {title}
    </LinkStyle>
  );
}
