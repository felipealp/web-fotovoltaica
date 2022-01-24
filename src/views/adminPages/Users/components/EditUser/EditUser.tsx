/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import { Drawer, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { IUserList } from 'interfaces/user.admin.interfaces';

class EditUser extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IEditUser = {
    action: 'normal',
    errorMsg: '',
    open: this.props.open,
    user: this.props.user,
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: this.props.open, user: this.props.user });    
    }
  }

  render() {

    if (!this.state.user) {
      return (<div>No user found</div>);
    }
    else {
      return (
        <Drawer
          anchor='right'
          open={this.state.open}
          variant={'temporary'}
          color={'primary'}
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: { xs: '100%', sm: 700 } } }}
        >
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            sx={{ paddingRight: '10px', paddingTop: '10px' }}
            onClick={(e: any) => this.props.onClose()}
          >
            <IconButton>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box
            sx={{ height: '100%', padding: 1, }}
          >
           
          </Box>
        </Drawer>
      );
    }
  }
}

export default EditUser;

interface IProps {
  onClose: () => void;
  theme: Theme;
  open: boolean;
  user: IUserList | null;
}

interface IEditUser {
  action: string,
  errorMsg: string;
  open: boolean;
  user: IUserList | null;
}