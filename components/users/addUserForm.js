import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropbox from "../common/dropbox";
import api from "../../api/api";
import {translit} from "../../utils/string";
import classnames from "classnames";
import {withRouter} from "react-router";
import {changeUserData} from "../../store/reducers/user";

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserData: (data) => dispatch(changeUserData(data))
  }
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || '',
      name: props.name || '',
      slug: props.slug || '',
      email: props.email || '',
      text: props.text || '',
      password: '',
      image: props.image || '',
      slugConnect: props.isNew,
      removeImageId: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let prop in this.state) {
      form.append(prop, this.state[prop])
    }

    api.post.updateUser(form).then(data => {
      if (data.success && this.props.isNew) {
        this.props.history.push(`/users/${data.success}/`);
      }
    });

    // TODO changeUserData if current
  };

  handleTextField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });

    if (name === 'name' && this.state.slugConnect) {
      this.setState({
        slug: translit(value)
      });
    }

    if (name === 'slug' && this.state.slugConnect) {
      this.setState({
        slugConnect: false
      });
    }
  };

  handleOnFileAccept = (file) => {
    this.setState({
      image: file
    });
  };

  handleOnFileRemove = (file) => {
    if (file.id) {
      this.setState({
        image: '',
        removeImageId: file.id
      });
    }
  };

  handleSlug = () => {
    this.setState({
      slug: translit(this.state.name),
      slugConnect: !this.state.slugConnect
    });
  };

  render() {
    const {name, slug, email, text, image, slugConnect} = this.state;
    const {isNew, user, id} = this.props;
    const isAdmin = user.isAdmin;
    const isMe = user.id === id;
    const files = image ? [image] : [];

    return (
      <form className="add-user-form" onSubmit={this.handleSubmit} autoComplete="off">
        <div className="add-user-form__left">
          <div className="inp">
            <label>Имя</label>
            <input name="name" onChange={this.handleTextField} type="text" value={name}/>
            {isNew &&
            <div className={classnames({
              'slug_mark': true,
              '__active': slugConnect
            })} onClick={this.handleSlug}/>
            }
          </div>
          <div className="inp">
            <label>Слаг</label>
            <input readOnly={!isNew} name="slug" onChange={this.handleTextField} type="text" value={slug}/>
          </div>
          <div className="inp">
            <label>Имейл</label>
            <input name="email" onChange={this.handleTextField} type="email" value={email}/>
          </div>
          <div className="inp">
            <label>Подпись</label>
            <input name="text" onChange={this.handleTextField} type="text" value={text}/>
          </div>
          {(isAdmin || isMe || isNew) &&
          <div className="inp">
            <label>Пароль</label>
            <input name="password" onChange={this.handleTextField} type="password"/>
          </div>
          }
          <div className="actions">
            <button type="submit" className="btn">
              {this.props.isNew ? 'Добавить' : 'Сохранить'}
            </button>
          </div>
        </div>
        <div className="add-user-form__right">
          <Dropbox
            single
            filesData={files}
            onAccept={this.handleOnFileAccept}
            onRemove={this.handleOnFileRemove}/>
        </div>
      </form>
    )
  }
}