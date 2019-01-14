import React from 'react';


const Toolbar = (props) => {
  const unreadCount = props.messages.filter(message => message.read === false).length
  const messageCount = props.messages.length
  const selectedCount = props.messages.filter(message => message.read === true).length
  let selectionDisplay
  let buttonDisplay

  if (messageCount=== selectedCount && messageCount !== 0) {
    selectionDisplay = 'fa fa-check-square-o'
    buttonDisplay = false
  } else if (selectedCount > 0) {
    selectionDisplay = 'fa fa-minus-square-o'
    buttonDisplay = false
  } else {
    selectionDisplay = 'fa fa-square-o'
    buttonDisplay = true
  }

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadCount}</span>
            unread messages
          </p>
      <a className="btn btn-danger" onClick={props.composeMessage}>
        <i className = "fa fa-plus"></i> 
      </a>

      <button className="btn btn-default" onClick={props.selectAll} disabled={buttonDisplay}>
        <i className={selectionDisplay}></i>
      </button>
      <button className="btn btn-default" onClick={props.allRead} disabled={buttonDisplay}>
        Mark As Read
      </button>

      < button className = "btn btn-default" onClick={props.allUnread} disabled={buttonDisplay}>
        Mark As Unread
      </button>

      <select className="form-control label-select" onChange={props.addLabel} disabled={buttonDisplay}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select" onChange={props.removeLabel} disabled={buttonDisplay}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      < button className = "btn btn-default"
      onClick = {
        props.deleteSelected
      }
      disabled = {
        buttonDisplay
      } >
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
    </div>
    
    )
  }


export default Toolbar;
