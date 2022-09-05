import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton, Button } from '@mui/material';
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

// ----------------------------------------------------------------------
UnitItem.propTypes = {
  info: PropTypes.object,
  onSelectItem: PropTypes.func,
  id: PropTypes.number,
  active: PropTypes.bool,
};
export default function UnitItem({ info, onSelectItem, id, active }) {
  const { title, image } = info;
  return (
    <Box textAlign={'center'}>
      <BoxStyle
        id={id}
        onClick={() => onSelectItem(id)}
        sx={{
          borderColor: active ? 'primary.main' : '#a3a3a3',
        }}
      >
        <img src={image} width="100%" height="100%" alt={title} />
      </BoxStyle>
      <Box sx={{ textAlign: 'center', fontSize: '14px' }}>
        <Typography variant="p">
          {title}{' '}
          <span>
            <IconButton aria-label="info" sx={{ padding: '5px', pt: 0 }}>
              <Iconify icon={'ant-design:exclamation-circle-outlined'} />
            </IconButton>
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
