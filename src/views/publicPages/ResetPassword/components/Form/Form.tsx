/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';

import ErrorMessage from '../../../../../common/components/ErrorMessage/ErrorMessage';

import { UserService } from 'services/user.service';
import { IResetPasswordRequest, IGetCodeResponse } from 'interfaces/user.interfaces';
import { MessageCode } from 'helpers/enums';

class Form extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    code: this.props.code,
    password: '',
    passwordConfirm: '',
    action: 'normal',
    errorMsg: '',
    blurErrors: []
  }

  componentDidMount() { }

  public validateForm() {
    this.setState({ action: 'normal', blurErrors: [] });
    let blurErrors: string[] = [];

    if (this.state.password.length < 8) blurErrors.push('password');
    if (this.state.passwordConfirm.length < 8) blurErrors.push('passwordConfirm');
    if (this.state.passwordConfirm !== this.state.password) blurErrors.push('passwordConfirm');

    if (blurErrors.length > 0) {
      this.setState({ blurErrors: blurErrors });
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
    const body: IResetPasswordRequest = { password: this.state.password, code: this.props.code };

    userService.ResetPassword(body).then(async (response: IGetCodeResponse) => {
      if (response.success) {
        this.props.callback(response.value.status);
      } else {
        this.setState({ action: 'failed', errorMsg: this.setErrorMessage(response.messageCode, response.message) });
      }
    }).catch((error: Error) => {
      this.setState({ action: 'failed', errorMsg: error.message });
    });
  }

  // form onBlur validation
  private handleInputBlur = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let blurErrors: string[] = this.state.blurErrors;

    if (blurErrors.includes(e.currentTarget.name)) blurErrors.splice(blurErrors.indexOf(e.currentTarget.name), 2);

    switch (e.currentTarget.name) {
      case 'password':
        if (this.state.password.length < 8 && !blurErrors.includes(e.currentTarget.name)) blurErrors.push('password');
        break;
      case 'passwordConfirm':
        if (this.state.passwordConfirm.length < 8 && !blurErrors.includes(e.currentTarget.name)) blurErrors.push('passwordConfirm');
        if (this.state.passwordConfirm !== this.state.password && !blurErrors.includes(e.currentTarget.name)) blurErrors.push('passwordConfirm');
        break;
      default:
        break;
    }

    this.setState({ blurErrors: blurErrors });
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<IForm, keyof IForm>);
  };

  private setErrorMessage = (messageCode: MessageCode, msg: string = '') => {
    switch (messageCode) {
      case (MessageCode.InvalidModelState, MessageCode.NullValue):
        return 'Invalid email address. Please try again.';
      case MessageCode.NotFound:
        return 'The email address you have entered is not found. Please try again or sign up for a new account.';
      case MessageCode.NotOkay:
        return 'The status of your account is good and does not need a code sent. Try logging in again.';
      case MessageCode.Throttled:
        return 'You already created a new code in the last few minutes. Please wait five minutes and try again.';
      case MessageCode.Failed:
        return 'There was an error creating a new code: ' + msg;
      case MessageCode.ExceptionThrown:
        return 'Server error: ' + msg;
      default:
        return 'Unhandled exception thrown. Please contact us for support.';
    }
  }

  render() {
    return (
      <Box>
        <Box marginBottom={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Change your password
          </Typography>
          <Typography color="text.secondary">
            Your code is good! Go ahead and change your password and click update.
          </Typography>
        </Box>
        <Box>
          <ErrorMessage message={this.state.errorMsg} />
        </Box>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} marginBottom={2}>
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
                helperText={this.state.blurErrors.includes('password') ? 'Password is required' : ''}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                label="Confirm password *"
                variant="outlined"
                name={'passwordConfirm'}
                type={'password'}
                fullWidth
                value={this.state.passwordConfirm}
                onChange={(e: any) => this.handleInputChanges(e)}
                onBlur={(e: any) => this.handleInputBlur(e)}
                error={this.state.blurErrors.includes('passwordConfirm') ? true : false}
                helperText={this.state.blurErrors.includes('passwordConfirm') ? 'Confirm password is required and must match password' : ''}
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
                  <Button
                    size={'large'}
                    variant={'outlined'}
                    component={Link}
                    href={'/'}
                  >
                    Back to home
                  </Button>
                </Box>
                <Button
                  sx={{ width: 250 }}
                  size={'large'}
                  variant={'contained'}
                  onClick={(e: any) => this.handleClick(e)}
                  disabled={this.state.action === 'processing' ? true : false}>
                  {this.state.action === 'processing' ? 'Processing, please wait...' : 'Update password'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  }
}

export default Form;

interface IProps {
  callback: (status: any) => void;
  theme: Theme;
  code: string;
}

interface IForm {
  code: string,
  password: string;
  passwordConfirm: string;
  action: string,
  errorMsg: string;
  blurErrors: string[],
}
