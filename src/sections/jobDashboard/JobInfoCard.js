import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Stack, Button, CardHeader, Typography, CardContent } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(() => ({
  paddingBottom: '15px',
  borderBottom: '1px solid #b9b9b9',
}));

JobInfoCard.propTypes = {
  info: PropTypes.array,
};

export default function JobInfoCard({ info }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeaderStyle
        title="JOB INFO"
        action={
          <Button href="/editJobInfo" size="small" startIcon={<Iconify icon={'eva:edit-fill'} />}>
            Edit
          </Button>
        }
      />

      <CardContent>
        <Stack spacing={2}>
          {info.map((item, index) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.title}
              </Typography>
              <Typography variant="subtitle2">{item.value}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
