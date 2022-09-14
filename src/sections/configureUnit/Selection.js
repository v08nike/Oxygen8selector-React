import * as React from 'react';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
// import { useSelector } from 'react-redux';
// import { deleteUnit } from '../../redux/slices/jobsReducer';
// components
// import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const GroupHeaderStyle = styled('h1')(({ theme }) => ({
  color: theme.palette.primary.main,
  paddingLeft: '30px',
}));

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '5px 24px',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

export default function Selection() {
  // const { jobId, unitId } = useParams();

  const SelectionInfo = [
    {
      groupName: 'Pricing',
      subGroups: [
        {
          title: 'Pricing Detail',
          data: [
            ['Unit', '$7447.73', '1 - A16IN - 208 - 1 - 0 - 1 - 7447.73 - 7447.73 -'],
            [
              'Preheat Elec Heater',
              '$1034.32',
              '5 - A16IN - 1 - Indoor - 3 - In Casing - CP - 208 - 3 - 60 - 1 - 1034.32 - 1086.04 - 1 -',
            ],
            ['Total', '$8482.05', ''],
          ],
        },
      ],
    },
    {
      groupName: 'Summary',
      subGroups: [
        {
          title: 'Unit Details',
          data: [
            ['Unit Tag', 'WELCOME'],
            ['Model', '	A16IN - (325 - 775 CFM)'],
            ['Qty', '1'],
            ['Location', 'Indoor'],
            ['Altitude', '0'],
            ['ByPass', 'No'],
            ['Orientation', 'Horizontal'],
            ['ESP SA / RA (inH2O)', '0.75/0.75'],
            ['Filters QA / RA', '2" 85% MERV-13 / 2" 30% MERV-8'],
            ['Controls Preference', 'Constant Volume'],
            ['Dampers & Actuator', 'NA'],
          ],
        },
      ],
    },
    {
      groupName: 'Electrical Requirements',
      subGroups: [
        {
          title: 'Unit',
          data: [
            ['Voltage', '208V/1ph/60Hz'],
            ['Range', '207V-253V'],
            ['FLA', '5.29'],
            ['MCA', '5.91'],
            ['RFS', '15A'],
          ],
        },
        {
          title: 'Preheat Electric Heater',
          data: [
            ['Std. Coil', '1'],
            ['Controls', 'SCR'],
            ['Voltage', '208V/3ph/60Hz'],
            ['Range', '207V-253V'],
            ['FLA', '5.29'],
            ['MCA', '5.91'],
            ['RFS', '15A'],
            ['Max KW', '4'],
          ],
        },
      ],
    },
    {
      groupName: 'Electric Preheat',
      subGroups: [
        {
          title: 'Actual',
          data: [
            ['Outdoor Air (CFM)', '	325'],
            ['Voltage', '208V/3ph/60Hz'],
            ['kW', '0.1'],
            ['Ent. Air DB/WB (F)', '35 / 33'],
            ['Lvg Air DB/WB (F)', '36 / 33.6'],
            ['Installation', 'In Casing – Field Mounted and Wired'],
          ],
        },
      ],
    },
    {
      groupName: 'Heat Exchanger',
      subGroups: [
        {
          title: 'Design Conditions',
          data: [
            ['', 'Outdoor Air', 'Return Air'],
            ['SCFM', '325', '325'],
            ['Summer DB (F) / WB (F) / RH (%)', '95 / 78 / 47.3', '75 / 63 / 51.2'],
            ['Winter DB (F) / WB (F) / RH (%)', '95 / 78 / 47.3', '75 / 63 / 51.2'],
          ],
        },
        {
          title: 'Performance Leaving Air',
          data: [
            ['', '	Supply Air', '	Exhaust Air'],
            ['SCFM', '325', '325'],
            ['Summer DB (F) / WB (F) / RH (%)', '95 / 78 / 47.3', '75 / 63 / 51.2'],
            ['Winter DB (F) / WB (F) / RH (%)', '95 / 78 / 47.3', '75 / 63 / 51.2'],
          ],
        },
        {
          title: 'Performance',
          data: [
            ['', 'Summer', 'Winter'],
            ['Supply Air PD (inH2O)', '0.24', '0.24'],
            ['Exhaust Air PD (inH2O)', '325', '325'],
            ['Sensible Effectiveness %', '325', '325'],
            ['Latent Effectiveness %', '325', '325'],
            ['Total Effectiveness %', '325', '325'],
            ['EATR %:', '325', '325'],
            ['OACF', '325', '325'],
            ['Net Supply Airflow (SCFM)', '325', '325'],
            ['Energy Recover Ratio %', '325', '325'],
            ['BTU/H Saved', '325', '325'],
          ],
        },
      ],
    },
  ];

  return (
    <Container>
      <Card>
        <Stack spacing={3}>
          {SelectionInfo.map((item, index) => (
            <div key={index}>
              <GroupHeaderStyle>{item.groupName}</GroupHeaderStyle>
              {item.subGroups.map((element, index) => (
                <Card key={element.title + index} sx={{p: '20px'}}>
                  <CardHeaderStyle title={element.title} />
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
            </div>
          ))}
        </Stack>
      </Card>
    </Container>
  );
}
