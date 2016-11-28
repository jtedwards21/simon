import React from "react";
import ReactDOM from "react-dom";
import Simon from "components/simon";

var gameState=[];
var userState=[];

ReactDOM.render(<Simon gameState={gameState} userState={userState}/>, document.getElementById("content"));
