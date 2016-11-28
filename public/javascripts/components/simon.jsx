import React from "react";

var onChange = function(gameState) {
　　ReactDOM.render(<Simon gameState={gameState} userState={userState}/>, document.getElementById("content"));
}

export default class Simon extends React.Component {
  constructor() {
    super();

    this.buttons = ["button-one", "button-two", "button-three", "button-four"];

    this.state = {
      canClick: false,
      userState: []
    };
  }
  addColorClick() {
    //add the user click to state?
    //slice the gameState array
    //compare the user and the gameState
    //if wrong blink red and dump the game
    //check lengths
    //if not the same allow to continue to click
    //if the same blink green and finish
  }
  lightButtons() {
    
    //Light up the buttons in the Simon Game
  }
  randomInt() {
    var min = Math.ceil(0);
    var max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  render() {
    return(
      <div className="box">
	<div className="buttons">
          <div className="top-row">
	    <div id="button-one" className="button left-col">
            </div>
            <div id="button-two" className="button right-col">
            </div>
	  </div>
          <div className="bottom-row">
            <div id="button-three" className="button left-col">
            </div>
            <div id="button-four" className="button right-col">
            </div>
	  </div>
	</div>
      </div>
    )
  }
}
