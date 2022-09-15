import * as React from 'react';

// import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Card, CardContent, CardActions, Container, Grid, Button, Stack} from '@mui/material';
// form
import { useForm } from 'react-hook-form';
// redux
// import { useSelector } from 'react-redux';
// import { deleteUnit } from '../../redux/slices/jobsReducer';
// components
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';
import { FormProvider, RHFSelect } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function Layout() {
  // const { jobId, unitId } = useParams();

  const defaultValues = {
    heading: 'left',
    sa_opening: '1',
    ea_opening: '2',
    oa_opening: '3',
    ra_opening: '4',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
      reset();
    }
  };
  return (
    <Container>
      <Card>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <RHFSelect size="small" name="heading" label="Handling" placeholder="">
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </RHFSelect>
                    <RHFSelect size="small" name="sa_opening" label="Supply Air Opening" placeholder="">
                      <option value="1">1</option>
                      <option value="1A">1A</option>
                      <option value="2">2</option>
                      <option value="2A">2A</option>
                    </RHFSelect>
                    <RHFSelect size="small" name="ea_opening" label="Exhaust Air Opening" placeholder="">
                      <option value="2">2</option>
                      <option value="2A">2A</option>
                    </RHFSelect>
                    <RHFSelect size="small" name="oa_opening" label="Outdoor Air Opening" placeholder="">
                      <option value="2">3</option>
                      <option value="2A">3A</option>
                    </RHFSelect>
                    <RHFSelect size="small" name="ra_opening" label="Return Air Opening" placeholder="">
                      <option value="2">4</option>
                      <option value="2A">4A</option>
                    </RHFSelect>
                  </Stack>
                </CardContent>
                <CardActions sx={{ textAlign: 'right' }}>
                  <Box sx={{ pl: '15px', pb: '15px' }}>
                    <Button type="submit" variant="text" startIcon={<Iconify icon={'bx:save'} />}>
                      Save
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </FormProvider>
            
          </Grid>
          <Grid item xs={6}>
            <Image src={'/assets/Layouts/layout_nova_in_h_rh.png'} wdith="100%" height="100%"/>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
