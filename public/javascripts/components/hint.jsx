import React from "react";

export default class Hint extends React.Component {
  constructor() {
    super();

    
    this.state = {
      
    };

   
  }
  render() {
    var s = {backgroundColor: this.props.color, borderRadius: "50%"}
    return(
      <div className="hint" style={s}>
      </div>
    )
  }
}
