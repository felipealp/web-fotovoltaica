import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '../../../common/Container';
import TravelIllustration from '../../../svg/illustrations/Travel';

import AuthService from 'services/auth.service';
import { fetchJwt } from 'helpers/jwt.helper';
import { IStandardApiResponse } from 'interfaces/api-response.interface';

const Logout = () => {
  const theme: any = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleLogout = () => {
    const auth: AuthService = new AuthService();
    const jwt: string | null = fetchJwt();

    auth.Logout(jwt).then(async(response: IStandardApiResponse) => {
      console.log('logged out');        
    }).catch((error: Error) => {
      
    });

    // remove token from local storage
    // do this regardless if we get an error back from post 
    localStorage.removeItem('myapp.jwt');
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <Box
      minHeight={'calc(100vh - 64px - 183px)'}
      height={'100%'}
      display={'flex'}
      alignItems={'center'}
      bgcolor={theme.palette.alternate.main}
    >
      <Container>
        <Grid container spacing={6}>
          <Grid item container justifyContent={'center'} xs={12} md={6}>
            <Box
              height={'100%'}
              width={'100%'}
              maxWidth={{ xs: 500, md: '100%' }}
            >
              <TravelIllustration width={'100%'} height={'100%'} />
            </Box>
          </Grid>
          <Grid
            item
            container
            alignItems={'center'}
            justifyContent={'center'}
            xs={12}
            md={6}
          >
            <Box>
              <Typography
                variant="h1"
                component={'h1'}
                align={isMd ? 'left' : 'center'}
                sx={{ fontWeight: 700 }}
              >
                You are now logged out
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="textSecondary"
                align={isMd ? 'left' : 'center'}
              >
                Thank you for coming. Come back and see us any time!
                <br />               
              </Typography>
              <Box
                marginTop={4}
                display={'flex'}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  component={Link}
                  variant="contained"
                  color="primary"
                  size="large"
                  href={'/login'}
                >
                  Login page
                </Button>                
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Logout;
