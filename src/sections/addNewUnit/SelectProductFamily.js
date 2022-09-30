import PropTypes from 'prop-types';
// @mui
import { Container, CardHeader, CardContent, Card, Box } from '@mui/material';
// components
import UnitItem from './UnitItem';

// ----------------------------------------------------------------------
SelectProductFamily.propTypes = {
  ProductFamilyData: PropTypes.array,
  onSelectItem: PropTypes.func,
};
export default function SelectProductFamily({ ProductFamilyData, onSelectItem }) {
  return (
    <Container>
      <Card sx={{ minWidth: 500 }}>
        <CardHeader title="Select Product Family" sx={{ textAlign: 'center' }} />
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: `repeat(${ProductFamilyData.length%2}, 1fr)`,
              },
            }}
          >
            {ProductFamilyData.map((item, index) => (
              <UnitItem
                key={index}
                info={item}
                id={item.id}
                onSelectItem={onSelectItem}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
