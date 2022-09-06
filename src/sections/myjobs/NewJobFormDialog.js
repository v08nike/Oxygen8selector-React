import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
import { PATH_MY_JOBS } from '../../routes/paths';

NewJobFormDialog.propTypes = {
  newJobDialogOpen: PropTypes.bool,
  handleNewJobDialogClose: PropTypes.func,
  addNewJob: PropTypes.func,
};

export default function NewJobFormDialog({ newJobDialogOpen, handleNewJobDialogClose, addNewJob }) {
  const navigate = useNavigate();

  const applicaitons = [
    { id: '1', label: 'One' },
    { id: '2', label: 'Two' },
    { id: '3', label: 'Three' },
    { id: '4', label: 'Four' },
  ];

  const NewUserSchema = Yup.object().shape({
    jobName: Yup.string().required('Please enter a job name'),
    application: Yup.string().required('Please enter an applicaiton type'),
    reference: Yup.string(),
    companyName: Yup.string(),
  });

  const defaultValues = {
    jobName: '',
    application: '',
    reference: '',
    companyName: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      addNewJob(data);
      // navigate(PATH_MY_JOBS.dashboard, { state: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={newJobDialogOpen} onClose={handleNewJobDialogClose}>
      <DialogTitle>Create new job</DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Card sx={{ p: 3 }}>
            <Box sx={{ minWidth: '500px', display: 'grid', rowGap: 3, columnGap: 2 }}>
              <RHFTextField size="small" name="jobName" label="Job name" />

              <RHFSelect size="small" name="application" label="Application" placeholder="Application">
                <option value="" />
                {applicaitons.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField size="small" name="reference" label="Reference #" />
              <RHFTextField size="small" name="companyName" label="Company name" />
            </Box>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewJobDialogClose}>Cancel</Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Create new job
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
