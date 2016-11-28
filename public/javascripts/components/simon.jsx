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

    this.hasCursor = {
	cursor: "pointer"
    };
   
    this.noCursor = {
	cursor: "unset"
    };
  }
  addColorClick(e) {
    console.log('color');
　　　　var targetId = e.target.id;
    var change = JQuery("#" + targetId);
    var s = this.props.userState;
    s.push(e.target.id)
    var l = s.length;
    var gameS = this.props.gameState.slice(0,l);
    var curr = l - 1;
    var same = s[curr] == gameS[curr];
    if(same == false){
	//Blink Red and Dump
	change.css("background-color", "red");
	change.animate({
	opacity: 0
}, 100);
	change.animate({
	opacity: 1
}, 100);
	onChange([], [], false);
    }
    else{
      if(l == this.props.gameState.length){
	var originalColor = change.css("background-color");
	change.css("background-color", "green");
	change.animate({
	opacity: 0
}, 100);
	change.animate({
	opacity: 1
}, 100);
	
	change.css("background-color", originalColor);
        var ri = this.randomInt();
	var newState = this.buttons[ri];
	var gs = this.props.gameState;
	gs.push(newState);
	this.lightButtons(gs, this.lightButtons);
        //Show new gamestate before rerender
	//This is a big issue, 
	/*
	for(var i = 0; i < gs.length;i++){
	  this.lightButton(gs[i]);
        }*/
	//rerender
	//Then onChange would go into the lb method
	onChange(gs, this.props.userState, true);
      }
      else{
	//continue current state
      }
    }
  }
  //Maybe play with state instead?
  //render all the gamestates
  lightButtons(gs, lb) {
	i = 0;
	JQuery("#" + gs[i]).animate({
	opacity: 0
}, 1000, JQuery("#" + gs[i]).animate({
	opacity: 1
}, 1000, function(gs, lb)lb(i+1, gs, lb)));}
  }
  startGame(){
    //Get a new GameState
    var b = this.randomInt();
    var newState = this.buttons[b];
    //Show the gameState
    var m = "#" + newState;
    var gs = this.props.gameState;
    var us = this.props.userState
console.log(m);
    var originalColor = JQuery(m).css("background-color");
    JQuery(m).animate({
	opacity: 0
}, 1000, function(){
JQuery(m).animate({
	opacity: 1
}, 1000, function(){
    gs.push(newState);
    onChange(gs, us, true); 
});
});
    
    //onChange
    
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
	    <div id="button-one" style={(this.props.canClick) ? this.hasCursor : this.noCursor} onClick={this.addColorClick.bind(this)} className="button left-col">
            </div>
            <div id="button-two" style={(this.props.canClick) ? this.hasCursor : this.noCursor} onClick={this.addColorClick.bind(this)} className="button right-col">
            </div>
	  </div>
          <div className="bottom-row">
            <div id="button-three" style={(this.props.canClick) ? this.hasCursor : this.noCursor} onClick={this.addColorClick.bind(this)} className="button left-col">
            </div>
            <div id="button-four" style={(this.props.canClick) ? this.hasCursor : this.noCursor} onClick={this.addColorClick.bind(this)} className="button right-col">
            </div>
	  </div>
	</div>
	<div className="controls-container">
	  <div className="controls">
	    <div className="display-container">
	      <span className="display">{this.props.gameState.length}</span>
	    </div>
            <button style={(this.props.canClick) ? this.noCursor : this.hasCursor}　onClick={this.startGame.bind(this)}>Start</button>
	  </div>
	</div>
      </div>
    )
  }
}
