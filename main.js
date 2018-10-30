"use strict";

AFRAME.registerComponent("foo", {
  init: function init() {
    var proba = document.querySelector("#toMonkey").src;
    console.log(proba);
  }
});