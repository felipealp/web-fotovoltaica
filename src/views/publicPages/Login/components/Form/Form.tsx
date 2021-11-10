/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

interface Props { }

class Form extends React.Component<Props, IForm> {
  state: IForm = {
    email: '',
    password: '',
    action: 'normal',
    errorCode: 200,
    validation: 'none',
  }

  public validateForm() {
    this.setState({ action: 'normal', validation: ''});
    let validation: string[] = [];
   
    if (this.state.email.length < 8) {
      validation.push('email');      
    }

    if (this.state.password === '')
    {
      validation.push('password');  
    }
   
    if (validation.length > 0) {
      this.setState({ action: 'validation-error', validation: validation.toString()});
      return false;
    }
    
    return true;
  }

  public handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }
    
    console.log(this.state);
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<IForm, keyof IForm>);
  };

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
                error={this.state.validation.includes('email') ? true : false}
                helperText={this.state.validation.includes('email') ? 'valid email address is required' : 'helper text'}
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
                error={this.state.validation.includes('password') ? true : false}
                helperText={this.state.validation.includes('password') ? 'password is required' : 'helper text'}
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
                <Button size={'large'} variant={'contained'} type={'submit'} onClick={(e: any) => this.handleClick(e)} disabled={this.state.errorCode !== 200 ? true : false}>
                  Login
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
  validation: string,
}

export default Form;
