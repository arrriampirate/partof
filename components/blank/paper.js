import React, {Component} from 'react';
import uniqid from 'uniqid';
import {generateRowColumns, getComponentByCode} from "../../utils/paper";

export default class BlankPaper extends Component {
  constructor(props) {
    super(props);
    const {rows = [], columns = [], components = []} = props.data;
    this.state = {
      rows,
      columns,
      components,
    };
  }

  getData() {
    return this.state;
  }

  handleAddRow = (type) => {
    const {rows, columns} = this.state;
    const newRow = {
      id: uniqid(),
      sort: rows.length,
    };

    const newColumns = generateRowColumns(newRow.id, type);

    this.setState({
      rows: rows.concat(newRow),
      columns: columns.concat(newColumns),
    });
  };

  handleRemoveRow = (id) => {
    const {rows, columns, components} = this.state;
    const columnsIdToRemove = columns.filter(el => el.rowId === id).map(el => el.id);
    this.setState({
      rows: rows.filter(el => el.id !== id),
      columns: columns.filter(el => el.rowId !== id),
      components: components.filter(el => columnsIdToRemove.indexOf(el.columnId) === -1),
    });
  };

  handleSortRow = (index, dir) => {
    const {rows} = {...this.state};
    const pairIndex = dir === 'up' ? index - 1 : index + 1;
    const item = rows[index];

    rows[index] = rows[pairIndex];
    rows[pairIndex] = item;

    this.setState({
      rows
    });
  };

  handleAddComponent = (columnId, name) => {
    const {components} = this.state;
    const componentsOfColumn = components.filter(el => el.columnId === columnId);
    this.setState({
      components: components.concat({
        id: uniqid(),
        sort: componentsOfColumn.length,
        columnId,
        name,
        content: '',
        options: {},
      }),
    });
  };

  handleRemoveComponent = (componentId) => {
    const {components} = this.state;
    this.setState({
      components: components.filter(el => el.id !== componentId)
    });
  };

  handleChangeComponent = (componentId, content = '', options = {}) => {
    let {components} = {...this.state};
    components = components.map(el => {
      if (el.id === componentId) {
        el.content = content;
        el.options = options;
      }
      return el;
    });
    this.setState({
      components
    });
  };

  get componentsName() {
    return [
      {name: 'p', code: 'P'},
      {name: 'h1', code: 'H1'},
      {name: 'h2', code: 'H2'},
      {name: 'image', code: 'I'},
      {name: 'cite', code: 'B'},
      {name: 'table', code: 'T'},
      {name: 'object', code: 'O'},
    ];
  }

  render() {
    const {rows, columns, components} = this.state;
    console.log('components', components);
    return (
      <div className="paper">
        {rows.map((row, i) => (
          <div className="row" key={row.id}>

            {columns.filter(column => column.rowId === row.id).map(column => (
              <div key={column.id} className={`col col-${column.width}`}>
                <div className="tools-panel">
                  {this.componentsName.map(el => (
                    <div className="tools-panel-trigger" key={`${column.id}_${el.name}`}
                         onClick={() => this.handleAddComponent(column.id, el.name)}>{el.code}</div>
                  ))}
                </div>

                {components.filter(component => component.columnId === column.id).map(component => (
                  <div className="component" key={component.id}>
                    <div className="component-remove" onClick={() => this.handleRemoveComponent(component.id)}/>
                    <div className="component-code">{component.name}</div>

                    {React.createElement(getComponentByCode(component.name), {
                      ...component, ...{
                        onChange: this.handleChangeComponent,
                        onAddComponent: this.handleAddComponent,
                        columnId: column.id
                      }
                    }, null)}

                  </div>
                ))}

              </div>
            ))}

            <div className="row-control __remove" onClick={() => this.handleRemoveRow(row.id)}/>
            {i > 0 && rows.length > 1 &&
              <div className="row-control __up" onClick={() => this.handleSortRow(i, 'up')}/>
            }
            {i < rows.length - 1 && rows.length > 1 &&
              <div className="row-control __down" onClick={() => this.handleSortRow(i, 'down')}/>
            }
          </div>
        ))}

        {!rows.length &&
          <div className="paper__empty">
            Выбери тип сетки
          </div>
        }

        <div className="add-row-wrap">
          <div className="add-row">
            <div className="add-row-icon add-row-col-3" onClick={() => this.handleAddRow(3)}/>
            <div className="add-row-icon add-row-col-1" onClick={() => this.handleAddRow(1)}/>
            <div className="add-row-icon" onClick={() => this.handleAddRow('full')}/>
            <div className="add-row-icon add-row-col-4" onClick={() => this.handleAddRow(4)}/>
            <div className="add-row-icon add-row-col-5" onClick={() => this.handleAddRow(5)}/>
            <div className="add-row-icon add-row-col-2" onClick={() => this.handleAddRow(2)}/>
            <div className="add-row-icon add-row-col-6" onClick={() => this.handleAddRow(6)}/>
          </div>
        </div>
      </div>
    )
  }
}