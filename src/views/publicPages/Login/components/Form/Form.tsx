/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { base64EncodeString } from '../../../../../helpers/security.helper';

interface Props { }

class Form extends React.Component<Props, IForm> {
  state: IForm = {
    email: '',
    password: '',
    action: 'normal',
    errorCode: 200,
    loginText: 'Login',
    blurErrors: [],
    apiErrors: [],
  }   

  public validateForm() {
    this.setState({ action: 'normal', blurErrors: []});
    let blurErrors: string[] = [];
   
    if (this.state.email.length < 8) blurErrors.push('email'); 
    if (this.state.password.length < 8) blurErrors.push('password');  
       
    if (blurErrors.length > 0) {
      this.setState({ action: 'validation-error', blurErrors: blurErrors});
      return false;
    }
    
    return true;
  }

  public handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.setState({ action: 'busy', loginText: 'Logging in, please wait...' });

    let loginString = this.state.email + ':' + this.state.password;
    let hashed: string = base64EncodeString(loginString);
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<IForm, keyof IForm>);
  };

  // form onBlur validation
  private handleInputBlur = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let blurErrors: string[] = this.state.blurErrors;  

    if (blurErrors.includes(e.currentTarget.name)) blurErrors.splice(blurErrors.indexOf(e.currentTarget.name), 2);

    switch(e.currentTarget.name) {
      case 'email':
        if (this.state.email.length < 8 && ! blurErrors.includes(e.currentTarget.name)) blurErrors.push('email');         
        break;
      case 'password':
        if (this.state.password.length < 8 && ! blurErrors.includes(e.currentTarget.name)) blurErrors.push('password');          
        break;
      default:
        break;
    }   

    this.setState({ blurErrors: blurErrors });   
  }

  private setHelperTextMessage = (field: string) => {
    switch(field) {
      case 'email':
        return this.state.blurErrors.includes('email') ? 'valid email address is required' : ' ';
      case 'password':
        return this.state.blurErrors.includes('password') ? 'password is required' : ' ';
      default:
        return ' ';       
    }
  }

  render() {
    return (
      <Box>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={'textSecondary'}
          >
            Login
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Welcome back
          </Typography>
          <Typography color="text.secondary">
            Login to manage your account.
          </Typography>
        </Box>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Enter your email
              </Typography>
              <TextField
                label="Email *"
                variant="outlined"
                name={'email'}
                fullWidth
                value={this.state.email}
                onChange={(e: any) => this.handleInputChanges(e)}
                onBlur={(e: any) => this.handleInputBlur(e)}
                error={this.state.blurErrors.includes('email') ? true : false}
                helperText={this.setHelperTextMessage('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretched', sm: 'center' }}
                justifyContent={'space-between'}
                width={'100%'}
                marginBottom={2}
              >
                <Box marginBottom={{ xs: 1, sm: 0 }}>
                  <Typography variant={'subtitle2'}>
                    Enter your password
                  </Typography>
                </Box>
                <Typography variant={'subtitle2'}>
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/page-forgot-password-simple'}
                    underline={'none'}
                  >
                    Forgot your password?
                  </Link>
                </Typography>
              </Box>
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
            </Grid>
            <Grid item container xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretched', sm: 'center' }}
                justifyContent={'space-between'}
                width={'100%'}
                maxWidth={600}
                margin={'0 auto'}
              >
                <Box marginBottom={{ xs: 1, sm: 0 }}>
                  <Typography variant={'subtitle2'}>
                    Don't have an account yet?{' '}
                    <Link
                      component={'a'}
                      color={'primary'}
                      href={'/page-signup-simple'}
                      underline={'none'}
                    >
                      Sign up here.
                    </Link>
                  </Typography>
                </Box>
                <Button size={'large'} variant={'contained'} type={'submit'} onClick={(e: any) => this.handleClick(e)} disabled={this.state.blurErrors.length > 0 ? true : false}>
                  {this.state.loginText}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  }
}

interface IForm {
  email: string,
  password: string,
  action: string,
  errorCode: number,
  loginText: string,
  blurErrors: string[],
  apiErrors: string[]
}

export default Form;
