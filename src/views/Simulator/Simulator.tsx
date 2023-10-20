import React from 'react';
//import { Redirect } from 'react-router';
import Box from '@material-ui/core/Box';
import Container from '../../layouts/common/Container';

import { Form } from './components';

class Simulator extends React.Component<ILogin, {}> {
  state: ILogin = {
    action: 'normal'
  };

  componentDidMount() { } 
  
  private callbackLoginSuccessfull = () => {    
    this.setState({ action: 'redirect'});
  };

  render() {

    if (!localStorage.getItem('token_api')) {
      window.location.href = '/login';
    }

    if (this.state.action === 'redirect') {
      window.location.href = '/home';
    }

    return (
      <Box
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={'100%'}
      >
        SIMULADORRRRRRRRRRR
        <Container maxWidth={600}>
          <Form callback={this.callbackLoginSuccessfull} />
        </Container>
      </Box>
    );
  }
}

export interface ILogin {
  action: string;  
}

export default Simulator;
