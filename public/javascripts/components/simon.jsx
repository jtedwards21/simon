import React from "react";
import ReactDOM from "react-dom";
import JQuery from 'jquery';

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
    console.log('color');
　　　　var targetId = e.target.id;
    var s = this.props.userState;
    s.push(e.target.id)
    var l = s.length;
    var gameS = this.props.gameState.slice(0,l);
    var curr = l - 1;
    var same = s[curr] == gameS[curr];
    if(same == false){
	//Blink Red and Dump
	var originalColor = JQuery("#" + targetId).css("background-color");
	JQuery("#" + targetId).animate({
	backgroundColor: "red"
}, 5000);
	JQuery("#" + targetId).animate({
	backgroundColor: originalColor
}, 5000);
	onChange([], [], false);
    }
    else{
      if(l == this.props.gameState.length){
	var originalColor = JQuery("#" + targetId).css("background-color");
	JQuery("#" + targetId).animate({
	backgroundColor: "green"
}, 5000);
	JQuery("#" + targetId).animate({
	backgroundColor: originalColor
}, 5000);
        var ri = this.randomInt();
	var newState = this.buttons[ri];
	var gs = this.props.gameState;
	gs.push(newState);
        //Show new gamestate before rerender
	for(var i = 0; i < gs.length;i++){
	  this.lightButton(gs[i]);
        }
	//rerender
	onChange(gs, this.props.userState, true);
      }
      else{
	//continue current state
      }
    }
  }
  lightButton(id) {
	var originalColor = JQuery("#" + id).css("background-color");
	JQuery("#" + targetId).animate({
	backgroundColor: "white"
}, 5000);
	JQuery("#" + targetId).animate({
	backgroundColor: originalColor
}, 5000);
  }
  startGame(){
    //Get a new GameState
    var b = this.randomInt();
    var newState = this.buttons[b];
    //Show the gameState
    var m = "#" + newState;
    var e = JQuery(m);
    var originalColor = e.css("background-color");
    e.css("background-color", "white");
    //delay for a moment
    e.css("background-color", originalColor);
    //onChange
    var gs = this.props.gameState;
    gs.push(newState);
    onChange(gs, this.props.userState, true); 
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
	<div className="controls-container">
	  <div className="controls">
	    <div className="display-container">
	      <span className="display"></span>
	    </div>
            <button　onClick={this.startGame.bind(this)}>Start</button>
	  </div>
	</div>
      </div>
    )
  }
}
