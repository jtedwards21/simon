const express = require("express");
const router = express.Router();

import { renderToString } from "react-dom/server";
import Simon from "../public/javascripts/components/simon";
import React from "react";

var gameState = [];
var userState = [];
var canClick = false;

/* GET home page. */
router.get("/", function(req, res) {
  const markup = renderToString(<Simon canClick={canClick} gameState={gameState} userState={userState} />);

  res.render("index", {
    title: "Express",
    markup: markup
  });
});

module.exports = router;
