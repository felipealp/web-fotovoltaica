import { userServiceUrl } from '../helpers/urls.helper';
import { fetchJwt } from '../helpers/jwt.helper'; 
import { IGetMyProfileResponse } from 'interfaces/user.profile.interfaces';

export class UserProfileService {
  
  async GetMyProfile(): Promise<IGetMyProfileResponse> {
    
    const jwt: string | null = fetchJwt();

    try {
      const response = await fetch(userServiceUrl + '/api/profile/me', {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),        
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  
}

export default UserProfileService;