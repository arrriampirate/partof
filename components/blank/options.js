import React, {Component} from 'react';
import classnames from 'classnames';

export default class Options extends Component {
  render() {
    const {available = [], options = {}, onChange} = this.props;
    return (
      <div className="component-options">
        {available.map(el => (
          <div key={el} className={classnames({
            'component-option': true,
            [`__${el}`]: true,
            '__active': Boolean(options[el]),
          })} onClick={() => onChange(el)}/>
        ))}
      </div>
    )
  }
}
