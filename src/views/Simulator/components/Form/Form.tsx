/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import ResultModal from './ResultModal';

import { base64EncodeString } from 'services/helpers/security.helper';
import AuthIdentityService from 'services/auth.identity.service';
import { AuthMessageCode, FormCode } from 'services/helpers/enums';
import { IAuthApiResponse } from 'services/interfaces/api-response.interface';
import { ErrorMessage } from 'layouts/common/components';

const estadosBrasil = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás',
  'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco',
  'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina',
  'São Paulo', 'Sergipe', 'Tocantins'
];

const cidadesEstado = {
  'Acre': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó'],
  'Alagoas': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Marechal Deodoro'],
  'Amapá': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Pedra Branca do Amapari'],
  'Amazonas': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
  'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna'],
  'Ceará': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral'],
  'Distrito Federal': ['Brasília'],
  'Espírito Santo': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Linhares'],
  'Goiás': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia'],
  'Maranhão': ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias'],
  'Mato Grosso': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'],
  'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
  'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Belo Horizonte', 'Montes Claros'],
  'Pará': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal'],
  'Paraíba': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
  'Paraná': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
  'Pernambuco': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina'],
  'Piauí': ['Teresina', 'Parnaíba', 'Picos', 'Floriano', 'Piripiri'],
  'Rio de Janeiro': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói'],
  'Rio Grande do Norte': ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Ceará-Mirim'],
  'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas', 'Santa Maria'],
  'Rondônia': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal'],
  'Roraima': ['Boa Vista', 'Caracaraí', 'Rorainópolis', 'São Luiz', 'Caroebe'],
  'Santa Catarina': ['Joinville', 'Florianópolis', 'Blumenau', 'São José', 'Criciúma'],
  'São Paulo': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André'],
  'Sergipe': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'Estância'],
  'Tocantins': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins']
};

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
    electricityAccess: true,
    state: '',
    city: '',
    locationType: '',
    tariffAdjustment: 0,
    monthlyEnergyCost: null,
    showModal: false, // Estado para controlar a visibilidade do modal
    simulationData: null, // Estado para armazenar os dados da simulação
  }   

  handleSimulation = () => {
    // Realize os cálculos da simulação e atualize o estado simulationData
    const simulationData = {
      investmentRange: [516639.11, 688852.15],
      monthlySavings: 7514,
      totalSavings: 8226476.6,
      // Outras informações simuladas
    };

    this.setState({ simulationData, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

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
    console.log('simulaaaaaaa', this.state);
    this.handleSimulation();
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

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>, elementName: any) => {
    e.preventDefault();
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<IForm, keyof IForm>);
  };

  private handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>, elementName: any) => {
    e.preventDefault();
    this.setState({ [elementName]: e.target.checked } as unknown as Pick<IForm, keyof IForm>);
  };

  private handleSelectChanges = (e: any, elementName: any) => {
    e.preventDefault();
    console.log(e);
    this.setState({ [elementName]: e.target.value || '' } as unknown as Pick<IForm, keyof IForm>);
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
              <Box display="flex" alignItems="center">
                <Switch
                  name="electricityAccess"
                  checked={this.state.electricityAccess}
                  onChange={(e) => this.handleToggleChange(e, 'electricityAccess')} // Usaremos uma nova função para lidar com toogle
                />
                <Typography >
                  {this.state.electricityAccess ? 'SIM' : 'NÃO'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                2. ONDE PRETENDE REALIZAR A INSTALAÇÃO?
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="select-state">Estado</InputLabel>
                <Select
                  labelId="select-state"
                  label="Estado"
                  variant="outlined"
                  name="state"
                  fullWidth
                  value={this.state.state}
                  onChange={(e: any) => this.handleSelectChanges(e, 'state')}
                >
                  {estadosBrasil.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={this.state.state ? { display: '' } : { display: 'none' }}>
              <InputLabel id="select-city">Cidade</InputLabel>
              <Select
                labelId="select-city"
                label="Cidade"
                variant="outlined"
                name="city"
                fullWidth
                value={this.state.city}
                onChange={(e: any) => this.handleSelectChanges(e, 'city')}
              >
                {cidadesEstado[this.state.state as keyof typeof cidadesEstado]?.map((cidade) => (
                  <MenuItem key={cidade} value={cidade}>
                    {cidade}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                3. QUAL O TIPO DE LOCAL?
              </Typography>
              <RadioGroup
                name="locationType"
                value={this.state.locationType}
                onChange={(e) => this.handleInputChanges(e, 'locationType')} // Use uma nova função para lidar com radio buttons
              >
                <FormControlLabel value="residencial" control={<Radio />} label="RESIDENCIAL" />
                <FormControlLabel value="empresarial" control={<Radio />} label="EMPRESARIAL" />
                <FormControlLabel value="outro" control={<Radio />} label="OUTRO" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                4. QUANTO VOCÊ PAGA EM ENERGIA NO MÊS?
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
            <Grid item xs={12}>
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
                  {this.state.action === 'processing' ? 'Cálculo em andamento, aguarde...' : 'Simular'}
                </Button>
              </Box>
              {this.state.showModal && this.state.simulationData && (
                <ResultModal data={this.state} onClose={this.closeModal} />
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  }
}

// faça tudo aqui só se preocupar em add os campos e fazer o calculo

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
  electricityAccess: boolean,
  state: string,
  city: string,
  locationType: string,
  tariffAdjustment: number,
  monthlyEnergyCost: any,
  showModal: boolean; // Estado para controlar a visibilidade do modal
  simulationData: any; // Estado para armazenar os dados da simulação
}

export default Form;
