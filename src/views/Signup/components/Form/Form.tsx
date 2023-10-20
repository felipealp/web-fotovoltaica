/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import axios from 'axios';

import { ISignUpRequest } from 'services/interfaces/user.identity.interfaces';
import { fetchIpAddress } from 'services/helpers/network.helper';
import { ErrorMessage } from 'layouts/common/components';

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
    
    const body: ISignUpRequest = {
      name: this.state.name,
      email: this.state.email,
      senha: this.state.password,
      ipaddress: this.state.ipaddress
    };

    axios
      .post('http://localhost:3001/api/users', body)
      .then((response: any) => {
        console.log(response);
        if (response.data) {
          this.props.callback();
        } else {
          this.setState({
            action: 'failed',
            password: '',
            message: this.setErrorMessage(response.data.messageCode, response.data.message),
          });
        }
      })
      .catch((error: any) => {
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
        return this.state.blurErrors.includes('name') ? 'O nome deve ser válido' : ' ';
      case 'email':
        return this.state.blurErrors.includes('email') ? 'O email deve ser válido' : ' ';
      case 'password':
        return this.state.blurErrors.includes('password') ? 'A senha deve ser válida' : ' ';     
      default:
        return ' ';
    }
  }

  private setErrorMessage = (messageCode: number, msg: string = '') => {
    switch (messageCode) {
      case 402:
        return 'Os valores de formulário que foram informados no servidor são inválidos.';
      case 406:
        return 'O endereço de e-mail já existe para outro usuário. Tente com um e-mail diferente ou <a href="./forgot-password" style="color: ' + this.props.theme.palette.common.white + '">clique aqui</a> para recuperar sua conta.';
      case 600:
        return 'Houve um erro no servidor: ' + msg;
      default:
        return 'Falha ao realizar requisição, entre em contato.';
    }
  }

  render() {
    return (
      <Box >
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Box width={1} height="90%" display="flex" alignItems="center">
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
                  Cadastre-se aqui!
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
                    Para começar, inscreva-se conosco. Faremos grandes coisas juntos.
                  </Typography>
                </Box>
              </Box>
            </Box>            
          </Grid>
          <Grid item xs={12} md={6}>
            <Box width={1} height="80%" alignItems="center">
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
                        label="Nome *"
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
                        label="Senha *"
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
                        {this.state.action === 'processing' ? 'Cadastro em andamento, aguarde...' : 'Cadastrar'}
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
