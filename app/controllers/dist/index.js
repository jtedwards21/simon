
var Message = React.createClass({
  getInitialState() {
    return {};
  },
  render() {
    var s = {color: this.props.messageColor}
    return(
      <div className="message" style={s}>
	{this.props.message}
      </div>
    )
  }
});

var Hint = React.createClass({
  getInitialState(){
	return {};
  },
  render() {
    var s = {backgroundColor: this.props.color, borderRadius: "50%"}
    return(
      <div className="hint" style={s}>
      </div>
    )
  }
});
var Simon = React.createClass({
  getInitialState() {
    return {
      canClick: true,
      userState: [],
　　　　　　gameState: [],
      stateCount: 0,
      inGame: false,
      hintOn: false,
      messageColor: "black",
      message: "",
      aMessage: false,
      strict: true,
      nOfClicks: 0
    };
  },
  buttonClick(e) {
    console.log('dog');
    var newUS = "#" + e.target.id;
    var us = this.state.userState;
    var gs = this.state.gameState;
    var i = this.state.stateCount
    var correct;
    var action;

    if(e.target.id == gs[i]){correct = true;} else {correct = false}

    if(gs.length == 20 && correct == true){action = "win"}
    else if(correct == true && i+1 == gs.length){action = "newState"}
    else if(correct == true && us.length !== gs.length){action = "wait"}
    else if(this.state.strict == true && correct == false){action = "strictFail"}
    else if(this.state.strict == false && correct == false){action = "lightFail"}
    switch(action){
      case "win":
        console.log('win');
        this.blinkButton(newUS)
        this.setState({messageColor: "green", message: "You Win!", aMessage: true})
        this.blinkMessage();
        this.setState({userState: [], gameState: [], canClick: false, inGame: false,  stateCount: 0});
        break;
      case "newState":
        //Have reached GameState Length
        console.log('newState')
        this.blinkButton(newUS, "green");
　　　　　　  this.setState({messageColor: "green", message: "Very Good!", aMessage: true})
        this.blinkMessage();
        this.addGameState(newUS);
        break;
       case "wait":
         console.log('wait')
         var sc = this.state.stateCount + 1;
         us.push(newUS);
         this.setState({stateCount:sc, userState:us});
         break;
        case "strictFail":
          this.blinkButton(newUS, "red");
          this.setState({messageColor: "red", message: "Oh No!", aMessage: true})
          this.blinkMessage();
          this.setState({userState: [], gameState: [], nOfClicks: 0,canClick: false, inGame: false, stateCount: 0});
          break; 
        case "lightFail":
	//not strict
	  this.blinkButton(newUS, "red");
	  this.setState({messageColor: "green", message: "Try Again", aMessage: true})
          this.blinkMessage();
	  this.blinkHint();
	  break;
    }
    
  },
  blinkMessage(){
$(".message").animate({opacity: 1}, "fast", function(){
$(".message").animate({opacity: 0}, "fast", function(){ 
$(".message").animate({opacity: 1}, "fast", function(){
$(".message").animate({opacity: 0}, "fast")
})
})
})
  },
  blinkHint(){
$(".hintContainer").animate({opacity: 1}, "slow", function(){
$(".hintContainer").animate({opacity: .5}, "slow", function(){ 
$(".hintContainer").animate({opacity: 1}, "slow", function(){
$(".hintContainer").animate({opacity: 0}, "slow")
})
})
})
  },
  blinkButton(id, color){
    $(id).animate({opacity: 1}, "fast", function(){
$(id).animate({opacity: .1}, "fast", function(){
$(id).animate({opacity: .7}, "fast", function(){
$(id).animate({opacity: 1}, "fast", function(){
$(id).animate({opacity: .1}, "fast", function(){
$(id).animate({opacity: .7}, "fast", function(){

})
})
})
})
})
})
  },
  addGameState(newUS){
    //Can I change the state here without throwing everything off?
    this.setState({canClick: false})
    //Get a new GameState
    var b = this.randomInt();
    var newState = this.buttons[b];
    var m = "#" + newState;
    var gs = this.state.gameState;
    var us = this.state.userState;
    this.blinkHint();
    var nOfClicks = this.state.nOfClicks;
    gs.push(newState);
    this.setState({gameState: gs, stateCount: 0, nOfClicks: nOfClicks + 1,userState: [], inGame: true, canClick: true});
  },
  handleButtonPress(){
    this.addGameState();
  },
  randomInt() {
    var min = Math.ceil(0);
    var max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  toggleStrict(){
    if(this.state.strict == true){
	this.setState({strict: false});
        this.setState({messageColor: "green", message: "Strict Off", aMessage: true})
        this.blinkMessage();
    } else {
      this.setState({strict: true});
      this.setState({messageColor: "green", message: "Strict On", aMessage: true})
      this.blinkMessage();
    }
  },
  resetGame(){
    this.setState({
      canClick: true,
      userState: [],
　　　　　　gameState: [],
      stateCount: 0,
      inGame: false,
      hintOn: false,
      messageColor: "black",
      message: "",
      nOfClicks: 0,
      aMessage: false})
  },
  render() {
    this.buttons = ["buttonOne", "buttonTwo", "buttonThree", "buttonFour"];
    this.hasCursor = {
	cursor: "pointer"
    };
   
    this.noCursor = {
	cursor: "unset"
    };
    var buttonText = "Start"
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
    var topRowStyle = {display: "flex"};
    
    return(
      <div className="box">
	<div className="buttons">
          <div style={topRowStyle} id="top-row">
	    <div id="buttonOne" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button left-col">
            </div>
            <div id="buttonTwo" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button right-col">
            </div>
	  </div>
          <div id="bottom-row">
            <div id="buttonThree" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button left-col">
            </div>
            <div id="buttonFour" style={(this.state.canClick) ? this.hasCursor : this.noCursor} onClick={this.buttonClick.bind(this)} className="button right-col">
            </div>
	  </div>
	</div>
	<div className="controls-container">
	  <div className="controls">
            <button style={this.hasCursor}　onClick={this.handleButtonPress.bind(this)}>{buttonText}</button>
            <div className="bottom-controls">
	      <div className="display-container">
	        <span className="display">{this.state.nOfClicks}</span>
	      </div>
	      <div className="strict-button" onClick={this.toggleStrict.bind(this)}>Strict</div>
	    </div>
	  </div>
	</div>
	<div className="messageContainer">
          {messages}
	</div>
	<div className="hintContainer">
	  <div className="horizontalHints">
                {hints}

	  </div>
	</div>
      </div>
    )
  }
});
	



ReactDOM.render(
  <Simon  />,
  document.getElementById('content')
)
