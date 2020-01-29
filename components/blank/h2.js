import React, {Component} from 'react';
import {strip_tags} from 'locutus/php/strings';
import Options from "./options";
import classnames from "classnames";

export default class BlankH2 extends Component {

  constructor(props) {
    super(props);
    this.h = React.createRef();
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

    this.props.onChange(this.props.id, value);
  };

  handleEnter = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.props.onAddComponent(this.props.columnId, 'p');
    }
  };

  onChangeOption = (option) => {
    const {id, onChange, content = [], options} = this.props;
    options[option] = !options[option];
    onChange(id, content, options);
  };

  render() {
    let {options} = this.props;
    return (
      <div>
        <Options available={['center']} options={options} onChange={this.onChangeOption}/>
        <div
          className={classnames({
            'h2': true,
            '__center': Boolean(options.center),
          })}
          ref={this.h}
          contentEditable
          onInput={this.handleChange}
          onKeyDown={this.handleEnter}
        />
      </div>
    )
  }
}