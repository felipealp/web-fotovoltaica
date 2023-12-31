import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '../../layouts/common/Container';
import { Form, Success } from './components';
import { useTheme } from '@material-ui/core/styles';

const Signup = () => {
  const theme: any = useTheme();
  const [isSuccess, setSuccess] = useState(false);

  const callbackSuccess = () => {  
    setSuccess(true);
  };

  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'80%'}
      width={'100%'}
    >
      <Container sx={isSuccess ? { display: 'none' } : { display: 'flex' }}>
        <Form callback={callbackSuccess} theme={theme} />
      </Container>  
      <Box padding={'4rem 0'} sx={isSuccess ? { display: 'flex' } : { display: 'none' }}>
        <Success theme={theme} />
      </Box>  
    </Box>
  );
};

export default Signup;
