import React, {Fragment, Component} from 'react';
import AddUserForm from '../components/users/addUserForm';

export default class UserAdd extends Component {
    render() {
        return (
            <Fragment>
                <AddUserForm isNew/>
            </Fragment>
        )
    }
}