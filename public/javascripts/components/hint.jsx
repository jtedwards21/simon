import React from "react";

export default class Hint extends React.Component {
  constructor() {
    super();

    
    this.state = {
      
    };

   
  }
  render() {
    return(
      <div className="hint">
	{this.props.color}
      </div>
    )
  }
}
