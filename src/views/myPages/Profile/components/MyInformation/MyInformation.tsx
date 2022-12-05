/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import { Container, Skeleton } from '@material-ui/core';
import { IMyProfile, IUpdateMyProfileRequest } from 'interfaces/user.profile.interfaces';
import ErrorMessage from 'common/components/ErrorMessage';

class MyInformation extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IForm = {
    name: '',
    email: '',
    action: 'loading',
    message: 'something went wrong',
    blurErrors: [],
    data: { name: '', email: '', avatar_url: '', isLocked: false },
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: this.props.data,
        name: this.props.data.name,
        email: this.props.data.email,
        action: 'normal'
      });
      console.log(this.props.data);
    }
  }

  public validateForm() {
    this.setState({ action: 'normal', blurErrors: [] });
    let blurErrors: string[] = [];

    if (this.state.email.length < 8) blurErrors.push('email');
    if (this.state.name.length < 4) blurErrors.push('name');

    if (blurErrors.length > 0) {
      this.setState({ action: 'validation-error', blurErrors: blurErrors });
      return false;
    }

    return true;
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<IForm, keyof IForm>);
  };

  public handleSaveClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const body: IUpdateMyProfileRequest = {
      name: this.state.name,
      email: this.state.email
    };

    console.log(body);

    if (!this.validateForm()) {
      return;
    }
  }

  private handleInputBlur = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let blurErrors: string[] = this.state.blurErrors;

    if (blurErrors.includes(e.currentTarget.name)) blurErrors.splice(blurErrors.indexOf(e.currentTarget.name), 2);

    switch (e.currentTarget.name) {
      case 'name':
        if (this.state.name.length < 4 && !blurErrors.includes(e.currentTarget.name)) blurErrors.push('name');
        break;
      case 'email':
        if (this.state.email.length < 8 && !blurErrors.includes(e.currentTarget.name)) blurErrors.push('email');
        break;
      default:
        break;
    }

    this.setState({ blurErrors: blurErrors });
  }

  private setHelperTextMessage = (field: string) => {
    switch (field) {
      case 'name':
        return this.state.blurErrors.includes('name') ? 'name is required' : ' ';
      case 'email':
        return this.state.blurErrors.includes('email') ? 'email is required' : ' ';
      default:
        return ' ';
    }
  }

  render() {
    return (
      <Box>
        <Box justifyContent={'center'} sx={this.state.action === 'loading' ? { display: 'flex' } : { display: 'none' }}>
          <Box width={600} position="relative" zIndex={2}>
            <Box justifyContent={'center'} display={'flex'} sx={{ paddingBottom: '10px' }}>
              <Skeleton width={'50%'} height={40} />
            </Box>
            <Box justifyContent={'center'} display={'flex'}>
              <Skeleton variant="rectangular" width={'100%'} height={300} />
            </Box>
          </Box>
        </Box>

        <Container sx={this.state.action === 'normal' ? { display: 'block' } : { display: 'none' }}>
          <Box position="relative" zIndex={2}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'medium',
              }}
              gutterBottom
              color={'textSecondary'}
              align={'center'}
              justifyContent={'center'}
              paddingBottom={'20px'}
            >
              My Information
            </Typography>
          </Box>

          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Box width={'48%'}>
              <ErrorMessage message={this.state.message} />
            </Box>
          </Box>

          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Box
              padding={{ xs: 3, sm: 6 }}
              width={'50%'}
              component={Card}
              borderRadius={2}
              boxShadow={4}
              marginBottom={4}
            >
              <form noValidate autoComplete="off">
                <Box display="flex" flexDirection={'column'}>
                  <Box marginBottom={2}>
                    <TextField
                      type="text"
                      label="Name *"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      name={'name'}
                      value={this.state.name}
                      onChange={(e: any) => this.handleInputChanges(e)}
                      onBlur={(e: any) => this.handleInputBlur(e)}
                      error={this.state.blurErrors.includes('name') ? true : false}
                      helperText={this.setHelperTextMessage('name')}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <TextField
                      type="text"
                      label="Email *"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      name={'email'}
                      value={this.state.email}
                      onChange={(e: any) => this.handleInputChanges(e)}
                      onBlur={(e: any) => this.handleInputBlur(e)}
                      error={this.state.blurErrors.includes('email') ? true : false}
                      helperText={this.setHelperTextMessage('email')}
                    />
                  </Box>
                  <Button
                    sx={{ height: 54 }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth
                    onClick={(e: any) => this.handleSaveClick(e)}
                  >
                    Save
                  </Button>
                  <Divider />
                </Box>

              </form>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default MyInformation;

interface IProps {
  theme: Theme;
  data: IMyProfile;
}

interface IForm {
  name: string,
  email: string,
  action: string,
  data: IMyProfile | null,
  message: string;
  blurErrors: string[],
}