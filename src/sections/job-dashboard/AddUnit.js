import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import EmptyContent from '../../components/EmptyContent';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
import JobInfoCard from './JobInfoCard';

// ----------------------------------------------------------------------

export default function AddUnit() {
  const dispatch = useDispatch();

  const jobInfo = [
    {title: 'Project Name', value: 'Welcome'},
    {title: 'Basis of Design', value: 'N/a'},
    {title: 'Reference no', value: '12345678'},
    {title: 'Revision', value: '1'},
    {title: 'Date created', value: '2022-04-14'},
    {title: 'Data revised', value: '2022-04-14'},
    {title: 'Company name', value: 'Test Rep'},
    {title: 'Contact name', value: 'John Doe'},
  ]

  const { checkout } = useSelector((state) => state.product);

  const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  return (
    <Grid container spacing={3}>
      
      <Grid item xs={12} md={4}>
        <JobInfoCard
          info={jobInfo}
          discount={discount}
          subtotal={subtotal}
          onApplyDiscount={handleApplyDiscount}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Card
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={cart}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
            />
          )}
        </Card>

        <Button
          color="inherit"
          component={RouterLink}
          to={PATH_DASHBOARD.eCommerce.root}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          Continue Shopping
        </Button>
      </Grid>

    </Grid>
  );
}
