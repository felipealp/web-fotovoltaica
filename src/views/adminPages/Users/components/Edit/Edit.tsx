/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import { CardActions, CardContent, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';

import UnLockIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import RoleIcon from '@material-ui/icons/AdminPanelSettings';
import EmailIcon from '@material-ui/icons/Email';
import DateIcon from '@material-ui/icons/CalendarToday';
import LastAttemptIcon from '@material-ui/icons/Login';
import WarningIcon from '@material-ui/icons/Warning';
import ResetIcon from '@material-ui/icons/RestartAlt';
import OkayIcon from '@material-ui/icons/ThumbUp';
import SetPersonToAdminIcon from '@material-ui/icons/PersonAddAlt1';
import SetPersonToBasicIcon from '@material-ui/icons/PersonRemoveAlt1';

import { IUserList } from 'interfaces/user.admin.interfaces';
import { stringToColor, formatDate } from 'helpers/string.helper';

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
      return (<div style={{ display: 'none' }}>&nbsp;</div>);
    }
    else {
      return (
        <Drawer
          anchor='right'
          open={this.state.open}
          variant={'temporary'}
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

          <Box sx={{ height: '100%', padding: 1, }} >
            <Box marginBottom={2} alignItems={'center'} justifyContent={'center'} component={CardActions}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: stringToColor(this.state.user.name) }}></Avatar>
            </Box>
            <Box marginBottom={4}>
              <Typography
                variant="h3"
                align={'center'}
                sx={{ fontWeight: 500, }}
              >
                {this.state.user.name}
              </Typography>
            </Box>            
            <Divider variant="middle" />
            <Box component={CardContent} padding={4}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <List>
                    <ListItem sx={{ paddingLeft: '0px' }}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <LockIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <EmailIcon color="primary" fontSize='large' />
                      </ListItemIcon>
                      <ListItemText 
                        primary={this.props.user?.email}                        
                      />
                    </ListItem>
                    <ListItem sx={{ paddingLeft: '0px' }}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <SetPersonToAdminIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <RoleIcon color="primary" fontSize='large' />
                      </ListItemIcon>
                      <ListItemText 
                        primary={this.props.user?.role}                        
                      />
                    </ListItem>
                    <ListItem sx={{ paddingLeft: '0px' }}>
                      <ListItemIcon>
                        <DateIcon color="primary" fontSize='large' />
                      </ListItemIcon>
                      <ListItemText 
                        primary={this.props.user?.dateCreated}    
                        secondary={'Date created'}                    
                      />
                    </ListItem>
                    <ListItem sx={{ paddingLeft: '0px' }}>
                      <ListItemIcon>
                        <LastAttemptIcon color="primary" fontSize='large' />
                      </ListItemIcon>
                      <ListItemText 
                        primary={formatDate(this.state.user.dateLastAttempt, 'No login attempts')}    
                        secondary={'Last attempted login'}                    
                      />
                    </ListItem>
                    <ListItem sx={{ paddingLeft: '0px' }}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <ResetIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <WarningIcon color="error" fontSize='large' />
                      </ListItemIcon>
                      <ListItemText 
                        primary={this.state.user.statusText}                      
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
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