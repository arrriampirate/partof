import React, {Component} from 'react';
import {resolve} from 'react-resolver';
import api from './../api/api';
import {Link} from "react-router-dom";
import {loadingPageEnd, loadingPageStart} from "../utils/dom";

@resolve('data', props => {
    loadingPageStart();
    return api.get.users();
})
export default class Users extends Component {
    constructor(props) {
        super(props);
        loadingPageEnd();
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Имя</th>
                        <th>Доступ</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map(el => (
                        <tr key={el.id}>
                            <td>#{el.id}</td>
                            <td>
                                <Link to={`/users/${el.id}/`}>{el.name}</Link>
                            </td>
                            <td>{el.roles.includes('ROLE_ADMIN') ? 'Admin' : 'User'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}