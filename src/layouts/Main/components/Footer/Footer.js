import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import WebbeeLogo from '../../../svg/logos/Webbee';

const Footer = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box
        display={'flex'}
        alignItems={'center'}
        width={'100%'}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box
          display={'flex'}
          component="a"
          underline="none"
          href="/"
          title="webbee"
          height={24}
          width={35}
        >
          <WebbeeLogo height={'100%'} width={'100%'} />
        </Box>

        <Typography
          margin="0 auto"
          align={'center'}
          variant={'subtitle2'}
          color="textSecondary"
          gutterBottom
        >
          &copy; Fotovoltaica, 2023. Todos os direitos reservados
        </Typography>         
      </Box>     
    </Grid>
  </Grid>
);

export default Footer;
