/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { base64EncodeString } from 'services/helpers/security.helper';
import AuthIdentityService from 'services/auth.identity.service';
import { AuthMessageCode, FormCode } from 'services/helpers/enums';
import { IAuthApiResponse } from 'services/interfaces/api-response.interface';
import { ErrorMessage } from 'layouts/common/components';

class Form extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};
  
  state: IForm = {
    email: '',
    password: '',
    action: 'normal',
    formCode: FormCode.Ok,
    message: '',
    messageCode: AuthMessageCode.Failed,
    loginText: 'Login',
    blurErrors: [],
    electricityAccess: '',
    state: '',
    city: '',
    locationType: '',
    tariffAdjustment: 0,
    monthlyEnergyCost: 0
  }   

  public validateForm() {
    this.setState({ action: 'normal', blurErrors: []});
    let blurErrors: string[] = [];
   
    if (this.state.email.length < 8) blurErrors.push('email'); 
    if (this.state.password.length < 8) blurErrors.push('password');  
       
    if (blurErrors.length > 0) {
      this.setState({ blurErrors: blurErrors});
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

    const loginString = this.state.email + ':' + this.state.password;
    const hashed: string = base64EncodeString(loginString);
    const auth: AuthIdentityService = new AuthIdentityService();

    auth.Login(hashed).then(async(response: IAuthApiResponse) => {      
      if (response.success) {
        // set jwt to local storage item
        await localStorage.setItem('myapp.jwt', response.value);     
        this.props.callback();
      }
      else {
        this.setState({ action: 'failed', loginText: 'Login', formCode: FormCode.ApiFail, message: response.message, messageCode: response.messageCode });
      }
    });
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>, text: any) => {
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

  private setErrorMessage = (authMessageCode: AuthMessageCode, msg: string = '') => {
    switch (authMessageCode) {
      case (AuthMessageCode.InvalidFormat):
        return 'Invalid email address or password. Please try again.';    
      case (AuthMessageCode.NotFound):
        return 'Email address not found. Please try a differnt email or create a new account.';
      case (AuthMessageCode.Blocked):
        return 'This email address has been blocked. Please contact use.';
      case (AuthMessageCode.LoginAttempts):
        return msg;
      case (AuthMessageCode.NotConfirmed):
        return 'This email address has not yet been confirmed. Please check your inbox for a confirm account message.';
      case (AuthMessageCode.InvalidStatus):
        return 'The status of our account is not eligible to for login. This usually means you have attempted to reset your password but you have not finished the process.';
      case (AuthMessageCode.NotActive):
        return 'The status of your account is currently marked not active';  
      case (AuthMessageCode.ExceptionThrown):
        return 'Unhandled exception thrown. Please contact us for support.';
      default:
        return '';
    }
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
            SIMULADOR
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Bem-vindo
          </Typography>
          <Typography color="text.secondary">
            {/* Texto de boas-vindas */}
          </Typography>
        </Box>
        <ErrorMessage message={this.setErrorMessage(this.state.messageCode, this.state.message)} />
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                1. O LOCAL POSSUI ACESSO À REDE ELÉTRICA?
              </Typography>
              <TextField
                label="SIM / NÃO"
                variant="outlined"
                name="electricityAccess" // Nome do campo para acesso à rede elétrica
                fullWidth
                value={this.state.electricityAccess} // Valor do campo
                onChange={(e: any) => this.handleInputChanges(e, 'electricityAccess')} // Handler
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                2. ONDE PRETENDE REALIZAR A INSTALAÇÃO?
              </Typography>
              <TextField
                label="ESTADO"
                variant="outlined"
                name="state" // Nome do campo para estado
                fullWidth
                value={this.state.state} // Valor do campo
                onChange={(e: any) => this.handleInputChanges(e, 'state')} // Handler
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="CIDADE"
                variant="outlined"
                name="city" // Nome do campo para cidade
                fullWidth
                value={this.state.city} // Valor do campo
                onChange={(e: any) => this.handleInputChanges(e, 'city')} // Handler
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                3. QUAL O TIPO DE LOCAL?
              </Typography>
              <TextField
                label="RESIDENCIAL / EMPRESARIAL / OUTRO"
                variant="outlined"
                name="locationType" // Nome do campo para tipo de local
                fullWidth
                value={this.state.locationType} // Valor do campo
                onChange={(e: any) => this.handleInputChanges(e, 'locationType')} // Handler
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                4. AJUSTE DE TARIFA (R$)
              </Typography>
              <TextField
                label="Ajuste de tarifa"
                variant="outlined"
                name="tariffAdjustment" // Nome do campo para ajuste de tarifa
                fullWidth
                value={this.state.tariffAdjustment} // Valor do campo
                onChange={(e: any) => this.handleInputChanges(e, 'tariffAdjustment')} // Handler
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                5. QUANTO VOCÊ PAGA EM ENERGIA NO MÊS?
              </Typography>
              <TextField
                label="Custo mensal de energia (R$)"
                variant="outlined"
                name="monthlyEnergyCost" // Nome do campo para custo mensal de energia
                fullWidth
                value={this.state.monthlyEnergyCost} // Valor do campo
                onChange={(e: any) => this.handleInputChanges(e, 'monthlyEnergyCost')} // Handler
              />
            </Grid>
            {/* Restante do código permanece o mesmo */}
          </Grid>
        </form>
      </Box>
    );
  }
}

interface IProps {	
	callback: () => void;
}

interface IForm {
  email: string,
  password: string,
  action: string,
  formCode: FormCode,
  message: string;
  messageCode: AuthMessageCode;
  loginText: string,
  blurErrors: string[],
  electricityAccess: string,
  state: string,
  city: string,
  locationType: string,
  tariffAdjustment: number,
  monthlyEnergyCost: number
}

export default Form;
