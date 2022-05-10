import { adminServiceUrl } from '../helpers/urls.helper';
import { fetchJwt } from '../helpers/jwt.helper'; 
import { IListTokensResponse } from 'interfaces/token.admin.interfaces';
import { IStandardApiResponse } from 'interfaces/api-response.interface';

export class TokenAdminService {
  
  async List(): Promise<IListTokensResponse> {
    
    const jwt: string | null = fetchJwt();

    try {
      const response = await fetch(adminServiceUrl + '/api/tokens/list', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        //body: JSON.stringify(body),
      });

      const results = await Promise.resolve(response);

      return await results.json();
    } catch (error: any) {      
      return await Promise.reject(error);
    }
  } 
  
  async Delete(id: string): Promise<IStandardApiResponse> {
    const jwt: string | null = fetchJwt();
    
    try {
      const response = await fetch(`${adminServiceUrl}/api/tokens/delete/${id}`, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        //body: JSON.stringify(patch),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }   
}

export default TokenAdminService;