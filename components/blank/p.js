import React, {Component} from 'react';
import {strip_tags} from 'locutus/php/strings';
import Options from "./options";

export default class BlankP extends Component {

  constructor(props) {
    super(props);
    this.p = React.createRef();
  }

  componentDidMount() {
    this.p.current.innerHTML = this.props.content;
    if (!this.props.content) {
      this.p.current.focus();
    }
  }

  handleChange = () => {
    const range = document.createRange();
    const value = strip_tags(this.p.current.innerHTML);
    const sel = window.getSelection();
    const offset = sel.focusOffset;

    this.p.current.innerHTML = value;

    if (offset > 0) {
      range.setStart(this.p.current.childNodes[0], offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    this.props.onChange(this.props.id, value, this.props.options);
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
        <Options available={['center', 'lead', 'small']} options={options} onChange={this.onChangeOption}/>
        <div
          className="p"
          ref={this.p}
          contentEditable
          onInput={this.handleChange}
          onKeyDown={this.handleEnter}
        />
      </div>
    )
  }
}