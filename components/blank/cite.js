import React, {Component} from 'react';
import {strip_tags} from 'locutus/php/strings';

export default class BlankCite extends Component {

  constructor(props) {
    super(props);
    this.h = React.createRef();
    this.c = React.createRef();
  }

  componentDidMount() {
    this.h.current.innerHTML = this.props.content;
    if (!this.props.content) {
      this.h.current.focus();
    }
  }

  handleChange = () => {
    const range = document.createRange();
    const value = strip_tags(this.h.current.innerHTML);
    const sel = window.getSelection();
    const offset = sel.focusOffset;

    this.h.current.innerHTML = value;

    if (offset > 0) {
      range.setStart(this.h.current.childNodes[0], offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    this.props.onChange(this.props.id, value, this.props.options);
  };

  handleChangeCite = () => {
    const range = document.createRange();
    const value = strip_tags(this.c.current.innerHTML);
    const sel = window.getSelection();
    const offset = sel.focusOffset;

    this.c.current.innerHTML = value;

    if (offset > 0) {
      range.setStart(this.c.current.childNodes[0], offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    this.props.onChange(this.props.id, this.props.content, {
      author: value,
    });
  };

  handleEnter = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.props.onAddComponent(this.props.columnId, 'p');
    }
  };

  render() {
    return (
      <div>
        <div
          className="cite"
          ref={this.h}
          contentEditable
          onInput={this.handleChange}
          onKeyDown={this.handleEnter}
        />
        <div
          className="cite-author"
          ref={this.c}
          contentEditable
          onInput={this.handleChangeCite}
          onKeyDown={this.handleEnter}/>
      </div>
    )
  }
}