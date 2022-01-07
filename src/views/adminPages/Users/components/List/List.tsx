/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Stack, Pagination, } from '@material-ui/core';

//import { MessageCode } from 'helpers/enums';
import { IListUsersResponse, IUserList } from 'interfaces/user.admin.interfaces';
import UserAdminService from 'services/user.admin.service';

class List extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};
  readonly _pageSize: number = 5; 


  state: IList = {
    action: 'loading',
    errorMsg: '',
    data: [],
    ph: [1,2,3,4,5,6,7,8,9],
    pageCount: 1,
    paging: { currentPage: 1, spanStart: 1, spanEnd: 25 },
  }

  componentDidMount() {    
    this.load_users(); 
  }

  private next_page = (pageNumber: number) => {

  }

  private load_users = () => {
    const client: UserAdminService = new UserAdminService();   

    client.List().then(async (response: IListUsersResponse) => {
      if (response.success) {        

        this.setState({ 
          paging: { 
            currentPage: 1,
            spanStart: 1,
            spanEnd: this._pageSize            
          }, 
          pageCount: Math.ceil(response.count / this._pageSize),
          data: response.value, 
          action: 'normal' 
        });                 
      }
    }).catch((error: Error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <Box>
        <Box marginBottom={4} sx={this.state.action === 'normal' ? { display: 'flex' } : { display: 'none' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.filter((x) => x.rowNumber >= this.state.paging.spanStart && x.rowNumber <= this.state.paging.spanEnd).map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Box marginBottom={2} sx={this.state.action === 'loading' ? { display: 'flex' } : { display: 'none' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><Skeleton animation="wave" /></TableCell>
                    <TableCell align="left"><Skeleton animation="wave" /></TableCell>
                    <TableCell align="left"><Skeleton animation="wave" /></TableCell>
                    <TableCell align="center"><Skeleton animation="wave" /></TableCell>
                    <TableCell align="center"><Skeleton animation="wave" /></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.ph.map((i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell align="left"><Skeleton animation="wave" /></TableCell>
                      <TableCell align="left"><Skeleton animation="wave" /></TableCell>
                      <TableCell align="center"><Skeleton animation="wave" /></TableCell>
                      <TableCell align="center"><Skeleton animation="wave" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>            
            <Stack spacing={2} sx={this.state.action === 'normal' ? { display: 'flex' } : { display: 'none' }}  alignItems={'center'}>
              <Pagination count={this.state.pageCount} variant="outlined" />           
            </Stack>            
          </Box>
        </Box>
      </Box>
    );
  }
}

export default List;

interface IProps {
  callback: () => void;
  theme: Theme;
}

interface IList {
  action: string,
  errorMsg: string;
  data: IUserList[];
  ph: number[];
  pageCount: number;
  paging: IPaging;
}

interface IPaging { 
  currentPage: number;   
  spanStart: number; 
  spanEnd: number; 
}
