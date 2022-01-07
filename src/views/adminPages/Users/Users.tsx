import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../../common/Container';
import { List } from './components';
import { Typography } from '@material-ui/core';

const Users = () => {   
  const theme: any = useTheme();

  const callbackSuccess = () => {  
   
  };

  return (
    <Box>
      <Box bgcolor={theme.palette.alternate.main} position={'relative'}>
        <Container paddingX={'0 !important'} maxWidth={800}>
          <Box>
            <Typography
              variant="h4"
              align={'center'}
              sx={{ fontWeight: 700, }}
            >
              Users
            </Typography>
            <Typography color="text.secondary" align={'center'}>
              Enter your email address and we will generate a new code and send you a message.
            </Typography>
          </Box>     
        </Container>
      </Box>
      <Box>   
        <Container maxWidth={'80%'}>
          <List callback={callbackSuccess} theme={theme} />
        </Container>  
      </Box>                
    </Box>
  );
};

export default Users;
