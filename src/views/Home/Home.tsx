import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../layouts/common/Container';
import { Features, Hero, Highlights, SignUp } from './components';

const Home = () => {
  const theme: any = useTheme();

  const callbackRegisterComplete = () => {    
    console.log('callback success');
  };

  return (
    <Box>
      <Box bgcolor={theme.palette.alternate.main} position={'relative'}>
        <Container position="relative" zIndex={2}>
          <Hero />
        </Container>
      </Box>
      <Box>
        <Container>
          <Highlights />
        </Container>
      </Box>
      <Box>
        <Container>
          <Features />
        </Container> 
      </Box> 
      <Box bgcolor={theme.palette.primary.dark}>    
        <Container>
          <SignUp callback={callbackRegisterComplete} theme={theme} />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
