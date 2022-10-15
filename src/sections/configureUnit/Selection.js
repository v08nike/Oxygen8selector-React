import * as React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// @mui
import { styled } from '@mui/material/styles';

import {
  Box,
  Card,
  Paper,
  CardContent,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CardHeader,
  Stack,
} from '@mui/material';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getViewSelectionInfo } from '../../redux/slices/unitReducer';
// components
// import Iconify from '../../components/Iconify';

// hooks
import { FormProvider, RHFTextField } from '../../components/hook-form';
// sections
import Loading from '../Loading';
// ----------------------------------------------------------------------

const GroupHeaderStyle = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '5px 25px',
  backgroundColor: theme.palette.primary.main,
}));

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '0 0 2px',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
}));

const CardHeaderRHFTextFieldStyle = styled(RHFTextField)(() => ({
  '& .MuiFilledInput-root': {
    background: 'rgb(255, 255, 255)',
    '&:hover': {
      background: 'rgb(239, 239, 239)',
    },
  },
}));

// ----------------------------------------------------------------------

export default function Selection() {
  const { jobId, unitId } = useParams();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { controlInfo, unitInfo, isLoading, viewSelectionInfo } = useSelector((state) => state.unit);

  const {
    pricingDetail,
    performanceVisible,
    unitDetails,
    unitDetailsVisible,
    electricalRequirements,
    electricPreheatVisible,
    electricPreheat,
    heatExchanger,
    heatingElectricHeater,
    heatingElectricHeaterVisible,
  } = viewSelectionInfo;
  const { preheatElectricHeater } = controlInfo;

  useEffect(() => {
    dispatch(
      getViewSelectionInfo({
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
        intProductTypeID: state.productType,
        intUnitTypeID: state.unitType,
        intUnitNo: unitId === undefined ? -1 : unitId,
        ddlPreheatElecHeaterInstallation: preheatElectricHeater.ddlPreheatElecHeaterInstallationValue,
      })
    );
  }, [dispatch, jobId, unitId, state, preheatElectricHeater]);

  console.log(viewSelectionInfo);

  const SelectionInfo = JSON.stringify(viewSelectionInfo) !== '{}' ? [
    {
      groupName: 'Pricing',
      subGroups: [
        {
          title: 'Pricing Detail',
          data: pricingDetail.map((item) => [item.cLabel, item.cValue, item.cNotes]),
          visible: performanceVisible,
        },
      ],
    },
    {
      groupName: 'Summary',
      subGroups: [
        {
          title: 'Unit Details',
          data: unitDetails.map((item) => [item.cLabel, item.cValue]),
          visible: unitDetailsVisible,
        },
      ],
    },
    {
      groupName: 'Electrical Requirements',
      subGroups: [
        {
          title: 'Unit',
          data: electricalRequirements.unitData.map((item) => [item.cLabel, item.cValue]),
          visible: electricalRequirements.unitDataVisible,
        },
        {
          title: 'Preheat Electric Heater',
          data: electricalRequirements.preheatData.map((item) => [item.cLabel, item.cValue]),
          visible: electricalRequirements.preheatDataVisible,
        },
        {
          title: 'Heating Electric Heater',
          data: electricalRequirements.heatingData.map((item) => [item.cLabel, item.cValue]),
          visible: electricalRequirements.heatingDataVisible,
        },
      ],
    },
    {
      groupName: 'Electric Preheat',
      subGroups: [
        {
          title: 'Actual',
          data: electricPreheat.map((item) => [item.cLabel, item.cValue]),
          visible: electricPreheatVisible,
        },
      ],
    },
    {
      groupName: 'Heat Exchanger',
      subGroups: [
        {
          title: 'Design Conditions',
          data: heatExchanger.designConditions.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          visible: heatExchanger.designConditionsVisible,
        },
        {
          title: 'Performance Leaving Air',
          data: heatExchanger.performanceLeavingAir.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          visible: heatExchanger.performanceLeavingAirVisible,
        },
        {
          title: 'Performance',
          data: heatExchanger.performance.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          visible: heatExchanger.performanceVisible,
        },
      ],
    },
  ] : [];

  const methods = useForm();

  return JSON.stringify(viewSelectionInfo) === '{}' ? (
    <Loading />
  ) : (
    <Container>
      <FormProvider methods={methods}>
        <Stack spacing={5} sx={{ mt: 2 }}>
          {SelectionInfo.map((item, index) => (
            <div key={index}>
              <GroupHeaderStyle>
                <RHFTextField
                  size="small"
                  name={item.groupName}
                  color={'info'}
                  label={item.groupName}
                  sx={{ color: 'white' }}
                />
              </GroupHeaderStyle>
              <Stack spacing={3} sx={{ background: '#efefef' }}>
                {item.subGroups.map((element, index) => (
                  <Card
                    key={element.title + index}
                    sx={{ display: element.visible ? 'block' : 'none', m: '20px 30px!important' }}
                  >
                    <CardHeaderStyle
                      title={
                        <CardHeaderRHFTextFieldStyle
                          size="small"
                          name={element.title}
                          label={element.title}
                          variant={'filled'}
                        />
                      }
                    />
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table size="small">
                          <TableBody>
                            {element.data.map((row, index) => (
                              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {row.map((item, index) => (
                                  <TableCell key={index} component="th" scope="row" align="left">
                                    {item}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </div>
          ))}
        </Stack>
      </FormProvider>
    </Container>
  );
}
