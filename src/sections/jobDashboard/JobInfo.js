import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Stack, Button, CardHeader, Typography, CardContent } from '@mui/material';
import { PATH_JOB } from '../../routes/paths';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(() => ({
  paddingBottom: '15px',
  borderBottom: '1px solid #b9b9b9',
}));

JobInfo.propTypes = {
  jobInfo: PropTypes.object,
};

export default function JobInfo({ jobInfo }) {
  const navigate = useNavigate();

  const handleEditJobInfo = () => {
    navigate(PATH_JOB.jobEdit(jobInfo.jobId));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeaderStyle
        title="JOB INFO"
        action={
          <Button
            size="small"
            startIcon={<Iconify icon={'eva:edit-fill'} />}
            onClick={() => handleEditJobInfo()}
          >
            Edit
          </Button>
        }
      />

      <CardContent>
        <Stack spacing={2}>
          {Object.entries(jobInfo).map(([key, value], index) => (
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
