import { adminServiceUrl } from './helpers/urls.helper';
import { fetchJwt } from './helpers/jwt.helper'; 
import { IListUsersResponse, IListUsersRequest, IUserUpdatePatch } from 'services/interfaces/user.admin.interfaces';
import { IStandardApiResponse } from 'services/interfaces/api-response.interface';

export class UserAdminService {
  
  async List(body: IListUsersRequest | null = null): Promise<IListUsersResponse> {
    
    const jwt: string | null = fetchJwt();

    try {
      const response = await fetch(adminServiceUrl + '/api/users/list', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        body: JSON.stringify(body),
      });

      const results = await Promise.resolve(response);

      return await results.json();
    } catch (error: any) {      
      return await Promise.reject(error);
    }
  } 
  
  async Delete(id: string): Promise<IStandardApiResponse> {
    const jwt: string | null = fetchJwt();
    const patch: IUserUpdatePatch = { id: id, role: '', action: 'delete' };

    try {
      const response = await fetch(adminServiceUrl + '/api/users/update', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        body: JSON.stringify(patch),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }  

  async DeleteForever(id: string): Promise<IStandardApiResponse> {
    const jwt: string | null = fetchJwt();

    try {
      const response = await fetch(adminServiceUrl + '/api/users/deleteforever/' + id, {
        method: 'delete',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        })        
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }  

  async UnLock(id: string): Promise<IStandardApiResponse> {
    const jwt: string | null = fetchJwt();
    const patch: IUserUpdatePatch = { id: id, role: '', action: 'unlock' };

    try {
      const response = await fetch(adminServiceUrl + '/api/users/update', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        body: JSON.stringify(patch),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }  

  async Lock(id: string): Promise<IStandardApiResponse> {
    const jwt: string | null = fetchJwt();
    const patch: IUserUpdatePatch = { id: id, role: '', action: 'lock' };

    try {
      const response = await fetch(adminServiceUrl + '/api/users/update', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        body: JSON.stringify(patch),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }  

  async Reset(id: string): Promise<IStandardApiResponse> {
    const jwt: string | null = fetchJwt();
    const patch: IUserUpdatePatch = { id: id, role: '', action: 'reset' };

    try {
      const response = await fetch(adminServiceUrl + '/api/users/update', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        body: JSON.stringify(patch),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }  
    
  async Restore(id: string): Promise<IStandardApiResponse> {
    const jwt: string | null = fetchJwt();
    const patch: IUserUpdatePatch = { id: id, role: '', action: 'restore' };

    try {
      const response = await fetch(adminServiceUrl + '/api/users/update', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        body: JSON.stringify(patch),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }  

  async ChangeRole(role: string, id: string): Promise<IStandardApiResponse> {
    const jwt: string | null = fetchJwt();
    const patch: IUserUpdatePatch = { id: id, role: role, action: 'changerole' };

    try {
      const response = await fetch(adminServiceUrl + '/api/users/update', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${jwt}`,
          Accept: 'application/json',
        }),
        body: JSON.stringify(patch),
      });

      const results = await Promise.resolve(response);
      return await results.json();
    } catch (error: any) {
      return await Promise.reject(error);
    }
  }  
}

export default UserAdminService;