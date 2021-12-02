/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';

class Form extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {    
    email: '',  
    code: this.props.code, 
    action: 'normal',
    errorMsg: '',   
    blurErrors: []
  }

  componentDidMount() { } 

  public handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();    

    // this.setState({ action: 'processing' });  
    this.props.callback();  
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
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>              
              <TextField
                label="Code *"
                variant="outlined"
                name={'Code'}
                fullWidth
                value={this.state.code}
                onChange={(e: any) => this.handleInputChanges(e)}                           
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
                  sx={{ width: 240 }}
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
  email: string,
  code: string,
  action: string,
  errorMsg: string;
  blurErrors: string[],
}
