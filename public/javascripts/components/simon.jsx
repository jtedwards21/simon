import React from "react";

var onChange = function(gameState, userState, canClick) {
　　ReactDOM.render(<Simon canClick={canClick} gameState={gameState} userState={userState}/>, document.getElementById("content"));
}

export default class Simon extends React.Component {
  constructor() {
    super();

    this.buttons = ["button-one", "button-two", "button-three", "button-four"];

    this.state = {
      canClick: true,
      userState: []
    };
  }
  addColorClick(e) {
    var s = this.props.userState;
    s.push(e.target.id)
    var l = s.length;
    var gameS = this.props.gameState.slice(0,l);
    var curr = l - 1;
    var same = s[curr] == gameS[curr];
    if(same == false){
	//Blink red and dump
    }
    else{
      if(l == this.props.gameState.length){
	//Blink green and get more gameState pieces
        //Show new gamestate before rerender
      }
      else{
	//continue current state
      }
    }
    //check lengths
    //if not the same allow to continue to click
    //if the same blink green and finish
  }
  lightButtons() {
    
    //Light up the buttons in the Simon Game
  }
  startGame(){
    //Get a new GameState
    var b = this.randomInt();
    var newState = this.buttons[b];
    //Show the gameState
    var e = document.getElementById("#" + newState);
    var originalColor = e.style.backgroundColor;
    e.style.backgroundColor = "white";
    //delay for a moment
    e.style.backgroundColor = originalColor;
    //onChange
    var gs = this.props.gameState;
    gs.push(newState);
    onChange(gs, this.props.userState); 
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
	    <div id="button-one" onClick={this.addColorClick.bind(this)} className="button left-col">
            </div>
            <div id="button-two" onClick={this.addColorClick.bind(this)} className="button right-col">
            </div>
	  </div>
          <div className="bottom-row">
            <div id="button-three" onClick={this.addColorClick.bind(this)} className="button left-col">
            </div>
            <div id="button-four" onClick={this.addColorClick.bind(this)} className="button right-col">
            </div>
	  </div>
	</div>
	<div className="display-container">
	  <span className="display"></span>
	</div>
        <button　onClick={this.startGame.bind(this)}>Start</button>
      </div>
    )
  }
}
