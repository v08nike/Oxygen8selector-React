import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
// Path
import { PATH_AUTH } from '../../routes/paths';
// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate(); 

  const [error, setError] = useState('');
  const [currentTokenState, setCurrentTokenState] = useState(false);
  const [isConfirming, setIsConfirming] = useState(true);
  const [tokenEmail, setTokenEmail] = useState("");

  useEffect(() => {
    if (token !== undefined) {
      const tokenData = jwtDecode(token);
      axios.post(`${serverUrl}/api/user/completeresetpassword`, { email: tokenData.email }).then((response) => {
        if (response.data) {
          const now = new Date();
          if (tokenData.expireTime > now.getTime()) {
            setCurrentTokenState(true);
            setError('');
          } else {
            setError('Token has expired!');
          }
        } else {
          setError('You have already changed your password!');
        }
        setTokenEmail(tokenData.email);
        setIsConfirming(false);
      });
    } else {
      setIsConfirming(false);
    }
  }, [token]);

  const initStates = () => {
    setError('');
    setCurrentTokenState(false);
    setIsConfirming(false);
    navigate(PATH_AUTH.resetPassword);
  }

  let renderTag; 
  if (error === '') {
    renderTag = currentTokenState ? <NewPassword email={tokenEmail}/> : <ResetPasswordForm />;
  } else {
    renderTag = <Message text={error} initStates={initStates}/>;
  }

  return isConfirming ? (
    <h1>Checking token...</h1>
  ) : (
    <Page title="Reset Password">
      <Container>{renderTag}</Container>
    </Page>
  );
}
