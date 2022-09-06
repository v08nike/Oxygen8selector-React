import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Stack, Button, CardHeader, Typography, CardContent } from '@mui/material';
import { PATH_MY_JOBS } from '../../routes/paths';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(() => ({
  paddingBottom: '15px',
  borderBottom: '1px solid #b9b9b9',
}));

JobInfoCard.propTypes = {
  info: PropTypes.object,
};

export default function JobInfoCard({ info }) {
  const navigate = useNavigate();

  const handleEditRow = (data) => {
    navigate(PATH_MY_JOBS.editJob, { state: data });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeaderStyle
        title="JOB INFO"
        action={
          <Button
            size="small"
            startIcon={<Iconify icon={'eva:edit-fill'} />}
            onClick={() => handleEditRow(info)}
          >
            Edit
          </Button>
        }
      />

      <CardContent>
        <Stack spacing={2}>
          {Object.entries(info).map(([key, value], index) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {key}
              </Typography>
              <Typography variant="subtitle2">{value}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
