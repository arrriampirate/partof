import React, {Component} from 'react';
import {getSrcByLink} from "../../utils/paper";

export default class BlankObject extends Component {
  handleChange = (e) => {
    const {id, onChange} = this.props;
    onChange(id, e.target.value);
  };

  handleEnter = (e) => {
    if (e.which === 13) {
      e.preventDefault();
    }
  };

  render() {
    const {content} = this.props;
    const link = getSrcByLink(content);
    return (
      <div className="object">
        <input type="text" onInput={this.handleChange} placeholder="Введи ссылку"/>
        {link && (
          <iframe src={link} frameBorder="0" allowFullScreen=""/>
        )}
      </div>
    )
  }
}
