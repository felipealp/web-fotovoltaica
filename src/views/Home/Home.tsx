import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../layouts/common/Container';
import { Features, Hero, Highlights } from './components';

const Home = () => {
  const theme: any = useTheme();

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
    </Box>
  );
};

export default Home;
