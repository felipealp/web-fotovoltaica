/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import { UserIdentityService } from 'services/user.identity.service';
import { ISignUpRequest, IGetCodeResponse } from 'interfaces/user.identity.interfaces';
import { fetchIpAddress } from 'helpers/network.helper';
import { ErrorMessage } from 'common/components';

class Form extends React.Component<IFormProps, {}> {
  static defaultProps: Partial<IFormProps> = {};

  state: IForm = {
    name: '',
    email: '',
    password: '',
    ipaddress: '192.168.1.1',
    action: 'normal',
    message: '',
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

    const userService: UserIdentityService = new UserIdentityService();
    
    const body: ISignUpRequest = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      ipaddress: this.state.ipaddress
    };

    userService.SignUp(body).then(async (response: IGetCodeResponse) => {     
      
      if (response.success) {
        this.props.callback();
      } else {
        this.setState({ action: 'failed', password: '',  message: this.setErrorMessage(response.messageCode, response.message) });
      }
    }).catch((error: Error) => {
      this.setState({ action: 'failed', message: error.message });
    });
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<IForm, keyof IForm>);
  };

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
      <Box >
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
            <Box width={1} height="100%" alignItems="center">
              <Box>
                <ErrorMessage message={this.state.message} />
              </Box>
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
                        {this.state.action === 'processing' ? 'Signing you up, please wait...' : 'Sign me up'}
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

interface IFormProps {
  callback: () => void;
  theme: Theme;
}

interface IForm {
  name: string,
  email: string,
  password: string,
  ipaddress: string,
  action: string,
  message: string; 
  blurErrors: string[],
}

export default Form;
