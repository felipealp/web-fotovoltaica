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
import { IResendCodeRequest, IGetCodeResponse } from 'interfaces/user.interfaces';
import { MessageCode } from 'helpers/enums';

class Form extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    email: '',
    action: 'normal',
    errorMsg: '',
    blurErrors: []
  }

  componentDidMount() { }

  public validateForm() {
    this.setState({ action: 'normal', blurErrors: [] });
    let blurErrors: string[] = [];

    if (this.state.email.length < 8) blurErrors.push('email');

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
    const body: IResendCodeRequest = { email: this.state.email };

    userService.ResendCode(body).then(async (response: IGetCodeResponse) => {
      if (response.success) {
        this.setState({ action: 'success' });
        this.props.callback(response.value.status);
      } else {
        this.setState({ action: 'failed', errorMsg: this.setErrorMessage(response.messageCode) });
      }
    }).catch((error: Error) => {
      this.setState({ action: 'failed', errorMsg: error.message });
    });
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<IForm, keyof IForm>);
  };

  private setErrorMessage = (messageCode: MessageCode, msg: string = '') => {
    switch (messageCode) {
      case MessageCode.InvalidModelState:
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
            Resend Code
          </Typography>
          <Typography color="text.secondary">
            Enter your email address and we will generate a new code and send you a message.
          </Typography>
        </Box>
        <Box>
          <ErrorMessage message={this.state.errorMsg} />
        </Box>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                label="Email *"
                variant="outlined"
                name={'email'}
                fullWidth
                value={this.state.email}
                onChange={(e: any) => this.handleInputChanges(e)}
                error={this.state.blurErrors.includes('email') ? true : false}
                helperText={this.state.blurErrors.includes('email') ? 'Email is required' : ''}
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
                  {this.state.action === 'processing' ? 'Creating code, please wait...' : 'Click to send code'}
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
}

interface IForm {
  email: string,
  action: string,
  errorMsg: string;
  blurErrors: string[],
}
