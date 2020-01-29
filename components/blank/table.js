import React, {Component} from 'react';
import {strip_tags} from 'locutus/php/strings';

const TableTd = React.forwardRef((props, ref) => {
  return <td
    ref={ref}
    data-cell={props.cell}
    data-row={props.row}
    contentEditable
    suppressContentEditableWarning
    dangerouslySetInnerHTML={{__html: props.children}}
    onInput={props.onInput}/>
  }
);

export default class BlankTable extends Component {

  state = {
    content: {
      0: ['', '']
    }
  };

  constructor(props) {
    super(props);
    if (props.content && props.content.length) {
      const content = {};
      props.content.forEach((el, i) => {
        content[i] = el;
      });

      this.state = {
        content: content
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.state.content).length > Object.keys(prevState.content).length) {
      const keys = Object.keys(this.tdRefs);
      this.tdRefs[+keys[keys.length - 1]][0].focus();
    }
  }

  handleChange = (e, rowIndex, cellIndex) => {
    const range = document.createRange();
    const ref = this.tdRefs[rowIndex][cellIndex];
    const value = strip_tags(ref.innerHTML);
    const sel = window.getSelection();
    const offset = sel.focusOffset;

    ref.innerHTML = value;

    if (offset > 0) {
      range.setStart(ref.childNodes[0], offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    this.props.onChange(this.props.id, this.getContent());
  };

  getContent = () => {
    const content = [];
    for (const prop in this.tdRefs) {
      content.push([
        this.tdRefs[prop][0].innerHTML,
        this.tdRefs[prop][1].innerHTML,
      ]);
    }
    return content;
  };

  handleEnter = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.addRow();
    }
  };

  addRow = () => {
    const rows = {...this.state.content};
    const keys = Object.keys(rows);
    rows[+keys[keys.length - 1] + 1] = ['', ''];
    this.setState({
      content: rows
    });
  };

  removeRow = (index) => {
    const rows = {...this.state.content};
    delete rows[index];
    delete this.tdRefs[index];
    this.setState({
      content: rows
    });
  };

  tdRefs = {};

  setRef = (ref) => {
    if (!ref) return;
    if (!this.tdRefs[ref.dataset.row]) {
      this.tdRefs[ref.dataset.row] = [];
    }
    this.tdRefs[ref.dataset.row].push(ref);
  };

  focusInput = (id) => this.tdRefs[id].focus();

  render() {
    const {content} = this.state;
    const html = [];

    for (const prop in content) {
      html.push(
        <tr key={prop}>
          <TableTd ref={this.setRef} row={prop} cell={0} onInput={(e) => this.handleChange(e, prop, 0)}>
            {content[prop][0]}
          </TableTd>
          <TableTd ref={this.setRef} row={prop} cell={1} onInput={(e) => this.handleChange(e, prop, 1)}>
            {content[prop][1]}
          </TableTd>
          <td>
            {prop > 0 ?
              <div className="table-row-remove" onClick={() => this.removeRow(prop)}/> :
              <div className="table-row-placeholder"/>
            }
          </td>
        </tr>
      );
    }

    return (
      <table className="table" onKeyDown={this.handleEnter}>
        <tbody>
        {html}
        </tbody>
      </table>
    );
  }
}