/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

//import { Alert, AlertTitle } from '@material-ui/core';

import { FormCode } from 'helpers/enums';

class SignUp extends React.Component<ISignUpFormProps, {}> {
  static defaultProps: Partial<ISignUpFormProps> = {};

  state: ISignUp = {
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

    this.setState({ action: 'processing' });

    setTimeout(() => {
      this.setState({ action: 'done' });
    }, 2000);
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<ISignUp, keyof ISignUp>);
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
      <div>
        <Box display={this.state.action !== 'done' ? 'flex' : 'none'}>
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
              <Box width={1} height="100%" alignItems="center">
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
                          size={'large'}
                          color="primary"
                          fullWidth
                          onClick={(e: any) => this.handleClick(e)}
                          disabled={this.state.action === 'processing' ? true : false}
                        >
                          {this.state.action === 'processing' ? 'Registering, please wait...' : 'Register now'}
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box display={this.state.action === 'done' ? 'flex' : 'none'}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box width={1} height="465px" display="flex" alignItems="center">
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
                    Thank you for signing up
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
              <Box
                component={Avatar}
                width={'100%'}
                height={'100%'}
                marginBottom={2}
                bgcolor={alpha(this.props.theme.palette.primary.main, 0.0)}
                color={this.props.theme.palette.primary.main}
              >
                <svg
                  height={200}
                  width={200}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

interface ISignUpFormProps {
  callback: () => void;
  theme: Theme;
}


interface ISignUp {
  name: string,
  email: string,
  password: string,
  action: string,
  formCode: FormCode,
  errorMsg: string;
  loginText: string,
  blurErrors: string[],
}

export default SignUp;
