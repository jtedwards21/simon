const express = require("express");
const router = express.Router();

import { renderToString } from "react-dom/server";
import Simon from "../public/javascripts/components/simon";
import React from "react";

/* GET home page. */
router.get("/", function(req, res) {
  const markup = renderToString(<Simon />);

  res.render("index", {
    title: "Express",
    markup: markup
  });
});

module.exports = router;
