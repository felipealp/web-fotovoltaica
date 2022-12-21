import { userServiceUrl } from '../helpers/urls.helper';
import { fetchJwt } from '../helpers/jwt.helper'; 
import { IGetMyProfileResponse,  IUpdateMyProfileRequest } from 'interfaces/user.profile.interfaces';
import { IStandardApiResponse } from 'interfaces/api-response.interface';

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

  async Update(body:  IUpdateMyProfileRequest): Promise<IStandardApiResponse> {

    const jwt: string | null = fetchJwt();

    try {
      const response = await fetch(userServiceUrl + '/api/profile/me', {
        method: 'put',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
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

export default UserProfileService;