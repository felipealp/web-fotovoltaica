import { identityServiceUrl } from './helpers/urls.helper';
import { IForgotPasswordRequest, IResendCodeRequest, IGetCodeResponse, ISignUpRequest, IResetPasswordRequest } from 'services/interfaces/user.identity.interfaces';
import { IStandardApiResponse } from 'services/interfaces/api-response.interface';

export class UserIdentityService {
  
  async SignUp(body: ISignUpRequest): Promise<IGetCodeResponse> {
    
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

  async ConfirmCode(code: string): Promise<IStandardApiResponse> {
    
    try {
      const response = await fetch(identityServiceUrl + '/api/users/confirm', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify(code),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async ResendCode(body: IResendCodeRequest): Promise<IGetCodeResponse> {
    
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

  async ForgotPassword(body: IForgotPasswordRequest): Promise<IGetCodeResponse> {
    
    try {
      const response = await fetch(identityServiceUrl + '/api/users/forgotpassword', {
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
  
  async ResetPassword(body: IResetPasswordRequest): Promise<IGetCodeResponse> {
    
    try {
      const response = await fetch(identityServiceUrl + '/api/users/resetpassword', {
        method: 'put',
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

export default UserIdentityService;