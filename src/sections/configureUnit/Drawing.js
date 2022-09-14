import * as React from 'react';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import Carousel from 'react-material-ui-carousel';
import { Box, Card, Container } from '@mui/material';

// redux
// import { useSelector } from 'react-redux';
// import { deleteUnit } from '../../redux/slices/jobsReducer';
// components
// import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Drawing() {
  const { jobId, unitId } = useParams();

  const drawingInfo = [
    {
      imageUrl: '/assets/Layouts/layout_nova_in_h_rh.png',
    },
    {
      imageUrl: '/assets/Layouts/layout_ventum_in_h_rh_sa_1.png',
    },
    {
      imageUrl: '/assets/Layouts/layout_ventum_in_h_lh_sa_1.png',
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  const handleStepChange = (cur, prev) => {
    setActiveStep(cur);
  };

  return (
    <Container>
      <Card>
        <Carousel index={activeStep} onChange={handleStepChange} animation="slide" indicators autoPlay={false}>
          {drawingInfo.map((item, index) => (
            <Box key={index} sx={{ width: '100%' }}>
              <img src={item.imageUrl} width={'100%'} height={'auto'} alt={item.imageUrl} />
            </Box>
          ))}
        </Carousel>
      </Card>
    </Container>
  );
}
