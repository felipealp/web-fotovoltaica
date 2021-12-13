import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../../common/Container';
import { Form, Success } from './components';

const ForgotPassword = () => {  
  const [isSuccess, setSuccess] = useState(false);
  const [status, setStatus] = useState(1);
  const theme: any = useTheme();

  const callbackSuccess = (val: any) => {  
    setSuccess(true);  
    setStatus(val);        
  };

  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}
    >      
      <Container maxWidth={600} sx={isSuccess ? { display: 'none' } : { display: 'flex' }}>
        <Form callback={callbackSuccess} theme={theme} />
      </Container>  
      <Container maxWidth={600} sx={isSuccess ? { display: 'flex' } : { display: 'none' }}>
        <Success theme={theme} status={status} />
      </Container>      
    </Box>
  );
};

export default ForgotPassword;
