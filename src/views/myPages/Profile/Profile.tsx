import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../../common/Container';
import { Avatar, MyInformation } from './components';

const Profile = () => {
  const theme: any = useTheme();    

  return (
    <Box>
      <Box bgcolor={theme.palette.alternate.main} position={'relative'}>
        <Container position="relative" zIndex={2}>
          <MyInformation theme={theme} />
        </Container>
        <Container position="relative" zIndex={2}>
          <Avatar theme={theme} />
        </Container>
      </Box>      
    </Box>
  );
};

export default Profile;
