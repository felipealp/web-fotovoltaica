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

class Avatar extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    action: 'normal',
    errorMsg: '',
    blurErrors: []
  }

  render() {
    return (
      <Box>
        <Box position="relative" zIndex={2} >
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={'textSecondary'}
            align={'center'}
            paddingBottom={'20px'}
          >
            Avatar
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
      </Box>
    );
  }
}

export default Avatar;

interface IProps {
  theme: Theme;
}

interface IForm {
  action: string,
  errorMsg: string;
  blurErrors: string[],
}