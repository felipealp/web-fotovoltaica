/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';

import ErrorMessage from '../../../../layouts/common/components/ErrorMessage/ErrorMessage';

import { UserIdentityService } from 'services/user.identity.service';
import { IStandardApiResponse } from 'services/interfaces/api-response.interface';
import { MessageCode } from 'services/helpers/enums';

class Form extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {    
    code: this.props.code, 
    action: 'normal',
    errorMsg: '',   
    blurErrors: []
  }

  componentDidMount() { } 

  public validateForm() {
    this.setState({ action: 'normal', blurErrors: [] });
    let blurErrors: string[] = [];

    if (this.state.code.length < 36) blurErrors.push('code');  

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

    this.setState({ action: 'processing'});
    const userService: UserIdentityService = new UserIdentityService(); 

    userService.ConfirmCode(this.state.code).then(async (response: IStandardApiResponse) => {      
      if (response.success) {    
        //set jwt to local storage item
        await localStorage.setItem('myapp.jwt', response.value);
        
        this.setState({ action: 'success' });
        this.props.callback(); 
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
        return 'Invalid confirmation code.';
      case MessageCode.NotFound:
        return 'This code is either invalid or has already been used. Try logging in or <a href="./send-code" style="color: ' + this.props.theme.palette.common.white + '">create a new code here</a>.';
      case MessageCode.Expired:
        return 'Code has expired.';
      case MessageCode.Failed:
        return 'There was an error with confirmation code: ' + msg;
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
            Activate your account
          </Typography>
          <Typography color="text.secondary">
            Enter the confirmation code below we'll get your account activated.
          </Typography>
        </Box>
        <Box>
          <ErrorMessage message={this.state.errorMsg} />
        </Box>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} marginBottom={2}>              
              <TextField
                label="Confirmation Code *"
                variant="outlined"
                name={'Code'}
                fullWidth
                value={this.state.code}
                onChange={(e: any) => this.handleInputChanges(e)} 
                error={this.state.blurErrors.includes('code') ? true : false} 
                helperText={this.state.blurErrors.includes('code') ? 'Confirmation code is required' : ''}                         
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
                  {this.state.action === 'processing' ? 'Activating, please wait...' : 'Click to active your account'}
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
  callback: () => void;
  code: string;
  theme: Theme;
}

interface IForm {
  code: string,
  action: string,
  errorMsg: string;
  blurErrors: string[],
}
