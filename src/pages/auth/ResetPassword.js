import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// jwt
import jwtDecode from 'jwt-decode';
// components
import Page from '../../components/Page';
// sections
import { Message } from '../../sections/auth/message';
import { NewPassword } from '../../sections/auth/new-password';
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';
// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { token } = useParams();
  const tokenData = jwtDecode(token);

  const [error, setError] = useState('');
  const [currentTokenState, setCurrentTokenState] = useState(false);
  const [isConfirming, setIsConfirming] = useState(true);

  useEffect(() => {
    if (token !== undefined) {
      axios.post(`${serverUrl}/api/user/completeresetpassword`, { email: tokenData.email }).then((response) => {
        if (response.data) {
          const now = new Date();
          if (tokenData.expireTime < now.getTime()) {
            setCurrentTokenState(true);
            setIsConfirming(false);
            setError('');
          } else {
            setError('You aleady used this TokenYou have already changed your password!');
          }
        } else {
          setError('Token has expired!');
        }
      });
    }
  }, [tokenData, token]);

  let renderTag; 
  if (error === '') {
    renderTag = currentTokenState ? <NewPassword /> : <ResetPasswordForm />;
  } else {
    renderTag = <Message text={error} />;
  }

  return isConfirming ? (
    <h1>Checking token...</h1>
  ) : (
    <Page title="Reset Password">
      <Container>{renderTag}</Container>
    </Page>
  );
}
