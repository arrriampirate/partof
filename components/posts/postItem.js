import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

function PostItem({id, active, name, flowName, userName, toggle}) {
  return (
    <tr key={id}>
      <td>
        <span className={classNames({
          'switcher': true,
          '__active': active
        })} onClick={() => toggle(id)}/>
      </td>
      <td>#{id}</td>
      <td>
        <Link to={`/posts/${id}/`}>{name}</Link>
      </td>
      <td>{flowName}</td>
      <td>{userName}</td>
      <td>{'--'}</td>
    </tr>
  );
}

export default memo(PostItem);
