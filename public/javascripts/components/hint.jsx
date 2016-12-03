import React from "react";

export default class Hint extends React.Component {
  constructor() {
    super();

    
    this.state = {
      
    };

   
  }
  render() {
    var s = {backgroundColor: this.props.color}
    return(
      <div className="hint" style={s}>
      </div>
    )
  }
}
