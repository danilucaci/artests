AFRAME.registerComponent("foo", {
  init: function() {
    var proba = document.querySelector("#toMonkey").src;
    console.log(proba);
  },
});
