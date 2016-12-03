import React from "react";
import JQuery from 'jquery';
import Hint from './hint';
import Message from './message';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Simon extends React.Component {
  constructor() {
    super();

    this.buttons = ["buttonOne", "buttonTwo", "buttonThree", "buttonFour"];

    this.state = {
      canClick: true,
      userState: [],
　　　　　　gameState: [],
      stateCount: 0,
      inGame: false,
      hintOn: false,
      messageColor: "black",
      message: "",
      aMessage: false
    };

    this.hasCursor = {
	cursor: "pointer"
    };
   
    this.noCursor = {
	cursor: "unset"
    };
  }
  buttonClick(e) {
    console.log('dog');
    var newUS = "#" + e.target.id;
    var us = this.state.userState;
    var gs = this.state.gameState;
    var i = this.state.stateCount - 1;
    if(e.target.id == gs[i]){
      if(gs.length == 20){
      this.blinkButton(newUS)
      //Show a win message TODO
      } else {
      this.blinkButton(newUS, "green");
      //Show a very good message TODO
　　　　　　this.setState({messageColor: "green", message: "Very Good!", aMessage: true})
      this.blinkMessage();
      this.addGameState();
      
      }
    } else {
      this.blinkButton(newUS, "red");
      //Show a you lose method TODO
      this.setState({userState: [], gameState: [], canClick: false, inGame: false, stateCount: 0});
    }
    
  }
  //Blinks Twice
  blinkMessage(){
JQuery(".message").animate({opacity: 1}, "fast", function(){
JQuery(".message").animate({opacity: 0}, "fast", function(){ 
JQuery(".message").animate({opacity: 1}, "fast", function(){
JQuery(".message").animate({opacity: 0}, "fast")
})
})
})
  }
  blinkButton(id, color){
    JQuery(id).animate({opacity: 1}, "fast", function(){
JQuery(id).animate({opacity: .1}, "fast", function(){
JQuery(id).animate({opacity: .7}, "fast", function(){
JQuery(id).animate({opacity: 1}, "fast", function(){
JQuery(id).animate({opacity: .1}, "fast", function(){
JQuery(id).animate({opacity: .7}, "fast", function(){

})
})
})
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
    var on = this.state.hintOn;
    var hints = this.state.gameState.map(function(d, i){
        var button = d.substring(1)
	var k = {
	  buttonOne: "blue",
	  buttonTwo: "red",
	  buttonThree: "green",
	  buttonFour: "yellow"
}
        var desc = Object.getOwnPropertyDescriptor(k, d);
	var color = desc.value;
	return <Hint key={i} color={color} show={on}/>
})
    var messages;
    if(this.state.aMessage == true){
	messages = <Message message={this.state.message} color={this.state.messageColor} />
    } else {
	messages = [];
    }
    
    return(
      <div className="box">
	<div className="buttons">
          <div className="top-row">
	    <div id="buttonOne" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button left-col">
            </div>
            <div id="buttonTwo" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button right-col">
            </div>
	  </div>
          <div className="bottom-row">
            <div id="buttonThree" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button left-col">
            </div>
            <div id="buttonFour" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button right-col">
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
	<div className="messageContainer">
	  <ReactCSSTransitionGroup
              transitionName="message"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
                {messages}
            </ReactCSSTransitionGroup>
	</div>
	<div className="hintContainer">
	  <div className="horizontalHints">
	    <ReactCSSTransitionGroup
              transitionName="hint"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
                {hints}
            </ReactCSSTransitionGroup>

	  </div>
	</div>
      </div>
    )
  }
}
