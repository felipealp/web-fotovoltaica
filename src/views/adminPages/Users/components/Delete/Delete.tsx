import React from 'react';
import DeleteRowIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';

class DeleteUser extends React.Component<IProps, {}> {
  static defaultProps: Partial<IProps> = {};

  state: IDeleteUser = {
    action: 'normal',
    errorMsg: '',
  }

  componentDidMount() {

  }

  render() {
    return (
      <IconButton aria-label="delete user" onClick={(e: any) => alert(this.props.id)}>
        <DeleteRowIcon />
      </IconButton>
    );
  }
}

export default DeleteUser;

interface IProps {
  onClose: () => void;
  id: string;
}

interface IDeleteUser {
  action: string,
  errorMsg: string;
}
