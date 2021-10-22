import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Form, Faq } from './components';
import Container from '../../../common/Container';

const Contact = () => {
  const theme: any = useTheme();  

  return (
    <Box>
      <Container maxWidth={800}>
        <Form />
      </Container>
      <Box bgcolor={theme.palette.alternate.main}>
        <Container maxWidth={1000}>
          <Faq />
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;
