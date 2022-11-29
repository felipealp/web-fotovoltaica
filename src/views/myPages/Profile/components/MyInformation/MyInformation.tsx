/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import { Container, Skeleton } from '@material-ui/core';
import { IMyProfile } from 'interfaces/user.profile.interfaces';

class MyInformation extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    action: 'loading',
    errorMsg: '',
    data: [],   
  }

  render() {
    return (     
      <Box>
        <Box justifyContent={'center'} sx={this.state.action === 'loading' ? { display: 'flex' } : { display: 'none' }}>     
          <Box width={600} position="relative" zIndex={2}>            
            <Box justifyContent={'center'} display={'flex'} sx={{paddingBottom: '10px'}}>
              <Skeleton width={'50%'} height={40} />
            </Box>
            <Box justifyContent={'center'} display={'flex'}>
              <Skeleton variant="rectangular" width={'100%'} height={300} />
            </Box>
          </Box>           
        </Box>       

        <Container sx={this.state.action === 'normal' ? { display: 'block' } : { display: 'none' }}>
          <Box position="relative" zIndex={2}>         
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'medium',
              }}
              gutterBottom
              color={'textSecondary'}
              align={'center'}          
              justifyContent={'center'}
              paddingBottom={'20px'}            
            >                  
              My Information
            </Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}
            justifyContent={'center'}>
            <Box
              padding={{ xs: 3, sm: 6 }}
              width={'50%'}
              component={Card}
              borderRadius={2}
              boxShadow={4}
              marginBottom={4}
            >
              <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} >
                    <TextField
                      sx={{ height: 54 }}
                      label="First name"
                      variant="outlined"
                      color="primary"
                      size="medium"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      sx={{ height: 54 }}
                      label="Last name"
                      variant="outlined"
                      color="primary"
                      size="medium"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ height: 54 }}
                      label="Email"
                      type="email"
                      variant="outlined"
                      color="primary"
                      size="medium"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      sx={{ height: 54 }}
                      variant="contained"
                      color="primary"
                      size="medium"
                      fullWidth
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default MyInformation;

interface IProps {
  theme: Theme;
}

interface IForm {
  action: string,
  errorMsg: string;
  data: IMyProfile[],
}