/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Theme } from '@material-ui/core/styles';
import { Alert, Container, Skeleton, Snackbar } from '@material-ui/core';
import { IMyProfile, IUpdateMyProfileRequest } from 'interfaces/user.profile.interfaces';
import ErrorMessage from 'common/components/ErrorMessage';
import UserProfileService from 'services/user.profile.service';
import { IApiResponse } from 'interfaces/api-response.interface';

class CoreInformation extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    name: '',
    email: '',
    action: 'normal',
    status: 'loading',
    message: '',
    blurErrors: [],
    //data: { name: '', email: '', avatar_Url: '', isLocked: false },
  }

  componentDidMount() {
    console.log('componentDidMount');
  }  
  
  render() {
    return (
      <Box>
        <Box>Core information</Box>
      </Box>
    );
  }
}

export default CoreInformation;

interface IProps {
  theme: Theme;
  id: string;
}

interface IForm {
  name: string,
  email: string,
  action: string,
  status: string,
  //data: IMyProfile | null,
  message: string;
  blurErrors: string[],
}