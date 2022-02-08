/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import { CardActions, CardContent, Divider, Drawer, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';

import { IUserList } from 'interfaces/user.admin.interfaces';
import { stringToColor, formatDate } from 'helpers/string.helper';

const _shieldExclamationSvg: string = 'M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01';
const _checkSvg: string = 'M5 13l4 4L19 7';
const _exclamationSvg: string = 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
const _banSvg: string = 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636';
const _eyeOffSvg: string = 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21';

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

  buildSvgByStatus(status: number): any {
    let color: string = 'currentColor';
    let d: string = 'M5 13l4 4L19 7';

    switch (status) {
      case 0:
        color = 'yellow';
        d = _shieldExclamationSvg;
        break;
      case 1:
        color = 'green';
        d = _checkSvg;
        break;
      case 2:
        color = 'yellow';
        d = _exclamationSvg;
        break;
      case 3:
        color = 'red';
        d = _banSvg;
        break;
      case 4:
        color = 'grey';
        d = _eyeOffSvg;
        break;
    }

    return (
      <svg width={36} height={36} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
    );
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={formatDate(this.state.user.dateCreated)}
                      secondary='Date created'
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={formatDate(this.state.user.dateLastAttempt, 'No login attempts')}
                      secondary='Last attempted login'
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
                        {this.buildSvgByStatus(this.state.user.status)}
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
            <Divider variant="middle" />
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