import React from 'react';
import UnLockIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { IconButton } from '@material-ui/core';

import UserAdminService from 'services/user.admin.service';
import { IApiResponse } from 'interfaces/api-response.interface';

class ResetUser extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};
  
  state: IResetUser = {
    action: 'normal',
    errorMsg: '',
    isLocked: this.props.isLocked,
  }

  componentDidMount() {

  }

  handleUnLockClick(id: string) {  
    let client: UserAdminService | null = new UserAdminService();    
    
    client.UnLock(id).then(async (response: IApiResponse) => {
      if (response.success) {   
        this.setState({ isLocked: false });    
      }
    }).catch((error: Error) => {
      console.log(error);
    });
    
    client = null;
  }

  handleLockClick(id: string) {   
    let client: UserAdminService | null = new UserAdminService();    
    
    client.Lock(id).then(async (response: IApiResponse) => {
      if (response.success) {   
        this.setState({ isLocked: true });    
      }
    }).catch((error: Error) => {
      console.log(error);
    });
    
    client = null;
  }

  render() {
    
    if(this.state.isLocked)
    {    
      return (
        <IconButton aria-label="unlock user" onClick={(e: any) => this.handleUnLockClick(this.props.id)}>
          <UnLockIcon />
        </IconButton>
      );
    }
    else {
      return (
        <IconButton aria-label="lock user" onClick={(e: any) => this.handleLockClick(this.props.id)}>
          <LockIcon />
        </IconButton>
      );
    }
  }
}

export default ResetUser;

interface IProps {
  onCallback: () => void;
  id: string;
  isLocked: boolean;
}

interface IResetUser {
  action: string,
  errorMsg: string;
  isLocked: boolean;
}
