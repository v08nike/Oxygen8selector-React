import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

// @mui
import { Box, Card, CardContent, CardActions, Container, Grid, Button, Stack } from '@mui/material';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// redux
import { useSelector } from '../../redux/store';
// components
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';
import { FormProvider, RHFSelect } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function Layout() {
  const { jobId, unitId } = useParams();
  const isEdit = unitId !== undefined;
  const { controlInfo, unitInfo, visibleInfo } = useSelector((state) => state.unit);

  const [ddlExhaustAirOpening, setddlExhaustAirOpening] = useState(['2', '2A']);
  const [ddlOutdoorAirOpening, setddlOutdoorAirOpening] = useState(['4', '4A']);
  const [ddlReturnAirOpening, setddlReturnAirOpening] = useState(['3', '3A']);

  console.log(ddlExhaustAirOpening, ddlOutdoorAirOpening, ddlReturnAirOpening);

  const layoutSchema = Yup.object().shape({
    ddlHandingID: Yup.number().required('This field is required!'),
    ddlSupplyAirOpeningID: Yup.number().required('This field is required!'),
    ddlSupplyAirOpeningText: Yup.string(),
    ddlExhaustAirOpeningID: Yup.number().required('This field is required!'),
    ddlExhaustAirOpeningText: Yup.string(),
    ddlOutdoorAirOpeningID: Yup.number().required('This field is required!'),
    ddlOutdoorAirOpeningText: Yup.string(),
    ddlReturnAirOpeningID: Yup.number().required('This field is required!'),
    ddlReturnAirOpeningText: Yup.string(),
  });

  const defaultValues = {
    ddlHandingID: isEdit ? unitInfo.ddlHandingValue : 1,
    ddlSupplyAirOpeningID: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlExhaustAirOpeningID: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlOutdoorAirOpeningID: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlReturnAirOpeningID: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
  };

  const methods = useForm({
    resolver: yupResolver(layoutSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    getValues,
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

  const ddlHandingChanged = (e) => {
    setValue('ddlHandingID', e.target.value);
    setValue('ddlSupplyAirOpeningID', 1);
    setValue('ddlSupplyAirOpeningText', '1');
    setValue('ddlExhaustAirOpeningID', 1);
    setValue('ddlExhaustAirOpeningText', '2');
    setValue('ddlOutdoorAirOpeningID', 1);
    setValue('ddlOutdoorAirOpeningText', '4');
    setValue('ddlReturnAirOpeningID', 1);
    setValue('ddlReturnAirOpeningText', '3');
    setddlExhaustAirOpening(['2', '2A']);
    setddlOutdoorAirOpening(['4', '4A']);
    setddlReturnAirOpening(['3', '3A']);
  };

  const ddlSupplyAirOpeningChanged = (e) => {
    setValue('ddlSupplyAirOpeningID', e.target.value);
    setValue('ddlSupplyAirOpeningText', e.target.options[e.target.selectedIndex].text);
    setValue('ddlExhaustAirOpeningID', 1);
    setValue('ddlOutdoorAirOpeningID', 1);
    setValue('ddlReturnAirOpeningID', 1);
    if (e.target.selectedIndex === 2 || e.target.selectedIndex === 3) {
      setValue('ddlExhaustAirOpeningText', '1');
      setValue('ddlOutdoorAirOpeningText', '3');
      setValue('ddlReturnAirOpeningText', '4');
      setddlExhaustAirOpening(['1', '1A']);
      setddlOutdoorAirOpening(['3', '3A']);
      setddlReturnAirOpening(['4', '4A']);
    } else {
      setValue('ddlExhaustAirOpeningText', '2');
      setValue('ddlOutdoorAirOpeningText', '4');
      setValue('ddlReturnAirOpeningText', '3');
      setddlExhaustAirOpening(['2', '2A']);
      setddlOutdoorAirOpening(['4', '4A']);
      setddlReturnAirOpening(['3', '3A']);
    }
  };

  const ddlExhaustAirOpeningChanged = (e) => {
    setValue('ddlExhaustAirOpeningID', e.target.value);
    setValue('ddlExhaustAirOpeningText', e.target.options[e.target.selectedIndex].text);
  };

  const ddlOutdoorAirOpeningChanged = (e) => {
    setValue('ddlOutdoorAirOpeningID', e.target.value);
    setValue('ddlOutdoorAirOpeningText', e.target.options[e.target.selectedIndex].text);
  };

  const ddlReturnAirOpeningChanged = (e) => {
    setValue('ddlReturnAirOpeningID', e.target.value);
    setValue('ddlReturnAirOpeningText', e.target.options[e.target.selectedIndex].text);
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
                    <RHFSelect
                      size="small"
                      name="ddlHandingID"
                      label="Handling"
                      placeholder=""
                      onChange={ddlHandingChanged}
                    >
                      <option value="1">Left</option>
                      <option value="2">Right</option>
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlSupplyAirOpeningID"
                      label="Supply Air Opening"
                      placeholder=""
                      onChange={ddlSupplyAirOpeningChanged}
                    >
                      <option value="1">1</option>
                      <option value="2">1A</option>
                      <option value="3">2</option>
                      <option value="4">2A</option>
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlExhaustAirOpeningID"
                      label="Exhaust Air Opening"
                      placeholder=""
                      onChange={ddlExhaustAirOpeningChanged}
                    >
                      {ddlExhaustAirOpening.map((item, index) => (
                        <option key={index} value={index + 1}>
                          {item}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlOutdoorAirOpeningID"
                      label="Outdoor Air Opening"
                      placeholder=""
                      onChange={ddlOutdoorAirOpeningChanged}
                    >
                      {ddlOutdoorAirOpening.map((item, index) => (
                        <option key={index} value={index + 1}>
                          {item}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlReturnAirOpening"
                      label="Return Air Opening"
                      placeholder=""
                      onChange={ddlReturnAirOpeningChanged}
                    >
                      {ddlReturnAirOpening.map((item, index) => (
                        <option key={index} value={index + 1}>
                          {item}
                        </option>
                      ))}
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
            <Image src={'/assets/Layouts/layout_nova_in_h_rh.png'} wdith="100%" height="100%" />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
