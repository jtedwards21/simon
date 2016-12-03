import React from "react";
import JQuery from 'jquery';
import Hint from './hint';

export default class Simon extends React.Component {
  constructor() {
    super();

    this.buttons = ["button-one", "button-two", "button-three", "button-four"];

    this.state = {
      canClick: true,
      userState: [],
　　　　　　gameState: [],
      stateCount: 0,
      inGame: false,
      hintOn: false
    };

    this.hasCursor = {
	cursor: "pointer"
    };
   
    this.noCursor = {
	cursor: "unset"
    };
  }
  buttonClick(e) {
    var newUS = "#" + e.target.id;
    var us = this.state.userState;
    var gs = this.state.gameState;
    var i = this.state.stateCount
    if(newUS == gs[i]){
      if(gs.length == 20){
      this.blinkButton(newUS)
      //Show a win message TODO
      } else {
      this.blinkButton(newUS, "green");
      addGameState();
      }
    } else {
      this.blinkButton(newUS, "red");
      //Show a you lose method TODO
      this.setState({userState: [], gameState: [], canClick: false, inGame: false, stateCount: 0});
    }
    
  }
  //Blinks Twice
  blinkButton(id, color){
    JQuery(id).animate({opacity: 1}, "slow", function(){
JQuery(id).animate({opacity: .1}, "slow", function(){
JQuery(id).animate({opacity: .8}, "slow", function(){
JQuery(id).css("background-color", color);
JQuery(id).css("background-color","red");//This should eventually go back to original color
})
})
})
  }
  addGameState(newUS){
    //Can I change the state here without throwing everything off?
    this.setState({canClick: false})
    //Get a new GameState
    var b = this.randomInt();
    var newState = this.buttons[b];
    var m = "#" + newState;
    var gs = this.state.gameState;
    var us = this.state.userState;
    if(newUS !== 0){us.push(newUS)}
    var sc = this.state.stateCount + 1;
    this.setState({hintOn: true});
    this.setState({hintOn: false})
    gs.push(newState);
    this.setState({gameState: gs, stateCount: sc, userState: us, inGame: true, canClick: true});
  }
  startGame(){
    this.addGameState();
  }
  randomInt() {
    var min = Math.ceil(0);
    var max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  render() {
    var hints = this.state.gameState.map(function(d){
	var k = {
	  #button-one: "blue",
	  #button-two: "red",
	  #button-three: "green",
	  #button-four: "yellow"
}
        var desc = Object.getOwnPropertyDescriptor(k, d);
	var color = desc.value;
	return <Hint color={color} show={this.state.hintOn}/>
})
    return(
      <div className="box">
	<div className="buttons">
          <div className="top-row">
	    <div id="button-one" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button left-col">
            </div>
            <div id="button-two" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button right-col">
            </div>
	  </div>
          <div className="bottom-row">
            <div id="button-three" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button left-col">
            </div>
            <div id="button-four" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button right-col">
            </div>
	  </div>
	</div>
	<div className="controls-container">
	  <div className="controls">
	    <div className="display-container">
	      <span className="display">{this.state.stateCount}</span>
	    </div>
            <button style={(this.state.canClick) ? this.noCursor : this.hasCursor}　onClick={this.startGame.bind(this)}>Start</button>
	  </div>
	</div>
	{hints}
      </div>
    )
  }
}
