import React, {Component} from 'react';
import classnames from 'classnames';
import Dropbox from "../common/dropbox";
import Options from "./options";

export default class BlankImage extends Component {
  onAccept = (file, src, idx) => {
    const {id, onChange} = this.props;
    let {content} = this.props;
    if (!content) content = [];

    const item = {
      src,
      idx,
      sort: content.length
    };

    content = content.concat(item);
    onChange(id, content);
  };

  onRemove = (fileData) => {
    const {id, onChange} = this.props;
    let {content} = this.props;
    if (!content) content = [];

    content = content.filter(el => el.idx !== fileData.idx);
    onChange(id, content);
  };

  onSort = (i, dir) => {
    const {id, onChange, content = []} = this.props;
    const changeIndex = dir === 'left' ? i - 1 : i + 1;
    const current = content[i];
    const changed = content[changeIndex];

    content[changeIndex] = current;
    content[i] = changed;
    onChange(id, content);
  };

  onChangeOption = (option) => {
    const {id, onChange, content = [], options} = this.props;
    options[option] = !options[option];
    onChange(id, content, options);
  };

  onDesc = (value, item) => {
    const {id, onChange, content = [], options} = this.props;

    for (let i = 0; i < content.length; i++) {
      if (item.id === content[i].idx) {
        content[i]['desc'] = value;
      }
    }

    onChange(id, content, options);
  };

  render() {
    let {content, options} = this.props;
    if (!content) content = [];

    content = content.map(el => {
      el['section'] = 'posts';
      return el;
    });

    return (
      <div className={classnames({
        'image': true,
        '__radius': options.radius,
      })}>
        <Options available={['radius', 'center', 'slider', 'small']} options={options} onChange={this.onChangeOption}/>
        <Dropbox
          withDesc
          canSort
          filesData={content}
          onAccept={this.onAccept}
          onRemove={this.onRemove}
          onSort={this.onSort}
          onDesc={this.onDesc}
        />
      </div>
    )
  }
}