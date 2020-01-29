import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import classnames from 'classnames';
import {getPath} from "../../utils/string";
import uniqid from "uniqid";

export default class Dropbox extends Component {

  static defaultProps = {
    canSort: false,
    filesData: [],
    maxSize: 700000,
    single: false,
    onAccept: () => {},
    onRemove: () => {},
    onSort: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      filesData: props.filesData.length > 0 ?
        props.filesData.map(el => {
          return {
            id: el.id || el.idx,
            idx: el.idx || uniqid(),
            src: getPath(el),
            desc: el.desc || '',
          }
        }) : []
    };
  }

  handleOnLoad = (e, file) => {
    const idx = uniqid();
    this.setState({
      filesData: [...this.state.filesData, {
        id: null,
        idx,
        src: e.target.result
      }]
    });

    this.props.onAccept(file, e.target.result, idx);
  };

  handleOnDrop = (accepted, rejected) => {
    accepted.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => this.handleOnLoad(e, file);
    });
  };

  handleRemove = (fileData) => {
    this.props.onRemove(fileData);
    this.setState({
      filesData: this.state.filesData.filter(el => el.src !== fileData.src)
    });
  };

  handleSort = (i, dir) => {
    const {filesData} = {...this.state};

    const changeIndex = dir === 'left' ? i - 1 : i + 1;
    const current = filesData[i];
    const changed = filesData[changeIndex];

    filesData[changeIndex] = current;
    filesData[i] = changed;

    this.setState({
      filesData,
    });

    this.props.onSort(i, dir);
  };

  handleDesc = (value, item) => {
    const {onDesc} = this.props;
    const {filesData} = this.state;
    onDesc(value, item);

    for (let i = 0; i < filesData.length; i++) {
      if (item.id === filesData[i].idx) {
        filesData[i]['desc'] = value;
      }
    }

    this.setState({
      filesData,
    })
  };

  render() {
    const {single, maxSize, withDesc, onDesc} = this.props;
    let {canSort} = this.props;
    const {filesData} = this.state;
    const count = filesData.length;

    canSort = canSort && filesData.length > 1;

    return (
      <div className={classnames({
        'dropzone': true,
        '__single': single,
        '__is_set': count,
        '__is_multiple': count > 1,
      })}>
        <div className="dropzone__output">
          {filesData.map((el, i) => (
            <div className="dropzone__item" key={`dropzone-item-${i}`}>
              <div className="dropzone__remove">
                <div className="dropzone__remove-trigger" onClick={() => this.handleRemove(el)}/>
                {canSort && i !== 0 &&
                  <div className="dropzone__drag __left" onClick={() => this.handleSort(i, 'left')}/>
                }
                {canSort && i !== filesData.length - 1 &&
                  <div className="dropzone__drag __right" onClick={() => this.handleSort(i, 'right')}/>
                }
              </div>
              <img src={el.src} alt=""/>
              {withDesc && onDesc &&
                <input
                  type="text"
                  className="dropzone__input"
                  value={el.desc || ''}
                  onChange={(e) => this.handleDesc(e.target.value, el, i)}
                />
              }
            </div>
          ))}
        </div>
        <Dropzone maxSize={maxSize} accept="image/*" onDrop={this.handleOnDrop}>
          {({getRootProps, getInputProps}) => (
            <div className="dropzone__trigger" {...getRootProps()}>
              <div className="dropzone__trigger-line">
                Загрузи картинку
              </div>
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      </div>
    )
  }
}