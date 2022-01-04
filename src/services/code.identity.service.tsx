import { identityServiceUrl } from '../helpers/urls.helper';
import { IGetCodeResponse, IValidateCodeRequest } from 'interfaces/user.identity.interfaces';

export class CodeIdentityService {
  
  async Validate(body: IValidateCodeRequest): Promise<IGetCodeResponse> {    
    try {
      const response = await fetch(identityServiceUrl + '/api/codes/validate', {
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

export default CodeIdentityService;