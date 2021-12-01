import jwt_decode from 'jwt-decode';

import { identityServiceUrl, apiKey } from '../helpers/urls.helper';
import { ILoginRequest } from '../interfaces/login.interfaces';
import { IStandardApiResponse } from '../interfaces/api-response.interface';
import { IJwt } from '../interfaces/jwt.interfaces';
import { fetchJwt } from '../helpers/jwt.helper';

export class LoginRequest implements ILoginRequest {
  login: string;

  constructor(value: string) {
    this.login = value;
  }
}

export class AuthService {
  async Login(loginString: string): Promise<IStandardApiResponse> {
    let body = new LoginRequest(loginString);

    try {
      const response = await fetch(identityServiceUrl + '/api/auth/login', {
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

  Logout = async (jwt: string | null): Promise<IStandardApiResponse> => {
    const apiResponse: IStandardApiResponse = {
      success: false,
      message: 'unauthorized',
      messageCode: 500,
      value: '',
      count: 0,
    };   

    // if token is not null, then post to logout rest endpoint to kill token
    if (jwt !== null) {
      try {
        const response = await fetch(identityServiceUrl + '/api/auth/logout', {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
            Accept: 'application/json',
          }),
        });
  
        const results: Response = await Promise.resolve(response);  

        apiResponse.success = true;
        apiResponse.messageCode = results.status;
        apiResponse.message = results.statusText; 

        return await Promise.resolve(apiResponse);               
      } catch (error) {        
        return await Promise.reject(apiResponse);
      }
    }

    // token not found error
    apiResponse.messageCode = 404;
    apiResponse.message = 'token not found';

    return await Promise.reject(apiResponse);    
  };

  IsToken(jwt: string | null, role: string = ''): boolean {
    let decoded: IJwt;

    if (jwt == null) {
      return false;
    }

    try {
      decoded = jwt_decode(jwt);
      var jwtRole = decoded.role;

      if (role === '') return true;
      if (role.toLowerCase === jwtRole.toLowerCase) return true;

      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async IsValidateToken(jwt: string | null): Promise<boolean> {
    let isValid: boolean = false;

    if (jwt === null || jwt === undefined) return Promise.resolve(isValid);

    const status: number = await fetch(identityServiceUrl + '/api/auth/validate', {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
        'apiKey': apiKey,
        Authorization: 'Bearer ' + jwt,
        Accept: 'application/json',
      }),
    }).then(response => {
      return Promise.resolve(response.status);
    }).catch(error => {
      return Promise.reject(error.status);
    });

    isValid = (status === 200 || status === 201) ? true : false;

    return Promise.resolve(isValid);
  }  
}

export interface IAuthCheck {
  isAuthenticated: boolean,
  permissions: []
}

export const authCheck = async (role: string | ''): Promise<IAuthCheck> => {
  const jwt: string | null = fetchJwt();
  const authService = new AuthService();
  let isValidToken =  (jwt === null || jwt === undefined) ? false : true;

  const status = await authService.IsValidateToken(jwt).then(async (response) => {
    return response;
  }).catch((error) => {
    return error;
  });

  isValidToken = status;

  return { isAuthenticated: isValidToken, permissions: [] };
};

export default AuthService;