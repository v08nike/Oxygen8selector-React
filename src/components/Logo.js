import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const LogoStyle = styled('img')(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto"
}));


Logo.propTypes = {
  width: PropTypes.number,
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ width, disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = '/logo/logo_single.svg';

  const logo = (
    <Box sx={{ width, height: 40, ...sx }}>
      <LogoStyle src = "/logo/logo_single.svg" width="400px" height="100%" viewBox="0 0 512 512"/>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
