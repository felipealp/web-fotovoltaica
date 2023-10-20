import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '../../layouts/common/Container';
import { Form, Processing, Success, Error } from './components';
import { CodeIdentityService } from 'services';
import { IGetCodeResponse, IValidateCodeRequest } from 'services/interfaces/user.identity.interfaces';
import { MessageCode, UserStatus } from 'services/helpers/enums';

const ResetPassword = () => {  
  const { code } = useParams<{ code: string }>();
  const [action, setAction] = useState(1);
  const [message, setMessage] = useState('');
  const theme: any = useTheme();

  const callbackSuccess = (val: any) => {  
    setAction(3);      
  };

  const setMessageFromMessageCode = (messageCode: MessageCode) => {
    switch (messageCode) {
      case (MessageCode.InvalidModelState, MessageCode.NullValue, MessageCode.InvalidParamValue, MessageCode.NotFound):
        return 'The code in the email link does not appear valid. Please try clicking the link again or use the button below and we will send you a new one.';
      case MessageCode.Expired:
        return 'This code from the email link as expired. Please use the button below and we will send you a new one.';              
      default:
        return 'Unhandled exception thrown. Please contact us for support.';
    }
  };

  const fetchAndValidateCode = useCallback(() => {
    const codeService = new CodeIdentityService();
    const body: IValidateCodeRequest = { code: code, status: UserStatus.ForgotPassword }; 

    codeService.Validate(body).then(async (response: IGetCodeResponse) => {      
      if (response.success) {      
        setAction(2);
      } else {  
        setMessage(setMessageFromMessageCode(response.messageCode));    
        setAction(-1);
      }
    }).catch((error: Error) => {    
      setAction(-1);
      setMessage('Unhandled exception thrown. Please contact us for support.');
    });
  }, [code]);

  useEffect(() => {
    setTimeout(() => {
      fetchAndValidateCode();
    }, 2000);    
  }, [fetchAndValidateCode]);

  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}
    >      
      <Container maxWidth={600} sx={action === -1 ? { display: 'flex' } : { display: 'none' }}>
        <Error theme={theme} message={message} />
      </Container> 
      <Container maxWidth={600} sx={action === 1 ? { display: 'flex' } : { display: 'none' }}>
        <Processing theme={theme} />
      </Container>      
      <Container maxWidth={600} sx={action === 2 ? { display: 'flex' } : { display: 'none' }}>
        <Form callback={callbackSuccess} code={code} theme={theme} />
      </Container>  
      <Container maxWidth={600} sx={action === 3 ? { display: 'flex' } : { display: 'none' }}>
        <Success theme={theme} />
      </Container>      
    </Box>
  );
};

export default ResetPassword;
