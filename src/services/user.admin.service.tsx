import { adminServiceUrl } from '../helpers/urls.helper';
import { fetchJwt } from '../helpers/jwt.helper'; 
import { IListUsersResponse } from 'interfaces/user.admin.interfaces';

export class UserAdminService {
  
  async List(): Promise<IListUsersResponse> {
    
    const jwt: string | null = fetchJwt();

    try {
      const response = await fetch(adminServiceUrl + '/api/users/list', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        body: null
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }
}

export default UserAdminService;