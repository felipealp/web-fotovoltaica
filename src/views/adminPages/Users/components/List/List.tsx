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
  readonly _pageSize: number = 25;

  state: IList = {
    action: 'loading',
    errorMsg: '',
    data: [],
    ph: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    pageCount: 1,
    paging: { currentPage: 1, spanStart: 1, spanEnd: this._pageSize },
  }

  componentDidMount() {
    this.load_users();    
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.searchObj !== this.props.searchCriteria) {
      console.log('props changed');
      console.log(this.props.searchCriteria);
    }
  }

  private handlePageChange = (e: React.ChangeEvent<HTMLButtonElement>, value: string) => {
    const next: string = '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>';
    const back: string = '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>';
    let current: number = 1;    

    if (value !== undefined || value !== '' ) current = parseInt(value);
    if (isNaN(current)) current = this.state.paging.currentPage;
    if (e.target.innerHTML === next) current = this.state.paging.currentPage + 1; 
    if (e.target.innerHTML === back) current = this.state.paging.currentPage - 1;       

    const start: number = (current * this._pageSize) - this._pageSize + 1;
    const end: number = current * this._pageSize;

    this.setState({ paging: { currentPage: current, spanStart: start, spanEnd: end } });
  }

  private load_users = () => {
    const client: UserAdminService = new UserAdminService();        

    client.List(this.props.searchCriteria).then(async (response: IListUsersResponse) => {
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
        <Box sx={this.state.action === 'normal' ? { display: 'block' } : { display: 'none' }}>
          <Box marginBottom={4} sx={{ display: 'flex' }}>
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
            <Stack spacing={2} sx={{ display: 'flex' }} alignItems={'center'}>
              <Pagination count={this.state.pageCount} page={this.state.paging.currentPage} variant="outlined" onChange={(e: any) => this.handlePageChange(e, e.target.innerText)} />
            </Stack>
          </Box>
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
        </Box>
      </Box>
    );
  }
}

export default List;

interface IProps {
  callback: () => void;
  theme: Theme;
  searchCriteria: any;
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
