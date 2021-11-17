import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../../common/Container';
import { Features, Footer, Hero, Highlights, Register } from './components';



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
          <Register callback={callbackRegisterComplete} theme={theme} />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
