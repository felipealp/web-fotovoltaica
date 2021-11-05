import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '../../../common/Container';
import { Form } from './components';
import { ILogin } from './ILogin';
import { Redirect } from 'react-router-dom';

interface Props { }

class Login extends React.Component<ILogin, Props> {
  state: ILogin = {
    action: 'normal'
  };

  componentDidMount() {

  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {

  }

  render() {

    if (this.state.action === 'normal') {
      return <Redirect to='/page-not-found' />;
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
        <Container maxWidth={600}>
          <Form />
        </Container>
      </Box>
    );
  }
}

export default Login;
