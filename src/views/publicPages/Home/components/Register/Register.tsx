/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Alert, AlertTitle } from '@material-ui/core';

import { FormCode } from 'helpers/enums';

class Register extends React.Component<IRegisterFormProps, {}> {
  static defaultProps: Partial<IRegisterFormProps> = {};

  state: IRegister = {
    name: '',
    email: '',
    password: '',
    action: 'normal',
    formCode: FormCode.Ok,
    errorMsg: '',
    loginText: 'Login',
    blurErrors: []
  }

  public validateForm() {
    return true;
  }

  public handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<IRegister, keyof IRegister>);
  };

  // form onBlur validation
  private handleInputBlur = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  }

  private setHelperTextMessage = (field: string) => {
    return '';
  }

  render() {
    return (
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box width={1} height="100%" display="flex" alignItems="center">
              <Box>
                <Typography
                  variant="h2"
                  align="left"
                  gutterBottom
                  sx={{
                    color: this.props.theme.palette.common.white,
                    fontWeight: 900,
                  }}
                >
                  Get in touch!
                </Typography>
                <Box marginBottom={4}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      color: this.props.theme.palette.common.white,
                      fontWeight: 400,
                    }}
                  >
                    Get in touch with us by sending a meeage and we will get back to you
                    soon to schedule a discovery call.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box width={1} height="100%" display="flex" alignItems="center">
              <Box
                padding={{ xs: 3, sm: 6 }}
                width={'100%'}
                component={Card}
                borderRadius={2}
                boxShadow={4}
              >
                <form noValidate autoComplete="off">
                  <Box display="flex" flexDirection={'column'}>
                    <Box marginBottom={2}>
                      <TextField
                        sx={{ height: 54 }}
                        label="Full name"
                        variant="outlined"
                        color="primary"
                        fullWidth
                      />
                    </Box>
                    <Box marginBottom={2}>
                      <TextField
                        sx={{ height: 54 }}
                        label="Email"
                        type="email"
                        variant="outlined"
                        color="primary"
                        fullWidth
                      />
                    </Box>
                    <Box marginBottom={2}>
                      <TextField
                        label="Message"
                        type="text"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        multiline
                        rows={6}
                      />
                    </Box>
                    <Box>
                      <Button
                        sx={{ height: 54 }}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Contact
                      </Button>
                    </Box>                                     
                  </Box>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

interface IRegisterFormProps {
  callback: () => void;
  theme: Theme;
}


interface IRegister {
  name: string,
  email: string,
  password: string,
  action: string,
  formCode: FormCode,
  errorMsg: string;
  loginText: string,
  blurErrors: string[],
}

export default Register;
