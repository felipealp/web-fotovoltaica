/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Container from 'common/Container';
import { IListUsersRequest } from 'interfaces/user.admin.interfaces';

class SearchBox extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: ISearchBox = {
    action: 'normal',
    errorMsg: '',
    searchText: ''
  }

  componentDidMount() {

  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as unknown as Pick<ISearchBox, keyof ISearchBox>);
  };

  private handleSearchButtonClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const body: IListUsersRequest = { 
      name: this.state.searchText,
      email: null,
      isActive: true,
      role: null,
      status: -1
    };
    
    this.props.callback(body);
  }

  render() {
    return (
      <Container maxWidth={'75%'}>
        <Box
          component={Card}
          maxWidth={{ xs: '100%', md: '100%' }}
          boxShadow={4}
        >
          <CardContent>
            <Box
              component={'form'}
              noValidate
              autoComplete="off"
              sx={{ '& .MuiInputBase-input.MuiOutlinedInput-input': { bgcolor: 'background.paper', }, }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={11}>
                  <Box
                    component={TextField}
                    label="search text"
                    variant="outlined"
                    color="primary"
                    name={'searchText'}
                    fullWidth
                    height={54}
                    value={this.state.searchText}
                    onChange={(e: any) => this.handleInputChanges(e)}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Box
                    component={Button}
                    variant="contained"
                    color="primary"
                    size="large"
                    height={54}
                    fullWidth
                    onClick={(e: any) => this.handleSearchButtonClick(e)}
                  >
                    Search
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Box>
      </Container>
    );
  }
}

export default SearchBox;

interface IProps {
  callback: (body: IListUsersRequest) => void;
  theme: Theme;
}

interface ISearchBox {
  action: string,
  errorMsg: string;
  searchText: string;
}