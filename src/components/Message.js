import React from 'react'

const Message = (props) => {
  const readStatus = props.message.read ? 'row message' : 'row message unread'
  const selectStatus = props.message.selected ? 'selected' : ''
  const starStatus = props.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
  const labelDisplay = props.message.labels.map((label, id) => 
    <Label text={label} key={`message ${props.message.id} tag ${id}`}/>)
  return(
    <div className={`${readStatus} ${selectStatus}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input checked={selectStatus} type="checkbox" onChange={()=>props.messageSelect(props.message.id)}/>
          </div>
          <div className="col-xs-2">
            <i className={`${starStatus}`} onClick={()=>props.messageStar(props.message.id)}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11" onClick={()=>props.messageRead(props.message.id)}>
        {labelDisplay}
        <a href="/#">
          {props.message.subject}
        </a>
      </div>
      <div className={props.message.open ? "row message-body" : "hidden"}>
        <div className="col-xs-11 col-xs-offset-1">
          {props.message.body}
        </div>
      </div>
    </div>
    
  )
}
function Label ({text}){
  return (
  <span className="label label-warning">{text}</span>
  )
}
export default Message