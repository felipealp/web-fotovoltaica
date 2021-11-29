import { identityServiceUrl } from '../helpers/urls.helper';
import { IConfirmCodeRequest, IResendCodeRequest, IResendCodeResponse, ISignUpRequest, ISignUpResponse } from 'interfaces/user.interfaces';
import { IStandardApiResponse } from 'interfaces/api-response.interface';

export class UserService {
  async SignUp(body: ISignUpRequest): Promise<ISignUpResponse> {
    
    try {
      const response = await fetch(identityServiceUrl + '/api/users/signup', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(body),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async ConfirmCode(body: IConfirmCodeRequest): Promise<IStandardApiResponse> {
    
    try {
      const response = await fetch(identityServiceUrl + '/api/users/confirm', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(body),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async ResendCode(body: IResendCodeRequest): Promise<IResendCodeResponse> {
    
    try {
      const response = await fetch(identityServiceUrl + '/api/codes/resend', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(body),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  
}

export default UserService;