import React from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import Label from '../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';

export default function NewJobFormDialog({ newJobDialogOpen, handleNewJobDialogClose }) {
  const [Application, setApplication] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setApplication(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const applicaitons = [
    { id: '1', label: 'One' },
    { id: '2', label: 'Two' },
    { id: '3', label: 'Three' },
    { id: '4', label: 'Four' },
  ];

  const NewUserSchema = Yup.object().shape({
    jobName: Yup.string().required('Please enter a job name'),
    application: Yup.string().required('Please enter an applicaiton type'),
  });

  const defaultValues = useMemo(() => ({
    projectName: '',
    application: '',
  }));

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      // navigate(PATH_DASHBOARD.user.list);
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
            <Box>
              <RHFTextField name="jobName" label="Job name" />

              <RHFSelect name="application" label="Application" placeholder="Application">
                <option value="" />
                {applicaitons.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="reference" label="Reference #" />
              <RHFTextField name="companyName" label="Company name" />
            </Box>
          </Card>
          {/* <TextField autoFocus margin="dense" id="jobName" label="Job name" type="text" fullWidth variant="standard" />
          <FormControl variant="standard" sx={{ mt: 2, width: '100%' }}>
            <InputLabel id="demo-simple-select-standard-label">Application</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={Application}
              label="Application"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="dense" id="reference" label="Reference #" type="text" fullWidth variant="standard" />
          <TextField margin="dense" id="companyName" label="Company name" type="text" fullWidth variant="standard" /> */}
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
