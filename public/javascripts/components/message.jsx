import React from "react";

export default class Message extends React.Component {
  constructor() {
    super();

    
    this.state = {
      
    };

   
  }
  render() {
    var s = {color: this.props.messageColor}
    return(
      <div className="message" style={s}>
	{this.props.message}
      </div>
    )
  }
}
