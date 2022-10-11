import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { Box, Card, CardContent, CardActions, Container, Grid, Button, Stack, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import * as unitReducer from '../../redux/slices/unitReducer';
// components
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';
import { FormProvider, RHFSelect } from '../../components/hook-form';

// ----------------------------------------------------------------------

Layout.propTypes = {
  unitType: PropTypes.string,
  productType: PropTypes.number,
};
export default function Layout({ productType, unitType }) {
  const dispatch = useDispatch();
  const { jobId, unitId } = useParams();
  const isEdit = unitId !== undefined;
  const { controlInfo, unitInfo, visibleInfo } = useSelector((state) => state.unit);

  const [ddlExhaustAirOpening, setddlExhaustAirOpening] = useState(['2', '2A']);
  const [ddlOutdoorAirOpening, setddlOutdoorAirOpening] = useState(['4', '4A']);
  const [ddlReturnAirOpening, setddlReturnAirOpening] = useState(['3', '3A']);

  const { ddlCoolingCoilHandingValue, ddlHeatingCoilHandingValue, ddlPreheatCoilHandingValue } = controlInfo;

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
    ddlPreheatCoilHanding: Yup.number(),
    ddlCoolingCoilHanding: Yup.number(),
    ddlHeatingCoilHanding: Yup.number(),
  });

  const defaultValues = {
    ddlHandingID: isEdit ? unitInfo.ddlHandingValue : 1,
    ddlSupplyAirOpeningID: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlSupplyAirOpeningText: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningText : '1',
    ddlExhaustAirOpeningID: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlExhaustAirOpeningText: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningText : '2',
    ddlOutdoorAirOpeningID: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlOutdoorAirOpeningText: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningText : '4',
    ddlReturnAirOpeningID: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningValue : 1,
    ddlReturnAirOpeningText: isEdit && unitInfo.isLayout ? unitInfo.ddlReturnAirOpeningText : '3',
    ddlPreheatCoilHanding: isEdit ? unitInfo.PreheatCoilHandingID : ddlPreheatCoilHandingValue,
    ddlCoolingCoilHanding: isEdit ? unitInfo.CoolingCoilHandingID : ddlCoolingCoilHandingValue,
    ddlHeatingCoilHanding: isEdit ? unitInfo.HeatingCoilHandingID : ddlHeatingCoilHandingValue,
  };

  const methods = useForm({
    resolver: yupResolver(layoutSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [successNotification, setOpenSuccessNotification] = React.useState(false);

  const handleSuccessNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessNotification(false);
  };

  const [errorNotification, setOpenErrorNotification] = React.useState(false);
  const handleErrorNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorNotification(false);
  };

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        unitReducer.saveLayout({
          ...data,
          intJobID: jobId,
          intUnitID: unitId,
          intProductTypeID: productType,
          intUnitTypeID: unitType,
          intUAL: localStorage.getItem('UAL'),
        })
      );

      if (result) {
        setOpenSuccessNotification(true);
      } else {
        setOpenErrorNotification(true);
      }
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
                    <LoadingButton type="submit" startIcon={<Iconify icon={'bx:save'} />} loading={isSubmitting}>
                      Save
                    </LoadingButton>
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
      .
      <Snackbar open={successNotification} autoHideDuration={6000} onClose={handleSuccessNotificationClose}>
        <Alert onClose={handleSuccessNotificationClose} severity="success" sx={{ width: '100%' }}>
          {isEdit ? 'Unit update successful!!!' : 'Unit was successfully added!!!'}
        </Alert>
      </Snackbar>
      <Snackbar open={errorNotification} autoHideDuration={6000} onClose={handleErrorNotificationClose}>
        <Alert onClose={handleErrorNotificationClose} severity="error" sx={{ width: '100%' }}>
          {isEdit ? 'Unit update failed!' : 'Failed to add Unit!'}
        </Alert>
      </Snackbar>
    </Container>
  );
}
