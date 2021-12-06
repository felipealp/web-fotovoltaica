import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../../common/Container';
import { Form, Success } from './components';
import { useParams } from 'react-router-dom';

const ConfirmSignUp = () => {
  const { id } = useParams<{ id: string }>();
  const [isConfirmComplete, setComplete] = useState(true);
  const theme: any = useTheme();

  const callbackSuccess = () => {  
    setComplete(true);  
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
      <Container maxWidth={600} sx={isConfirmComplete ? { display: 'none' } : { display: 'flex' }}>
        <Form code={id} callback={callbackSuccess} theme={theme} />
      </Container>  
      <Container maxWidth={600} sx={isConfirmComplete ? { display: 'flex' } : { display: 'none' }}>
        <Success />
      </Container>      
    </Box>
  );
};

export default ConfirmSignUp;
