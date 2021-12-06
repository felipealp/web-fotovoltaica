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

import { UserService } from 'services/user.service';
import { ISignUpRequest, ISignUpResponse } from 'interfaces/user.interfaces';
import { fetchIpAddress } from 'helpers/network.helper';

//import { Alert, AlertTitle } from '@material-ui/core';

class SignUp extends React.Component<ISignUpFormProps, {}> {
  static defaultProps: Partial<ISignUpFormProps> = {};

  state: ISignUp = {
    name: '',
    email: '',
    password: '',
    ipaddress: '192.168.1.1',
    action: 'normal',
    code: '',
    errorMsg: '',   
    blurErrors: []
  }

  componentDidMount() {
    // get ip address
    fetchIpAddress().then((response: any) => {
      this.setState({ ipaddress: response.IPv4 });
    });
  }

  public validateForm() {
    this.setState({ action: 'normal', blurErrors: [] });
    let blurErrors: string[] = [];

    if (this.state.email.length < 8) blurErrors.push('email');
    if (this.state.password.length < 8) blurErrors.push('password');
    if (this.state.name.length < 4) blurErrors.push('name');

    if (blurErrors.length > 0) {
      this.setState({ action: 'validation-error', blurErrors: blurErrors });
      return false;
    }

    return true;
  }

  public handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.setState({ action: 'processing' });

    const userService: UserService = new UserService();
    const body: ISignUpRequest = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      ipaddress: this.state.ipaddress
    };   

    userService.SignUp(body).then(async (response: ISignUpResponse) => {
      if (response.success) {
        this.setState({ action: 'success', code: response.value.id });
      } else {
        this.setState({ action: 'failed', errorMsg: this.setErrorMessage(response.messageCode, response.message) });
      }
    }).catch((error: Error) => {
      this.setState({ action: 'failed', errorMsg: error.message });
    });
  }

  public handleResetForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    this.setState({ action: 'normal', email: '', password: '', errorMsg: '' });
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<ISignUp, keyof ISignUp>);
  };

  // form onBlur validation
  private handleInputBlur = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    e.preventDefault();
    let blurErrors: string[] = this.state.blurErrors;

    if (blurErrors.includes(e.currentTarget.name)) blurErrors.splice(blurErrors.indexOf(e.currentTarget.name), 2);

    switch (e.currentTarget.name) {
      case 'name':
        if (this.state.name.length < 4 && !blurErrors.includes(e.currentTarget.name)) blurErrors.push('name');
        break;
      case 'email':
        if (this.state.email.length < 8 && !blurErrors.includes(e.currentTarget.name)) blurErrors.push('email');
        break;
      case 'password':
        if (this.state.password.length < 8 && !blurErrors.includes(e.currentTarget.name)) blurErrors.push('password');
        break;
      default:
        break;
    }

    this.setState({ blurErrors: blurErrors });
  }

  private setHelperTextMessage = (field: string) => {
    switch (field) {
      case 'name':
        return this.state.blurErrors.includes('name') ? 'name is required' : ' ';
      case 'email':
        return this.state.blurErrors.includes('email') ? 'email is required' : ' ';
      case 'password':
        return this.state.blurErrors.includes('password') ? 'password is required' : ' ';
      case 'confirmPassword':
        return this.state.blurErrors.includes('confirmPassword') ? 'confirm password is required and must match password' : ' ';
      default:
        return ' ';
    }
  }

  private setErrorMessage = (messageCode: number, msg: string = '') => {
    switch (messageCode) {
      case 402:
        return 'Form values that were posted to the server are invalid.';
      case 406:
        return 'Email address already exists for another user. Please try with a different email or <a href="./forgot-password" style="color: ' + this.props.theme.palette.common.white + '">click here</a> to recover your account.';
      case 600:
        return 'There was an error on the server: ' + msg;   
      default:
        return 'Unhandled exception thrown. Please contact us for support.';
    }
  }

  render() {
    return (
      <div>
        <Box display={this.state.action !== 'success' ? 'flex' : 'none'}>
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
                    Sign me up!
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
                      To get started, sign up with us. We will do great things together.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box width={1} height="100%" alignItems="center" display={this.state.action !== 'failed' ? 'flex' : 'none'}>
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
                          type="text"
                          label="Name *"
                          variant="outlined"
                          color="primary"
                          fullWidth
                          name={'name'}
                          value={this.state.name}
                          onChange={(e: any) => this.handleInputChanges(e)}
                          onBlur={(e: any) => this.handleInputBlur(e)}
                          error={this.state.blurErrors.includes('name') ? true : false}
                          helperText={this.setHelperTextMessage('name')}
                        />
                      </Box>
                      <Box marginBottom={2}>
                        <TextField
                          label="Email *"
                          type="email"
                          variant="outlined"
                          color="primary"
                          fullWidth
                          name={'email'}
                          value={this.state.email}
                          onChange={(e: any) => this.handleInputChanges(e)}
                          onBlur={(e: any) => this.handleInputBlur(e)}
                          error={this.state.blurErrors.includes('email') ? true : false}
                          helperText={this.setHelperTextMessage('email')}
                        />
                      </Box>
                      <Box marginBottom={2}>
                        <TextField
                          label="Password *"
                          variant="outlined"
                          name={'password'}
                          type={'password'}
                          fullWidth
                          value={this.state.password}
                          onChange={(e: any) => this.handleInputChanges(e)}
                          onBlur={(e: any) => this.handleInputBlur(e)}
                          error={this.state.blurErrors.includes('password') ? true : false}
                          helperText={this.setHelperTextMessage('password')}
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
                          {this.state.action === 'processing' ? 'Signing you up, please wait...' : 'Sign me up!'}
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Box>

              <Box width={1} height="100%" alignItems="center" display={this.state.action === 'failed' ? 'flex' : 'none'}>
                <Box
                  padding={{ xs: 3, sm: 6 }}
                  width={'100%'}
                  component={Card}
                  borderRadius={2}
                  boxShadow={4}
                >
                  <Box
                    component={Avatar}
                    width={'100%'}
                    height={'100%'}
                    marginBottom={2}
                    bgcolor={alpha(this.props.theme.palette.primary.main, 0.0)}
                    color={this.props.theme.palette.primary.main}
                  >
                    <svg
                      height={100}
                      width={100}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </Box>
                  <Box marginBottom={4}>
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{
                        color: this.props.theme.palette.common.white,
                        fontWeight: 400,
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: this.state.errorMsg }} />                     
                    </Typography>
                  </Box>
                  <Box alignItems="center" textAlign="center" width={'100%'}>
                    <Button                        
                      size={'large'}
                      color="primary"  
                      variant="outlined"                    
                      onClick={(e: any) => this.handleResetForm(e)}                      
                    >
                      Go back and try again
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box display={this.state.action === 'success' ? 'flex' : 'none'}>
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
                      We are sending you an email to confirm that you are you. Click that link to finilie the sign up process and get started.
                      <br/><br/>
                      {'<a href="./signup-confirm/' + this.state.code + '>Temp confirm link</a>'}
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
                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
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
  ipaddress: string,
  action: string,
  errorMsg: string;
  blurErrors: string[],
  code: string,
}

export default SignUp;
