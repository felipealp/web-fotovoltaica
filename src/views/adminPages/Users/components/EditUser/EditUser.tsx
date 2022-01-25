/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import { CardActions, CardContent, Divider, Drawer, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import Avatar from '@material-ui/core/Avatar';

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
              <Avatar sx={{ width: 100, height: 100, }}></Avatar>
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
                  <ListItem
                    component="div"
                    disableGutters
                    sx={{ alignItems: 'flex-start', padding: 0, }}                  
                  >
                    <ListItemAvatar>
                      <Box color={this.props.theme.palette.primary.main}>
                        <svg
                          width={36}
                          height={36}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </Box>                      
                    </ListItemAvatar>
                    <ListItemText
                      primary={this.state.user.email}
                      primaryTypographyProps={{ gutterBottom: false, sx: { fontWeight: 300 }, }}
                      sx={{ marginTop: '5px', }}
                    />                    
                  </ListItem>
                  <ListItem
                    component="div"
                    disableGutters
                    sx={{ alignItems: 'flex-start', padding: 0, }}                    
                  >
                    <ListItemAvatar>
                      <Box color={this.props.theme.palette.primary.main}>
                        <svg
                          width={36}
                          height={36}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </Box>                      
                    </ListItemAvatar>                    
                    <ListItemText
                      primary={this.state.user.role}
                      primaryTypographyProps={{ gutterBottom: false, sx: { fontWeight: 300 }, }}
                      sx={{ marginTop: '5px', }}
                    />
                  </ListItem>
                  <ListItem
                    component="div"
                    disableGutters
                    sx={{ alignItems: 'flex-start', padding: 0, }}                    
                  >
                    <ListItemAvatar>
                      <Box color={this.props.theme.palette.primary.main}>
                        <svg
                          width={36}
                          height={36}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>                        
                      </Box>                      
                    </ListItemAvatar>                    
                    <ListItemText
                      primary={this.state.user.statusText}
                      primaryTypographyProps={{ gutterBottom: false, sx: { fontWeight: 300 }, }}
                      sx={{ marginTop: '5px', }}
                    />
                  </ListItem>
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