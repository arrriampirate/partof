import React, {Fragment, Component} from 'react';
import {withRouter} from "react-router";
import BlankPaper from "../blank/paper";
import {translit} from "../../utils/string";
import classnames from "classnames";
import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import api from "../../api/api";
import connect from "react-redux/es/connect/connect";
import Dropbox from "../common/dropbox";

registerLocale('ru', ru);

const mapStateToProps = state => {
  return {
    users: state.users,
    flows: state.flows,
  };
};

@withRouter
@connect(mapStateToProps)
export default class PostPage extends Component {

  refPaper;
  slugTimeout = 0;

  static defaultProps = {
    id: '',
    active: false,
    name: '',
    slug: '',
    text: '',
    date: '',
    flow: 1,
    user: 1,

    content: "{}",

    imageRemove: false,
    imageSrc: '',
    imageFile: '',
  };

  constructor(props) {
    super(props);
    this.refPaper = React.createRef();
    this.state = {
      id: props.id,
      active: props.active,
      name: props.name,
      slug: props.slug,
      text: props.text,
      date: props.date,
      flow: props.flow,
      user: props.user,

      imageSrc: props.imageSrc,
      imageRemove: false,
      imageFile: '',

      slugError: false,
      slugConnect: props.slug === translit(props.name, '-'),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.slug !== this.state.slug) {
      this.checkSlug();
    }
  }

  handleField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const state = {
      [name]: value,
    };

    if (name === 'name' || name === 'slug') {
      state['slugError'] = false;
    }

    if (name === 'name' && this.state.slugConnect) {
      state['slug'] = translit(value, '-');
    }

    if (name === 'slug' && this.state.slugConnect) {
      state['slugConnect'] = false;
    }

    this.setState(state);
  };

  handleSlug = () => {
    this.setState({
      slug: translit(this.state.name, '-'),
      slugConnect: !this.state.slugConnect
    });
  };

  handleDateField = (date) => {
    this.setState({
      date
    });
  };

  checkSlug = () => {
    const {id, slug} = this.state;
    clearTimeout(this.slugTimeout);
    this.slugTimeout = setTimeout(() => {
      api.post.checkPostSlug({id, slug}).then((data) => {
        if (data.result) {
          this.setState({
            slugError: true
          });
        }
      });
    }, 1000);
  };

  handleActive = () => {
    this.setState({
      active: !this.state.active
    });
  };

  handleAddImage = (file) => {
    this.setState({
      imageFile: file,
      imageRemove: false,
    });
  };

  handleRemoveImage = () => {
    this.setState({
      imageFile: null,
      imageRemove: true,
    });
  };

  handleSave = () => {
    // TODO check validation
    this.handleSubmit();
  };

  handleSubmit = () => {
    const {history} = this.props;
    const {id, active, name, slug, text, date, flow, user, imageFile, imageRemove} = this.state;
    const form = new FormData();

    form.append('id', id);
    form.append('active', active ? 1 : 0);
    form.append('name', name);
    form.append('slug', slug);
    form.append('text', text);
    form.append('flow', flow);
    form.append('user', user);

    form.append('imageFile', imageFile);
    form.append('imageRemove', imageRemove ? 1 : 0);

    if (date) {
      form.append('date', date.getTime() / 1000);
    }

    const content = this.refPaper.current.getData();
    form.append('content', JSON.stringify(content));

    api.post.updatePost(form).then(data => {
      console.log('data', data);
      if (data.success && !id) {
        history.push(`/posts/${data.success}/`);
      }
    });
  };

  render() {
    const {users, flows, content} = this.props;
    const {active, imageSrc, name, slug, text, date, user, flow, slugConnect, slugError} = this.state;
    const image = [];

    if (imageSrc) {
      image.push({
        id: 1,
        src: imageSrc,
        section: 'posts',
      });
    }

    return (
      <Fragment>
        <div className="post-form">
          <div className="preview">
            <div className={classnames({
              'active_trigger': true,
              '__active': active
            })} onClick={this.handleActive}>
              {active ? 'Опубликовано' : 'Скрыто'}
            </div>
            <Dropbox filesData={image} single onAccept={this.handleAddImage} onRemove={this.handleRemoveImage}/>
            <input value={name} className="name" type="text" name="name" onChange={this.handleField}/>
            <input value={slug} className="slug" type="text" name="slug" onChange={this.handleField}/>
            <div className={classnames({
              'slug_mark': true,
              '__active': slugConnect
            })} onClick={this.handleSlug}/>
            {slugError &&
            <div className="slug_error">
              Такой код статьи уже существует
            </div>
            }
          </div>
          <div className="meta-block">
            <div className="control __text">
              <label>Анонс</label>
              <textarea
                value={text}
                name="text"
                placeholder="Анонс статьи для ленты"
                onChange={this.handleField}
              />
            </div>
            <div className="meta-controls">
              <div className="control __date">
                <label>Дата публикации</label>
                <DatePicker
                  locale="ru"
                  dateFormat="d.MM.y"
                  placeholderText="Выбери дату"
                  selected={date}
                  onChange={this.handleDateField}
                />
              </div>
              <div className="control __user">
                <label>Автор</label>
                <select value={user} name="user" onChange={this.handleField}>
                  {users.map(el => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="control __flow">
                <label>Поток</label>
                <select value={flow} name="flow" onChange={this.handleField}>
                  {flows.map(el => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <BlankPaper ref={this.refPaper} data={JSON.parse(content)}/>
        <button onClick={this.handleSave}>save</button>
      </Fragment>
    )
  }
}