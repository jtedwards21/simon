import React from "react";
import ReactDOM from "react-dom";
import Simon from "components/simon";

var gameState=[];
var userState=[];
var canClick=false;

ReactDOM.render(<Simon gameState={gameState} canClick={canClick} userState={userState}/>, document.getElementById("content"));
